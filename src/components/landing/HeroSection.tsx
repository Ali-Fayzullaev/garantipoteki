"use client"

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useApp } from '@/components/providers/AppProvider';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dict } from '@/lib/dictionary';

export default function VideoHero() {
  const { dark, setDark, lang } = useApp();
  const t = dict[lang];
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  // Отслеживаем высоту окна для мобильных устройств
  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);
    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  // Обработчик изменения полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(currentTime);
      setProgress(duration ? (currentTime / duration) * 100 : 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(duration ? (newTime / duration) * 100 : 0);
    }
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    const video = videoRef.current;
    
    if (!container || !video) return;

    try {
      if (document.fullscreenElement) {
        // Выход из полноэкранного режима
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      } else {
        // Вход в полноэкранный режим
        // Пробуем разные методы для разных браузеров
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen();
        } else if ((container as any).mozRequestFullScreen) {
          await (container as any).mozRequestFullScreen();
        } else if ((container as any).msRequestFullscreen) {
          await (container as any).msRequestFullscreen();
        } else {
          // Fallback для мобильных - запускаем видео в полноэкранном режиме
          if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
          } else if (video.requestFullscreen) {
            await video.requestFullscreen();
          }
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      // Ultimate fallback для мобильных
      if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
    }
  };

  // Обработчик касаний для мобильных устройств
  const handleTouchStart = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  };

  // Автоматическое скрытие контролов через 3 секунды
  useEffect(() => {
    if (showControls && isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls, isPlaying]);

  // Адаптивная высота для мобильных устройств
  const getVideoHeight = () => {
    if (typeof window === 'undefined') return "h-64 md:h-[500px] lg:h-[600px]";
    
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // На мобильных используем 70% высоты экрана
      return `h-[70vh] max-h-[600px]`;
    }
    return "h-[500px] lg:h-[600px]";
  };

  // Классы для тем
  const bgClass = dark
    ? "bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    : "bg-gradient-to-b from-gray-50 via-white to-gray-100";

  const textClass = dark ? "text-white" : "text-slate-900";
  const containerBgClass = dark ? "bg-black border-gray-800" : "bg-white border-gray-200";
  const overlayClass = dark ? "from-black via-black/50" : "from-white/80 via-white/40";
  const hoverBgClass = dark ? "hover:bg-white/20" : "hover:bg-black/20";
  const playOverlayClass = dark ? "bg-black/30 hover:bg-black/50" : "bg-white/30 hover:bg-white/50";
  const playButtonBgClass = dark ? "bg-white/20 hover:bg-white/30" : "bg-black/20 hover:bg-black/30";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-500 pt-8 md:pt-20 pb-8 md:pb-20`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Видео контейнер */}
        <div
          ref={containerRef}
          className={`relative mt-13  rounded-2xl md:rounded-3xl overflow-hidden ${containerBgClass} border shadow-2xl group transition-colors duration-500 ${getVideoHeight()}`}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onTouchStart={handleTouchStart}
        >
          {/* Градиентный ореол */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />

          <div className="relative w-full h-full bg-black flex items-center justify-center">
            {/* Видео с правильным aspect ratio */}
            <div className="w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-contain max-w-full max-h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                muted={isMuted}
                playsInline
                preload="metadata"
                aria-label={"Демонстрационное видео нашего сервиса"}
              >
                <source src="/forgarand.mp4" type="video/mp4" />
                <source src="/forgarand.webm" type="video/webm" />
                {"Ваш браузер не поддерживает видео."}
              </video>
            </div>

            {/* Play overlay */}
            {!isPlaying && (
              <div
                className={`absolute inset-0 flex items-center justify-center ${playOverlayClass} cursor-pointer transition-colors duration-300 group`}
                onClick={togglePlay}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  togglePlay();
                }}
              >
                <div className={`w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 ${playButtonBgClass} backdrop-blur-md rounded-full flex items-center justify-center transition-all transform group-hover:scale-110 active:scale-95`}>
                  <Play className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-white fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Контролы */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${overlayClass} to-transparent p-3 md:p-4 lg:p-6 transition-opacity duration-300 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Progress bar */}
              <div
                className={`w-full h-1 md:h-1.5 ${dark ? "bg-gray-600" : "bg-gray-300"} rounded-full cursor-pointer mb-3 md:mb-4 overflow-hidden group/progress hover:h-2 md:hover:h-2 transition-all touch-none`}
                onClick={handleProgressChange}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPosition = (touch.clientX - rect.left) / rect.width;
                  const newTime = clickPosition * duration;
                  
                  if (videoRef.current) {
                    videoRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                    setProgress(duration ? (newTime / duration) * 100 : 0);
                  }
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100" />
                </div>
              </div>

              {/* Controls row */}
              <div className={`flex items-center justify-between ${textClass} text-xs md:text-sm`}>
                <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
                  <button
                    onClick={togglePlay}
                    className={`p-1.5 md:p-2 lg:p-3 ${hoverBgClass} rounded-lg transition-colors active:scale-95 touch-manipulation`}
                    title={isPlaying ? "Пауза" :  "Воспроизвести"}
                    aria-label={isPlaying ?  "Пауза" :  "Воспроизвести"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    ) : (
                      <Play className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`p-1.5 md:p-2 lg:p-3 ${hoverBgClass} rounded-lg transition-colors active:scale-95 touch-manipulation`}
                    title={isMuted ? "Включить звук" : "Выключить звук"}
                    aria-label={isMuted ?  "Включить звук" : "Выключить звук"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    ) : (
                      <Volume2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    )}
                  </button>

                  <span className="text-xs md:text-sm font-medium min-w-[60px] md:min-w-[80px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className={`p-1.5 md:p-2 lg:p-3 ${hoverBgClass} rounded-lg transition-colors active:scale-95 touch-manipulation`}
                  title={isFullscreen ?  "Выйти из полноэкранного режима" : "Полноэкранный режим"}
                  aria-label={isFullscreen ?  "Выйти из полноэкранного режима" :  "Полноэкранный режим"}
                >
                  <Maximize2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-16">
          <button 
            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95 text-sm md:text-base touch-manipulation"
            onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.scroll_indicator}
          </button>
        </div>
      </div>
    </div>
  );
}