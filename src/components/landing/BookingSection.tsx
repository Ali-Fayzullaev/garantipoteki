'use client'

import React, { useState } from 'react'
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
  Zap
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function BookingSection() {
  const { lang } = useApp()
  const t = dict[lang]
  
  const [dayTab, setDayTab] = useState<'today' | 'tomorrow'>('today')
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
    comment: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate time slots from 9:00 to 18:00
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 9 + i
    return `${hour.toString().padStart(2, '0')}:00`
  })

  const benefits = [
    {
      icon: CheckCircle2,
      title: t.b1,
      description: 'Точный расчет на основе анализа всех банков'
    },
    {
      icon: CreditCard,
      title: t.b2,
      description: 'Актуальный список банков с лучшими условиями'
    },
    {
      icon: ShieldCheck,
      title: t.b3,
      description: 'Стратегия для 100% одобрения вашей заявки'
    }
  ]

  const securityFeatures = [
    { icon: ShieldCheck, text: 'Конфиденциальность данных' },
    { icon: CalendarDays, text: 'Бесплатная консультация' },
    { icon: Star, text: 'Работаем с 2015 года' },
    { icon: Zap, text: 'Официальный договор' }
  ]

  const officeLocations = [
    {
      name: 'Левый берег',
      address: 'пр. Кабанбай батыра, 15',
      hours: '9:00-18:00',
      features: ['Парковка', 'Метро рядом', 'Лифт']
    },
    {
      name: 'Правый берег',
      address: 'ул. Достык, 12',
      hours: '9:00-18:00',
      features: ['Парковка', 'Центр города', 'Кондиционер']
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
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-4">
            <CalendarDays className="w-4 h-4 mr-2" />
            Бесплатная консультация
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.book_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Запишитесь на персональную консультацию и узнайте максимальную сумму, которую можете получить
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
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  {t.book_benefits}
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
                    className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
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

            {/* Office Locations */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
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
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 transition-colors duration-300"
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
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="grid grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <feature.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
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
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <CalendarDays className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Выберите время
                </CardTitle>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Консультация занимает 30-40 минут
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Day Selection */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    {t.when}
                  </label>
                  <Tabs value={dayTab} onValueChange={(value: 'today' | 'tomorrow') => setDayTab(value)}>
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="today" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t.today}
                      </TabsTrigger>
                      <TabsTrigger value="tomorrow" className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {t.tomorrow}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="today" className="space-y-3 mt-4">
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedSlot === `today-${slot}` ? 'default' : 'outline'}
                            className={`h-12 ${
                              selectedSlot === `today-${slot}` 
                                ? 'bg-primary text-white border-primary' 
                                : 'hover:border-primary hover:text-primary'
                            }`}
                            onClick={() => setSelectedSlot(`today-${slot}`)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tomorrow" className="space-y-3 mt-4">
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedSlot === `tomorrow-${slot}` ? 'default' : 'outline'}
                            className={`h-12 ${
                              selectedSlot === `tomorrow-${slot}` 
                                ? 'bg-primary text-white border-primary' 
                                : 'hover:border-primary hover:text-primary'
                            }`}
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
                  <div className="grid gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder={t.form_name}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder={t.form_phone}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                        className="pl-10 h-12"
                        required
                      />
                    </div>

                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder={t.form_amount}
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>

                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder={t.form_slot}
                        value={selectedSlot ? selectedSlot.split('-')[1] : ''}
                        readOnly
                        className="pl-10 h-12 bg-neutral-50 dark:bg-neutral-800"
                      />
                    </div>

                    <Textarea
                      placeholder="Дополнительные пожелания или вопросы"
                      value={formData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  {/* Special Offer */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <div className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm">
                          Специальное предложение
                        </div>
                        <div className="text-yellow-700 dark:text-yellow-400 text-xs">
                          При записи сегодня — приоритетное рассмотрение заявки
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !selectedSlot}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Отправка...
                      </div>
                    ) : (
                      <>
                        <CalendarDays className="mr-2 h-5 w-5" />
                        {t.submit}
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                    {t.security_badges}
                  </p>
                </form>

                {/* Alternative Contact */}
                <div className="text-center">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    Или свяжитесь с нами напрямую:
                  </p>
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    +7 (777) 123-45-67
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
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
              <div className="space-y-1 text-neutral-600 dark:text-neutral-400">
                <div>Имя: {formData.name}</div>
                <div>Телефон: {formData.phone}</div>
                <div>Время: {selectedSlot.split('-')[1]}</div>
                {formData.amount && <div>Желаемая сумма: {formData.amount}</div>}
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold mb-2">
                <Zap className="h-4 w-4" />
                Что дальше?
              </div>
              <ul className="space-y-1 text-blue-700 dark:text-blue-400 text-xs">
                <li>• Мы позвоним вам за 1 час до консультации</li>
                <li>• Возьмите с собой удостоверение личности</li>
                <li>• Подготовьте вопросы, которые хотите задать</li>
              </ul>
            </div>
          </div>

          <Button 
            onClick={() => setIsDialogOpen(false)}
            className="w-full"
          >
            Понятно
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}