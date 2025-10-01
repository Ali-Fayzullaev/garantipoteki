'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Play, ThumbsUp, TrendingUp, Clock, ShieldCheck } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function EducationSection() {
  const { lang } = useApp()
  const t = dict[lang]

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

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                    <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                      {t.edu_title}
                    </p>
                  </div>
                  
                  {/* Play button overlay */}
                  <Button 
                    size="icon" 
                    className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/10 transition-colors"
                  >
                    <span className="sr-only">Play video</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-yellow rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-brand-orange rounded-full opacity-20" />
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
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                {t.edu_title}
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                То, что мы сейчас расскажем, изменит ваше представление о работе банков
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
              >
                {t.edu_cta}
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="h-4 w-4" />
                <span>{t.edu_ps}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}