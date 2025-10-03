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
  Shield,
  Star,
  Target,
  Crown,
  X
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import CountdownTimer from '../ui/CountdownTimer'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createDeal, updateTxt } from '@/app/actions'

export default function FinalCTASection() {
  const { lang } = useApp()
  const t = dict[lang]

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success')
  const [dialogData, setDialogData] = useState({ name: '', phone: '' }) // Добавляем состояние для данных модального окна
  const [phoneError, setPhoneError] = useState('')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  })

  // Target date - end of current month
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)
    return () => clearInterval(timer)
  }, [])

  const steps = [
    {
      step: 1,
      title: "Запишитесь на бесплатную консультацию",
      description: "Выберите удобное время и оставьте заявку",
      icon: CalendarDays
    },
    {
      step: 2,
      title: "Приходите в офис в выбранное время",
      description: "Только удостоверение личности",
      icon: Users
    },
    {
      step: 3,
      title: "Получите деньги в тот же день",
      description: "Одобрение и получение средств",
      icon: CheckCircle2
    }
  ]

  const weekStats = [
    { label: 'Записей на консультацию', value: '47', icon: Users, color: 'text-blue-500' },
    { label: 'Получили одобрение', value: '39', icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Средняя сумма одобрения', value: '12 млн ₸', icon: TrendingUp, color: 'text-purple-500' }
  ]

  const specialOffers = [
    {
      icon: Crown,
      title: 'Приоритетное рассмотрение',
      description: 'Ваша заявка будет обработана в первую очередь',
      color: 'text-yellow-500'
    },
    {
      icon: Target,
      title: 'Специальные условия',
      description: 'Доступ к эксклюзивным предложениям банков-партнеров',
      color: 'text-blue-500'
    },
    {
      icon: Star,
      title: 'Персональный менеджер',
      description: 'Индивидуальное сопровождение на весь срок оформления',
      color: 'text-purple-500'
    }
  ]

  const trustBadges = [
    { text: 'Более 1000 успешных сделок', icon: CheckCircle2 },
    { text: 'Официальный партнер ведущих банков', icon: Shield },
    { text: 'Гарантия конфиденциальности', icon: Shield },
    { text: 'Бесплатная консультация', icon: CheckCircle2 }
  ]

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      const formattedValue = formatPhone(value)
      setFormData(prev => ({ ...prev, [field]: formattedValue }))
      
      // Валидация телефона
      const numbers = formattedValue.replace(/\D/g, '')
      if (numbers.length < 11) {
        setPhoneError('Номер телефона должен содержать 11 цифр')
      } else {
        setPhoneError('')
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    
    // Ограничиваем длину до 11 цифр (10 без +7)
    const limitedNumbers = numbers.slice(0, 11)
    
    if (limitedNumbers.length === 0) return ''
    if (limitedNumbers.length === 1) return `+7`
    if (limitedNumbers.length <= 4) return `+7 (${limitedNumbers.slice(1, 4)}`
    if (limitedNumbers.length <= 7) return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4, 7)}`
    if (limitedNumbers.length <= 9) return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4, 7)}-${limitedNumbers.slice(7, 9)}`
    return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4, 7)}-${limitedNumbers.slice(7, 9)}-${limitedNumbers.slice(9, 11)}`
  }

  const isFormValid = (): boolean => {
    const numbers = formData.phone.replace(/\D/g, '')
    return formData.name.trim().length > 0 && numbers.length === 11 && !phoneError
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Проверяем валидность формы
    if (!formData.name.trim()) {
      setDialogType('error')
      setDialogData({ name: formData.name, phone: formData.phone })
      setIsDialogOpen(true)
      return
    }

    const numbers = formData.phone.replace(/\D/g, '')
    if (numbers.length !== 11) {
      setPhoneError('Номер телефона должен содержать 11 цифр')
      setDialogType('error')
      setDialogData({ name: formData.name, phone: formData.phone })
      setIsDialogOpen(true)
      return
    }

    setIsSubmitting(true)

    try {
      // Создаем заявку в основной системе
      const deal = await createDeal({
        name: formData.name,
        phone_number: formData.phone.replace(/\D/g, ''),
        comment: formData.comment,
        selected_time: 'срочная консультация'
      })

      // Отправляем в TXT систему
      await updateTxt({
        name: formData.name,
        phone: formData.phone.replace(/\D/g, ''),
        service: "Консультация по кредиту",
        comment: formData.comment,
        selected_time: 'срочная консультация'
      })

      // Успешная отправка - сохраняем данные для модального окна
      setDialogData({ name: formData.name, phone: formData.phone })
      setDialogType('success')
      setIsDialogOpen(true)
      
      // Сброс формы
      setFormData({ name: '', phone: '', comment: '' })
      setPhoneError('')

    } catch (error) {
      console.error("Ошибка при отправке формы:", error)
      setDialogData({ name: formData.name, phone: formData.phone })
      setDialogType('error')
      setIsDialogOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <section id="final-cta" className="py-10 md:py-20 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-3 py-2 md:px-4 md:py-3 mb-3 md:mb-4 backdrop-blur-sm text-xs md:text-sm">
            <Zap className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Специальное предложение
          </Badge>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-3 md:mb-4 px-4">
            Сделайте первый шаг к получению нужной суммы
          </h2>
          <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4">
            Банки меняют условия одобрения каждый месяц. Прямо сейчас у нас есть информация о банках, которые готовы одобрить максимальные суммы.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Left Column - Urgency & Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Countdown Timer - Секция срочности */}
            <Card className="border-0 shadow-xl md:shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-lg md:text-xl">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                  Важное напоминание
                </CardTitle>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                  До следующего обновления банковских условий осталось:
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-center space-y-4 md:space-y-6">
                  <div className="flex justify-center">
                    <CountdownTimer 
                      targetDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)} 
                      className='text-2xl md:text-3xl font-bold dark:text-white bg-gradient-to-br from-blue-500 to-green-500 text-transparent bg-clip-text' 
                    />
                  </div>
                  
                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Zap className="h-4 w-4 md:h-5 md:w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-orange-800 dark:text-orange-300 text-xs md:text-sm">
                          Важно: ограниченное количество мест
                        </div>
                        <div className="text-orange-700 dark:text-orange-400 text-xs">
                          Мы принимаем ограниченное количество клиентов каждый день
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week Stats - Мотивирующая статистика */}
            <Card className="border-0 shadow-xl md:shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                  Статистика этой недели
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {weekStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600"
                    >
                      <stat.icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color}`} />
                      <div className="flex-1">
                        <div className="text-base md:text-lg font-bold text-neutral-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Steps - Три простых шага */}
            <Card className="border-0 shadow-xl md:shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                  Как получить деньги
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4 md:space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full flex items-center justify-center">
                      <step.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {step.step}
                        </div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="border-0 shadow-xl md:shadow-2xl bg-gradient-to-r from-blue-500/5 to-green-500/5 dark:from-blue-500/10 dark:to-green-500/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Crown className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                  Только при записи сегодня
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3 md:space-y-4">
                {specialOffers.map((offer, index) => (
                  <motion.div
                    key={offer.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-white/50 dark:bg-neutral-800/50"
                  >
                    <offer.icon className={`h-4 w-4 md:h-5 md:w-5 ${offer.color} flex-shrink-0`} />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-xs md:text-sm">
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
            className="sticky top-4 md:top-8"
          >
            <Card className="border-0 shadow-xl md:shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                  Оставьте заявку прямо сейчас
                </CardTitle>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                  И получите бесплатную консультацию в приоритетном порядке
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="space-y-3 md:space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="Ваше имя *"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-12 md:h-14 text-base md:text-lg pl-10 md:pl-12 border-neutral-200 dark:border-neutral-700"
                        required
                      />
                      <Users className="absolute left-3 md:left-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-neutral-400" />
                    </div>

                    <div className="relative">
                      <Input
                        placeholder="Номер телефона *"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`h-12 md:h-14 text-base md:text-lg pl-10 md:pl-12 border-neutral-200 dark:border-neutral-700 ${
                          phoneError ? 'border-red-500 focus:border-red-500' : ''
                        }`}
                        required
                        maxLength={18} // Максимальная длина форматированного номера
                      />
                      <Phone className="absolute left-3 md:left-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-neutral-400" />
                      {phoneError && (
                        <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
                          {phoneError}
                        </p>
                      )}
                    </div>

                    <Textarea
                      placeholder="Удобное время для консультации или комментарий"
                      value={formData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      className="min-h-[100px] md:min-h-[120px] resize-none text-base md:text-lg p-3 md:p-4 border-neutral-200 dark:border-neutral-700"
                    />
                  </div>

                  {/* Urgency Banner */}
                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-green-800 dark:text-green-300 text-xs md:text-sm">
                          Срочная запись
                        </div>
                        <div className="text-green-700 dark:text-green-400 text-xs">
                          При записи в течение 15 минут — гарантия консультации сегодня
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                    className="w-full h-14 md:h-16 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-base md:text-lg font-bold shadow-xl md:shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Отправка...
                      </div>
                    ) : (
                      <>
                        <span className="text-sm md:text-base">ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</span>
                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                      </>
                    )}
                  </Button>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {trustBadges.map((badge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400"
                      >
                        <badge.icon className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="text-xs">{badge.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success/Error Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              dialogType === 'success' 
                ? 'bg-green-100 dark:bg-green-900' 
                : 'bg-red-100 dark:bg-red-900'
            }`}>
              {dialogType === 'success' ? (
                <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-green-600 dark:text-green-400" />
              ) : (
                <X className="h-8 w-8 md:h-10 md:w-10 text-red-600 dark:text-red-400" />
              )}
            </div>
            <DialogTitle className={`text-center text-xl md:text-2xl ${
              dialogType === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {dialogType === 'success' ? 'Заявка принята!' : 'Ошибка отправки'}
            </DialogTitle>
            <DialogDescription className="text-center text-base md:text-lg">
              {dialogType === 'success' 
                ? 'Мы свяжемся с вами в течение 5 минут для подтверждения консультации' 
                : 'Пожалуйста, проверьте правильность заполнения полей и попробуйте еще раз'
              }
            </DialogDescription>
          </DialogHeader>

          {dialogType === 'success' && (
            <div className="space-y-4 text-sm">
              <div className="p-3 md:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <div className="font-semibold text-neutral-900 dark:text-white mb-2 text-sm md:text-base">
                  Детали заявки:
                </div>
                <div className="space-y-2 text-neutral-600 dark:text-neutral-400 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>Имя:</span>
                    <span className="font-semibold">{dialogData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Телефон:</span>
                    <span className="font-semibold">{dialogData.phone}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold mb-2 text-sm md:text-base">
                  <Zap className="h-4 w-4" />
                  Что дальше?
                </div>
                <ul className="space-y-2 text-blue-700 dark:text-blue-400 text-xs">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Мы позвоним вам в течение 5 минут
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Подтвердим время консультации
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Ответим на все ваши вопросы
                  </li>
                </ul>
              </div>
            </div>
          )}

          <Button
            onClick={handleDialogClose}
            className={`w-full ${
              dialogType === 'success' 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600' 
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            Понятно
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}