'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
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

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок и подзаголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            {t.education_title}
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed italic max-w-3xl mx-auto"
          >
            {t.education_subtitle}
          </motion.p>
        </motion.div>

        {/* Секреты */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {secrets.map((secret, index) => (
            <motion.div
              key={secret.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 h-full flex flex-col">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-500/20 group-hover:to-orange-500/20 transition-all duration-300"
                  >
                    <secret.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {secret.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 flex-grow">
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-8"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 max-w-4xl mx-auto">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-2xl mb-4 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              {t.cta_title}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-lg mb-4">
              {t.cta_text1}
            </p>
            <p className="text-neutral-900 dark:text-white font-semibold text-xl">
              {t.cta_text2}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={scrollToBooking}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-semibold py-6 px-12 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <CalendarDays className="mr-3 h-6 w-6" />
              {t.cta_button}
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-sm text-neutral-500 dark:text-neutral-400 bg-white/50 dark:bg-neutral-800/50 rounded-lg p-4 max-w-2xl mx-auto"
          >
            <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="leading-relaxed">
              {t.cta_psa}
            </span>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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