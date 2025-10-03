'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { 
  Play,
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  X, 
  Volume2, 
  VolumeX,
  Zap,
  Star,
  CheckCircle2,
  CalendarDays,
  BarChart3,
  Target,
  AlertTriangle
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function EducationSection() {
  const { lang } = useApp()
  const t = dict[lang]
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const secrets = [
    {
      icon: AlertTriangle,
      title: t.secret1_title,
      description: t.secret1_desc,
      details: [
        t.secret1_detail1,
        t.secret1_detail2,
        t.secret1_detail3
      ]
    },
    {
      icon: BarChart3,
      title: t.secret2_title,
      description: t.secret2_desc,
      details: [
        t.secret2_detail1,
        t.secret2_detail2,
        t.secret2_detail3,
        t.secret2_detail4
      ]
    },
    {
      icon: Target,
      title: t.secret3_title,
      description: t.secret3_desc,
      details: [
        t.secret3_detail1,
        t.secret3_detail2,
        t.secret3_detail3
      ]
    }
  ]

  const stats = [
    {
      icon: TrendingUp,
      title: t.stat1_title,
      description: t.stat1_desc,
      value: t.stat1_value
    },
    {
      icon: Clock,
      title: t.stat2_title,
      description: t.stat2_desc,
      value: t.stat2_value
    },
    {
      icon: Star,
      title: t.stat3_title,
      description: t.stat3_desc,
      value: t.stat3_value
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

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      
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
                <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-orange-500/10 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {!isVideoPlaying ? (
                      <motion.div
                        key="thumbnail"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-orange-500/5"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60" />
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative z-10 text-center space-y-6 p-6"
                        >
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300">
                            <Play className="h-10 w-10 text-white ml-1" />
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-2xl font-bold text-white">
                              {t.video_secrets_title}
                            </p>
                            <p className="text-neutral-200 text-lg">
                              {t.video_secrets_subtitle}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{t.video_duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4" />
                              <span>{t.video_exclusive}</span>
                            </div>
                          </div>
                        </motion.div>
                        
                        <div className="absolute top-4 left-4 w-6 h-6 bg-blue-400/30 rounded-full animate-pulse" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 bg-orange-400/30 rounded-full animate-pulse delay-1000" />
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
                          src="/grand.mp4"
                          className="w-full h-full object-cover"
                          muted={isMuted}
                          loop
                          playsInline
                        >
                          <source src="/videos/bank-secrets.mp4" type="video/mp4" />
                          Ваш браузер не поддерживает видео.
                        </video>
                        
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
                            {t.video_close}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!isVideoPlaying && (
                    <Button 
                      className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/5 transition-colors z-20"
                      onClick={handlePlayVideo}
                    >
                      <span className="sr-only">Play video</span>
                    </Button>
                  )}
                </div>
                
                {isVideoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800/50">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 225, ease: "linear" }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
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
              className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-500/30"
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
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-orange-500/15 rounded-full backdrop-blur-sm border border-orange-500/20"
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
              >
                <Zap className="h-4 w-4" />
                {t.education_badge}
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                {t.education_title}
              </h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed italic"
              >
                {t.education_subtitle}
              </motion.p>
            </div>

            <div className="space-y-6">
              {secrets.map((secret, index) => (
                <motion.div
                  key={secret.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-xl flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-orange-500/20 transition-all duration-300"
                    >
                      <secret.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {secret.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                        {secret.description}
                      </p>
                      <div className="space-y-2">
                        {secret.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closing CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-neutral-900 dark:text-white text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  {t.cta_title}
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  {t.cta_text1}
                </p>
                <p className="text-neutral-900 dark:text-white font-semibold">
                  {t.cta_text2}
                </p>
              </div>

              <div className="flex">
                <Button 
                  onClick={scrollToBooking}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  {t.cta_button}
                </Button>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400 bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4"
              >
                <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {t.cta_psa}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-orange-500/20 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    {stat.title}
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {stat.description}
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