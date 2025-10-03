'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { 
  Play, 
  ThumbsUp, 
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
      title: "Почему банки часто отказывают надёжным клиентам",
      description: "Знаете ли вы, что каждый банк каждый месяц меняет свои алгоритмы одобрения? То есть банк, который одобрял кредиты в прошлом месяце, может массово отказывать в этом. И дело не в вас.",
      details: [
        "В январе лучше всего одобряет Банк А",
        "В феврале - Банк Б", 
        "А в марте оба этих банка могут уйти на технический перерыв"
      ]
    },
    {
      icon: BarChart3,
      title: "Как работает система одобрения кредитов",
      description: "Банк проверяет вашу историю, смотрит на текущую нагрузку, оценивает стабильность дохода. Но есть четвертый, скрытый фактор - это внутренний скоринг банка.",
      details: [
        "Проверка кредитной истории",
        "Анализ текущей долговой нагрузки",
        "Оценка стабильности дохода",
        "Внутренний скоринг банка"
      ]
    },
    {
      icon: Target,
      title: "Почему важно правильно выбрать время для подачи заявки",
      description: "Представьте, что вы пришли в магазин, где проходит распродажа. Если вы придете слишком рано - цены еще высокие. Слишком поздно - все уже разобрали.",
      details: [
        "У каждого банка есть свой 'высокий сезон'",
        "Максимальные суммы под минимальный процент",
        "Мы знаем эти циклы и лучшие моменты"
      ]
    }
  ]

  const stats = [
    {
      icon: TrendingUp,
      title: "Повышение шансов",
      description: "Увеличиваем вероятность одобрения на 83%",
      value: "+83%"
    },
    {
      icon: Clock,
      title: "Экономия времени", 
      description: "Получайте решение за 1 час вместо 3-5 дней",
      value: "1 час"
    },
    {
      icon: Star,
      title: "Лучшие условия",
      description: "Ставки на 15-20% ниже рыночных",
      value: "-20%"
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
      {/* Background Elements */}
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
                              3 секрета, которые банки скрывают от заёмщиков
                            </p>
                            <p className="text-neutral-200 text-lg">
                              Подождите! Прежде чем записываться на консультацию, посмотрите это короткое видео
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>3:45</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4" />
                              <span>Эксклюзив</span>
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
                            Закрыть
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
                Pattern Interrupt
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                3 секрета, которые банки скрывают от заёмщиков
              </h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed italic"
              >
                "То, что я сейчас расскажу, изменит ваше представление о работе банков..."
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
                  Закрывающий призыв:
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  Если у вас есть пенсионные отчисления за последние 6 месяцев и нет текущих просрочек - запишитесь на консультацию прямо сейчас.
                </p>
                <p className="text-neutral-900 dark:text-white font-semibold">
                  Мы проверим все банки и найдем для вас максимальную сумму на лучших условиях.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Смотреть видео
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                      <video
                        src={"/grand.mp4"}
                        className="w-full h-full object-cover"
                        autoPlay
                        controls
                        muted={false}
                      >
                        <source src="/videos/bank-secrets.mp4" type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  onClick={scrollToBooking}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-300"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Записаться на консультацию
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
                  P.S. Помните - мы проводим консультации только в офисе, потому что в последнее время участились случаи мошенничества. Ваша безопасность - наш главный приоритет.
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