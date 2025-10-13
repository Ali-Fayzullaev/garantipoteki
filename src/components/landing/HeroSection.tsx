'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Play, ChevronRight, ShieldCheck, Building2, Star, Volume2, VolumeX, X, Clock, Users } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

// Простая функция для замены шаблонов вида {{key}}
const interpolate = (text: string, values: Record<string, string>): string => {
  return text.replace(/{{(\w+)}}/g, (_, key) => values[key] || `{{${key}}}`)
}

export default function HeroSection() {
  const { lang } = useApp()
  const t = dict[lang]
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handlePauseVideo = () => {
    setIsVideoPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Подготовка текста с подстановкой
  const introText = interpolate(t.intro_text, {
    years: t.intro_years,
    company: t.intro_company,
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-blue-50/30 to-green-50/20 dark:from-neutral-950 dark:via-blue-950/20 dark:to-green-950/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-200/20 dark:bg-green-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
           

            {/* Main Headline */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
              >
                <span className="block text-neutral-900 dark:text-white leading-tight">
                  {t.headline_part1}
                </span>
                <span className="block text-neutral-900 dark:text-white leading-tight mt-2 lg:mt-4">
                  {t.headline_part2}
                </span>
                <span className="block text-neutral-900 dark:text-white leading-tight">
                  {t.headline_part3}
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight mt-2 lg:mt-4"
                >
                  {t.headline_part4}
                </motion.span>
              </motion.h1>
            </div>

            {/* Solution Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="space-y-4"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {t.solution_teaser}{' '}
                <span className="text-green-600 dark:text-green-400">{t.solution_highlight}</span>, 
                {' '}{t.solution_continuation}
              </p>
            </motion.div>

            {/* Company Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="space-y-4"
            >
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Меня зовут <span className="font-semibold text-blue-600 dark:text-blue-400">{t.intro_name}</span>, 
                и за последние <span className="font-semibold text-green-600 dark:text-green-400">{t.intro_years}</span> лет наша компания 
                <span className="font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> {t.intro_company} </span>
                {introText}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center p-4 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">1000+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.stats_clients}</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">[X]</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.stats_experience}</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                onClick={scrollToQuiz}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
              >
                <ChevronRight className="mr-2 h-5 w-5" />
                {t.cta_quiz}
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 bg-white/50 dark:bg-neutral-800/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>{t.trust_security}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 bg-white/50 dark:bg-neutral-800/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                <Building2 className="h-5 w-5 text-blue-500" />
                <span>{t.trust_bank_partner}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative order-first lg:order-last"
          >
            {/* Main Video Card */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm overflow-hidden group cursor-pointer mx-auto max-w-md lg:max-w-none">
              <CardContent className="p-0 relative">
                <div className="aspect-[9/16] lg:aspect-[4/5] bg-gradient-to-br from-blue-500/5 to-green-500/5 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {!isVideoPlaying ? (
                      <motion.div
                        key="thumbnail"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-green-500/10"
                      >
                        {/* Thumbnail Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60" />
                        
                        {/* Thumbnail Content */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="relative z-10 text-center space-y-6 p-6 sm:p-8 w-full"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300">
                            <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white ml-1" />
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                              {t.video_title}
                            </h3>
                            <p className="text-neutral-200 text-base sm:text-lg leading-relaxed">
                              {t.video_description}
                            </p>
                          </div>
                          
                          {/* Video Stats */}
                          <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/80 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{t.video_duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{t.video_exclusive}</span>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Floating Elements */}
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute top-4 left-4 sm:top-6 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400/30 rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            y: [0, 15, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-4 h-4 sm:w-6 sm:h-6 bg-green-400/30 rounded-full"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <video
                          ref={videoRef}
                          src="/test_video.mp4"
                          autoPlay
                          className="w-full h-full object-cover"
                          muted={isMuted}
                          loop
                          playsInline
                        >
                          <source src="/test_video.mp4" type="video/mp4" />
                          Ваш браузер не поддерживает видео.
                        </video>
                        
                        {/* Video Controls */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm w-10 h-10"
                            onClick={toggleMute}
                          >
                            {isMuted ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <Button
                            variant="secondary"
                            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-10 px-3 text-sm"
                            onClick={handlePauseVideo}
                          >
                            <X className="h-4 w-4 mr-2" />
                            {t.video_close}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Play Button Overlay */}
                  {!isVideoPlaying && (
                    <Button 
                      className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/5 transition-colors z-20"
                      onClick={handlePlayVideo}
                    >
                      <span className="sr-only">Play video</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Floating Quiz Card - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-6 -right-6 hidden lg:block"
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white w-64">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  
                  <h4 className="font-bold text-lg mb-2">
                    {t.floating_quiz_title}
                  </h4>
                  
                  <p className="text-white/80 text-sm mb-4">
                    {t.floating_quiz_desc}
                  </p>

                  <Button 
                    onClick={scrollToQuiz}
                    className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/20"
                    size="sm"
                  >
                    {t.floating_quiz_cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400 cursor-pointer"
          onClick={scrollToQuiz}
        >
          <span className="text-sm">{t.scroll_indicator}</span>
          <ChevronRight className="h-5 w-5 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
}