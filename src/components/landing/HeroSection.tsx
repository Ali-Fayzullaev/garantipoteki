"use client"

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useApp } from '@/components/providers/AppProvider';
import { dict } from '@/lib/dictionary';

// Типы для кросс-браузерных полноэкранных методов
interface ExtendedDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface ExtendedHTMLDivElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

export default function VideoHero() {
  const { dark, lang } = useApp();
  const t = dict[lang];
  
  const videoRef = useRef<ExtendedHTMLVideoElement>(null);
  const containerRef = useRef<ExtendedHTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

    const extendedDocument = document as ExtendedDocument;

    try {
      if (document.fullscreenElement) {
        // Выход из полноэкранного режима
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (extendedDocument.webkitExitFullscreen) {
          await extendedDocument.webkitExitFullscreen();
        } else if (extendedDocument.mozCancelFullScreen) {
          await extendedDocument.mozCancelFullScreen();
        } else if (extendedDocument.msExitFullscreen) {
          await extendedDocument.msExitFullscreen();
        }
      } else {
        // Вход в полноэкранный режим
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          await container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          await container.msRequestFullscreen();
        } else {
          if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
          } else if (video.requestFullscreen) {
            await video.requestFullscreen();
          }
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
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

  // Классы для тем
  const bgClass = dark
    ? "bg-slate-950"
    : "bg-gray-50";

  const textClass = dark ? "text-white" : "text-slate-900";
  const containerBgClass = dark ? "bg-black" : "bg-white";
  const overlayClass = dark ? "from-black/80" : "from-white/80";
  const hoverBgClass = dark ? "hover:bg-white/10" : "hover:bg-black/10";
  const playOverlayClass = dark ? "bg-black/40" : "bg-white/40";
  const playButtonBgClass = dark ? "bg-white/20" : "bg-black/20";

  return (
    <div className={`min-h-screen ${bgClass} pt-8 md:pt-20 pb-8 md:pb-20`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Видео контейнер */}
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={`relative rounded-2xl mt-14 md:rounded-3xl overflow-hidden ${containerBgClass} border shadow-xl ${dark ? 'border-gray-800' : 'border-gray-200'} h-64 md:h-[500px] lg:h-[600px]`}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onTouchStart={handleTouchStart}
        >
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            {/* Видео */}
            <div className="w-full h-full flex items-center justify-center">
              <video
                ref={videoRef as React.RefObject<HTMLVideoElement>}
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
                className={`absolute inset-0 flex items-center justify-center ${playOverlayClass} cursor-pointer`}
                onClick={togglePlay}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  togglePlay();
                }}
              >
                <div className={`w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 ${playButtonBgClass} backdrop-blur-md rounded-full flex items-center justify-center`}>
                  <Play className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-white fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Контролы */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${overlayClass} to-transparent p-3 md:p-4 lg:p-6 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Progress bar */}
              <div
                className={`w-full h-1.5 ${dark ? "bg-gray-600" : "bg-gray-300"} rounded-full cursor-pointer mb-3 md:mb-4 overflow-hidden`}
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
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls row */}
              <div className={`flex items-center justify-between ${textClass} text-xs md:text-sm`}>
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={togglePlay}
                    className={`p-2 ${hoverBgClass} rounded-lg`}
                    title={isPlaying ? "Пауза" : "Воспроизвести"}
                    aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Play className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`p-2 ${hoverBgClass} rounded-lg`}
                    title={isMuted ? "Включить звук" : "Выключить звук"}
                    aria-label={isMuted ? "Включить звук" : "Выключить звук"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>

                  <span className="font-medium min-w-[80px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className={`p-2 ${hoverBgClass} rounded-lg`}
                  title={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
                  aria-label={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
                >
                  <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-16">
          <button 
            className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-sm md:text-base"
            onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.scroll_indicator}
          </button>
        </div>
      </div>
    </div>
  );
}