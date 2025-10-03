'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User, 
  CreditCard,
  Star,
  Zap,
  TrendingUp,
  Target,
  FileText,
  Building2
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function BookingSection() {
  const { lang } = useApp()
  const t = dict[lang]
  
  const [dayTab, setDayTab] = useState('today')
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
    comment: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  // Generate time slots from 9:00 to 18:00
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 9 + i
    return `${hour.toString().padStart(2, '0')}:00`
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const benefits = [
    {
      icon: Target,
      title: "Точный расчет максимальной суммы кредита",
      description: "Проанализируем все банки и найдем максимальную сумму для вас"
    },
    {
      icon: Building2,
      title: "Список банков, готовых одобрить вашу заявку прямо сейчас",
      description: "Актуальная информация о банках с лучшими условиями"
    },
    {
      icon: TrendingUp,
      title: "Индивидуальную стратегию получения нужной суммы",
      description: "Персональный план для 100% одобрения вашей заявки"
    },
    {
      icon: ShieldCheck,
      title: "Защиту от возможных отказов",
      description: "Стратегия минимизации рисков и гарантия одобрения"
    }
  ]

  const specialOffers = [
    {
      icon: Zap,
      title: "Приоритетное рассмотрение вашей заявки",
      description: "Ваша заявка будет обработана в первую очередь"
    },
    {
      icon: Star,
      title: "Специальные условия от банков-партнеров",
      description: "Эксклюзивные предложения с пониженными ставками"
    },
    {
      icon: FileText,
      title: "Бесплатный анализ кредитной истории",
      description: "Полная диагностика вашей кредитоспособности"
    }
  ]

  const securityFeatures = [
    { 
      icon: ShieldCheck, 
      text: 'Ваши данные защищены',
      description: 'Полная конфиденциальность и безопасность'
    },
    { 
      icon: CheckCircle2, 
      text: 'Консультация бесплатная',
      description: 'Ни к чему не обязывает' 
    },
    { 
      icon: CalendarDays, 
      text: 'Работаем официально с 2015 года',
      description: '9 лет успешной работы' 
    }
  ]

  const officeLocations = [
    {
      name: 'Левый берег',
      address: 'г. Астана, пр. Кабанбай батыра, 15',
      hours: '9:00-18:00',
      features: ['Бесплатная парковка', 'Метро рядом', 'Лифт', 'Кондиционер']
    },
    {
      name: 'Правый берег',
      address: 'г. Астана, ул. Достык, 12',
      hours: '9:00-18:00',
      features: ['Парковка', 'Центр города', 'Лифт', 'Wi-Fi']
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !selectedSlot) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsDialogOpen(true)
    
    // Reset form
    setFormData({ name: '', phone: '', amount: '', comment: '' })
    setSelectedSlot('')
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
    <section id="booking" className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <CalendarDays className="w-4 h-4 mr-2" />
            Профессиональная консультация
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Получите профессиональную консультацию и узнайте вашу максимальную сумму кредита
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Запишитесь на персональную консультацию и получите точный расчет вашей максимальной суммы
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Benefits */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  На консультации вы получите:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 to-green-500/5 hover:from-blue-500/10 hover:to-green-500/10 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-green-500/20 transition-all duration-300">
                      <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  Только при записи сегодня:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {specialOffers.map((offer, index) => (
                  <motion.div
                    key={offer.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-amber-900/20"
                  >
                    <offer.icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                        {offer.title}
                      </h4>
                      <p className="text-amber-700 dark:text-amber-400 text-xs">
                        {offer.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 p-4 rounded-xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700"
                >
                  <div className="text-center">
                    <div className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-2">
                      ⏰ Предложение действует:
                    </div>
                    <div className="flex justify-center gap-3 text-amber-900 dark:text-amber-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{timeLeft.hours}</div>
                        <div className="text-xs">часов</div>
                      </div>
                      <div className="text-2xl font-bold">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-xs">минут</div>
                      </div>
                      <div className="text-2xl font-bold">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-xs">секунд</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card id='adress' className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Наши офисы в Астане
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {officeLocations.map((office, index) => (
                  <motion.div
                    key={office.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500/50 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {office.name}
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {office.address}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        <Clock className="h-3 w-3 mr-1" />
                        {office.hours}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {office.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    Гарантии безопасности
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                          {feature.text}
                        </div>
                        <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 sticky top-8">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/25">
                  <CalendarDays className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Выберите удобное время
                </CardTitle>
                <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <p>• Консультация занимает 30-40 минут</p>
                  <p>• Ближайшее свободное время: сегодня и завтра</p>
                  <p>• График работы: 9:00 - 18:00</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Day Selection */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    Выберите время:
                  </label>
                  <Tabs value={dayTab} onValueChange={setDayTab}>
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="today" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Сегодня
                      </TabsTrigger>
                      <TabsTrigger value="tomorrow" className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        Завтра
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="today" className="space-y-3 mt-4">
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedSlot === `today-${slot}` ? 'default' : 'outline'}
                            className={`h-12 ${
                              selectedSlot === `today-${slot}` 
                                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-transparent' 
                                : 'hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                            } transition-all duration-300`}
                            onClick={() => setSelectedSlot(`today-${slot}`)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tomorrow" className="space-y-3 mt-4">
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedSlot === `tomorrow-${slot}` ? 'default' : 'outline'}
                            className={`h-12 ${
                              selectedSlot === `tomorrow-${slot}` 
                                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-transparent' 
                                : 'hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                            } transition-all duration-300`}
                            onClick={() => setSelectedSlot(`tomorrow-${slot}`)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <Input
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-12 h-14 text-lg"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <Input
                        placeholder="Номер телефона"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                        className="pl-12 h-14 text-lg"
                        required
                      />
                    </div>

                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <Input
                        placeholder="Желаемая сумма кредита"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="pl-12 h-14 text-lg"
                      />
                    </div>

                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                      <Input
                        placeholder="Выбранное время консультации"
                        value={selectedSlot ? selectedSlot.split('-')[1] : ''}
                        readOnly
                        className="pl-12 h-14 text-lg bg-neutral-50 dark:bg-neutral-800"
                      />
                    </div>

                    <Textarea
                      placeholder="Дополнительные пожелания или вопросы"
                      value={formData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      className="min-h-[120px] resize-none text-lg p-4"
                    />
                  </div>

                  {/* Final CTA */}
                  <div className="text-center space-y-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !selectedSlot}
                      className="w-full h-16 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg font-bold shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Отправка...
                        </div>
                      ) : (
                        <>
                          <CalendarDays className="mr-2 h-6 w-6" />
                          Записаться на консультацию
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Нажмите кнопку 'Записаться' и получите профессиональную консультацию уже сегодня
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Заявка принята!
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              Мы свяжемся с вами для подтверждения времени консультации
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <div className="font-semibold text-neutral-900 dark:text-white mb-2">
                Детали записи:
              </div>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>Имя:</span>
                  <span className="font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Телефон:</span>
                  <span className="font-semibold">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Время:</span>
                  <span className="font-semibold">{selectedSlot.split('-')[1]}</span>
                </div>
                {formData.amount && (
                  <div className="flex justify-between">
                    <span>Желаемая сумма:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{formData.amount}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold mb-2">
                <Zap className="h-4 w-4" />
                Что дальше?
              </div>
              <ul className="space-y-2 text-blue-700 dark:text-blue-400 text-xs">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  Мы позвоним вам за 1 час до консультации
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  Возьмите с собой удостоверение личности
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  Подготовьте вопросы, которые хотите задать
                </li>
              </ul>
            </div>
          </div>

          <Button 
            onClick={() => setIsDialogOpen(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
          >
            Понятно
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}