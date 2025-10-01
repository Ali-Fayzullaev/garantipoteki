'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Play, ThumbsUp, TrendingUp, Clock, ShieldCheck, X, Volume2, VolumeX } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function EducationSection() {
  const { lang } = useApp()
  const t = dict[lang]
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const features = [
    {
      icon: ThumbsUp,
      title: t.edu_p1_t,
      description: "Каждый банк ежемесячно меняет алгоритмы — важно знать, кто сейчас даёт лучшие условия."
    },
    {
      icon: TrendingUp,
      title: t.edu_p2_t,
      description: "История, нагрузка, доход и внутренний скоринг — настраиваем заявку под требования."
    },
    {
      icon: Clock,
      title: t.edu_p3_t,
      description: "Есть «высокие сезоны» — подаём в нужный банк в нужный момент для максимального одобрения."
    }
  ]

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

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card className="border-0 shadow-2xl overflow-hidden group cursor-pointer">
              <CardContent className="p-0 relative">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  {/* Video Thumbnail/Player */}
                  <AnimatePresence mode="wait">
                    {!isVideoPlaying ? (
                      <motion.div
                        key="thumbnail"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5"
                      >
                        {/* Thumbnail Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60" />
                        
                        {/* Play Button */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative z-10 text-center space-y-6"
                        >
                          <div className="w-24 h-24 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300">
                            <Play className="h-10 w-10 text-white ml-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-white">
                              {t.edu_title}
                            </p>
                            <p className="text-neutral-200 text-lg">
                              Нажмите для просмотра
                            </p>
                          </div>
                          
                          {/* Video Stats */}
                          <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>3:45</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Play className="h-4 w-4" />
                              <span>Видео</span>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Floating Elements */}
                        <div className="absolute top-4 left-4 w-6 h-6 bg-brand-yellow/30 rounded-full animate-pulse" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 bg-brand-orange/30 rounded-full animate-pulse delay-1000" />
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
                            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
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
                            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                            onClick={handlePauseVideo}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Закрыть
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
                
                {/* Video Progress Bar */}
                {isVideoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800/50">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-brand-yellow to-brand-orange"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 225, ease: "linear" }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Floating decorative elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-12 h-12 bg-brand-yellow/20 rounded-full backdrop-blur-sm border border-brand-yellow/30"
            />
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-brand-orange/15 rounded-full backdrop-blur-sm border border-brand-orange/20"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
              >
                <ShieldCheck className="h-4 w-4" />
                Эксклюзивная информация
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                {t.edu_title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
              >
                То, что мы сейчас расскажем, изменит ваше представление о работе банков
              </motion.p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300"
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Смотреть видео
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        controls
                        muted={false}
                      >
                        <source src="/test_video.mp4" type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  {t.edu_cta}
                </Button>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400 bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4"
              >
                <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="leading-relaxed">{t.edu_ps}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: TrendingUp,
              title: "Повышение шансов",
              description: "Увеличиваем вероятность одобрения на 83%"
            },
            {
              icon: Clock,
              title: "Экономия времени",
              description: "Получайте решение за 1 час вместо 3-5 дней"
            },
            {
              icon: ThumbsUp,
              title: "Лучшие условия",
              description: "Ставки на 15-20% ниже рыночных"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}