'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Play, ChevronRight, ShieldCheck, Building2, Star } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function HeroSection() {
  const { lang } = useApp()
  const t = dict[lang]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light/50 via-transparent to-accent/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
              <Star className="w-4 h-4 mr-2" />
              {t.hero_badge}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900 dark:text-white">
                {t.hero_q1.split('?')[0]}?
              </span>
              <span className="block mt-4 text-gradient">
                {t.hero_q2}
              </span>
            </h1>

            <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {t.hero_pitch}
            </p>

            <div className="space-y-4">
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                <span className="font-semibold text-primary">{t.hero_me}</span>{' '}
                <span className="font-bold">{t.hero_name}</span>, {t.hero_company}.{' '}
                {t.hero_after}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
              >
                <ChevronRight className="mr-2 h-5 w-5" />
                {t.hero_cta}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-2 transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                {t.hero_watch}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>ISO-like data safety</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Building2 className="h-5 w-5 text-primary" />
                <span>Partner banks KZ</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Quiz Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-yellow to-brand-orange rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="h-8 w-8 text-yellow-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {t.quiz_title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Ответьте на 4 вопроса и узнайте вашу максимальную сумму
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-neutral-500">
                      <span>Время: 60 сек</span>
                      <span>Вопросов: 4</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                      size="lg"
                    >
                      Начать квиз
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Безопасно</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4 text-blue-500" />
                      <span>Конфиденциально</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}