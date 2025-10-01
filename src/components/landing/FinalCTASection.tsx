'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  CalendarDays,
  Phone,
  ArrowRight,
  Shield
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import CountdownTimer from '@/components/ui/CountdownTimer'

export default function FinalCTASection() {
  const { lang } = useApp()
  const t = dict[lang]

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Target date - end of current month
  const targetDate = new Date()
  targetDate.setMonth(targetDate.getMonth() + 1)
  targetDate.setDate(1)
  targetDate.setHours(0, 0, 0, 0)

  const steps = [
    {
      step: 1,
      title: t.step1,
      description: 'Выберите удобное время и оставьте заявку',
      icon: CalendarDays
    },
    {
      step: 2,
      title: t.step2,
      description: 'Приходите в офис с паспортом',
      icon: Users
    },
    {
      step: 3,
      title: t.step3,
      description: 'Получите одобрение и деньги в тот же день',
      icon: CheckCircle2
    }
  ]

  const weekStats = [
    { label: 'Записей', value: '47', icon: Users },
    { label: 'Одобрений', value: '39', icon: CheckCircle2 },
    { label: 'Средняя сумма', value: '12 млн ₸', icon: TrendingUp }
  ]

  const specialOffers = [
    {
      icon: Zap,
      title: 'Приоритетное рассмотрение',
      description: 'Ваша заявка будет обработана в первую очередь'
    },
    {
      icon: Shield,
      title: 'Специальные условия',
      description: 'Доступ к эксклюзивным предложениям банков'
    },
    {
      icon: Clock,
      title: 'Персональный менеджер',
      description: 'Индивидуальное сопровождение на всех этапах'
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните обязательные поля')
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    
    // Reset form
    setFormData({ name: '', phone: '', comment: '' })
    alert('Спасибо! Мы свяжемся с вами в течение 5 минут')
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 1) return `+7${numbers}`
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 dark:from-primary/20 dark:to-accent/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Специальное предложение
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.final_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t.final_text}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Urgency & Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Countdown Timer */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Clock className="h-5 w-5 text-primary" />
                  {t.countdown}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <CountdownTimer targetDate={targetDate} className="justify-center" />
                  
                  <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-700">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <div className="font-semibold text-red-800 dark:text-red-300 text-sm">
                          Важно: ограниченное количество мест
                        </div>
                        <div className="text-red-700 dark:text-red-400 text-xs">
                          На этой неделе осталось 3 свободных слота для консультаций
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week Stats */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Статистика недели
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {weekStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600"
                    >
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-neutral-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                  {t.week_stats}
                </p>
              </CardContent>
            </Card>

            {/* Steps */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {t.steps_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {step.step}
                        </div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
              <CardHeader>
                <CardTitle className="text-lg">Специальные условия при записи сегодня</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {specialOffers.map((offer, index) => (
                  <motion.div
                    key={offer.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-neutral-800/50"
                  >
                    <offer.icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                        {offer.title}
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                        {offer.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - CTA Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 sticky top-8">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {t.final_form_title}
                </CardTitle>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Оставьте заявку и получите бесплатную консультацию в приоритетном порядке
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-14 text-lg pl-12"
                        required
                      />
                      <Users className="absolute left-4 top-4 h-5 w-5 text-neutral-400" />
                    </div>

                    <div className="relative">
                      <Input
                        placeholder="Номер телефона"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                        className="h-14 text-lg pl-12"
                        required
                      />
                      <Phone className="absolute left-4 top-4 h-5 w-5 text-neutral-400" />
                    </div>

                    <Textarea
                      placeholder="Комментарий или пожелания"
                      value={formData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      className="min-h-[120px] resize-none text-lg p-4"
                    />
                  </div>

                  {/* Urgency Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <div className="font-semibold text-orange-800 dark:text-orange-300 text-sm">
                          Срочная запись
                        </div>
                        <div className="text-orange-700 dark:text-orange-400 text-xs">
                          При записи в течение 15 минут — гарантия консультации сегодня
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg font-bold shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Отправка...
                      </div>
                    ) : (
                      <>
                        {t.final_cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Конфиденциально</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        <span>Бесплатно</span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                </form>

                {/* Alternative Contact */}
                <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <div className="text-center">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      Нужна срочная консультация?
                    </p>
                    <Button variant="outline" className="w-full h-12">
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить прямо сейчас
                    </Button>
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