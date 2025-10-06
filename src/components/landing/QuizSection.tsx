'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  CheckCircle2, 
  CalendarDays, 
  HelpCircle, 
  Clock, 
  Zap, 
  Star, 
  TrendingUp,
  Shield,
  ArrowRight,
  Phone,
  FileText,
  CreditCard,
  UserCheck,
  Send,
  X
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import { createDeal, updateTxt } from '@/app/actions'

// Простая интерполяция
const interpolate = (text: string, values: Record<string, string | number>): string => {
  return text.replace(/{{(\w+)}}/g, (_, key) => String(values[key] || `{{${key}}}`))
}

export default function QuizSection() {
  const { lang } = useApp()
  const t = dict[lang]
  
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [quizDone, setQuizDone] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success')
  const [phoneError, setPhoneError] = useState('')

  const totalSteps = 4
  const progress = (Math.min(step - 1, totalSteps) / totalSteps) * 100

  // Вопросы и опции — теперь через t.*
  const questions = [
    {
      id: 1,
      question: t.q1,
      icon: CreditCard,
      options: [
        { value: 'a', label: t.q1_a, emoji: '💰', description: t.q1_a_desc },
        { value: 'b', label: t.q1_b, emoji: '💵', description: t.q1_b_desc },
        { value: 'c', label: t.q1_c, emoji: '💎', description: t.q1_c_desc },
        { value: 'd', label: t.q1_d, emoji: '🏦', description: t.q1_d_desc },
      ],
      hint: t.q1_hint
    },
    {
      id: 2,
      question: t.q2,
      icon: UserCheck,
      options: [
        { value: 'a', label: t.q2_a, emoji: '✅', description: t.q2_a_desc },
        { value: 'b', label: t.q2_b, emoji: '📊', description: t.q2_b_desc },
        { value: 'c', label: t.q2_c, emoji: '⏸️', description: t.q2_c_desc },
      ],
      hint: t.q2_hint
    },
    {
      id: 3,
      question: t.q3,
      icon: FileText,
      options: [
        { value: 'a', label: t.q3_a, emoji: '📈', description: t.q3_a_desc },
        { value: 'b', label: t.q3_b, emoji: '📉', description: t.q3_b_desc },
        { value: 'c', label: t.q3_c, emoji: '❓', description: t.q3_c_desc },
      ],
      hint: t.q3_hint
    },
    {
      id: 4,
      question: t.q4,
      icon: Shield,
      options: [
        { value: 'a', label: t.q4_a, emoji: '🆓', description: t.q4_a_desc },
        { value: 'b', label: t.q4_b, emoji: '⏰', description: t.q4_b_desc },
        { value: 'c', label: t.q4_c, emoji: '⚡', description: t.q4_c_desc },
        { value: 'd', label: t.q4_d, emoji: '⚠️', description: t.q4_d_desc },
      ],
      hint: t.q4_hint
    }
  ]

  const pick = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      setQuizDone(true)
    }
  }

  const score = useMemo(() => {
    let s = 0
    if (answers.amount === 'd') s += 2
    if (answers.amount === 'c') s += 3
    if (answers.amount === 'b') s += 4
    if (answers.amount === 'a') s += 5

    if (answers.job === 'a') s += 5
    else if (answers.job === 'b') s += 3
    else s += 1

    if (answers.pension === 'a') s += 5
    else if (answers.pension === 'b') s += 3

    if (answers.debt === 'a') s += 5
    else if (answers.debt === 'b') s += 4
    else if (answers.debt === 'c') s += 2
    else s += 0

    return s
  }, [answers])

  const isTop20 = score >= 15

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

  const handlePhoneChange = (value: string) => {
    const formattedValue = formatPhone(value)
    setPhoneNumber(formattedValue)
    
    // Валидация телефона
    const numbers = formattedValue.replace(/\D/g, '')
    if (numbers.length < 11) {
      setPhoneError('Номер телефона должен содержать 11 цифр')
    } else {
      setPhoneError('')
    }
  }

  const isPhoneValid = (): boolean => {
    const numbers = phoneNumber.replace(/\D/g, '')
    return numbers.length === 11 && !phoneError
  }

  const handlePhoneSubmit = async () => {
    if (!isPhoneValid()) {
      setDialogType('error')
      setIsDialogOpen(true)
      return
    }

    setIsSubmitting(true)

    try {
      // Создаем заявку в основной системе
      const deal = await createDeal({
        name: 'Клиент квиза',
        phone_number: phoneNumber.replace(/\D/g, ''),
        comment: `Результат квиза: ${score}/20 баллов. ${isTop20 ? 'Топ 20%' : 'Нужна консультация'}. Ответы: ${JSON.stringify(answers)}`,
        selected_time: 'напоминание о заявке'
      })

      // Отправляем в TXT систему
      await updateTxt({
        name: 'Клиент квиза',
        phone: phoneNumber.replace(/\D/g, ''),
        service: "Консультация по кредиту",
        comment: `Результат квиза: ${score}/20 баллов. ${isTop20 ? 'Топ 20%' : 'Нужна консультация'}`,
        selected_time: 'напоминание о заявке'
      })

      // Успешная отправка
      setDialogType('success')
      setIsDialogOpen(true)
      
      // Сброс формы
      setPhoneNumber('')
      setPhoneError('')

    } catch (error) {
      console.error("Ошибка при отправке формы:", error)
      setDialogType('error')
      setIsDialogOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const getPersonalizedRecommendations = () => {
    const recs = []
    if (answers.job === 'c') recs.push(t.rec_job)
    if (['b', 'c'].includes(answers.pension)) recs.push(t.rec_pension_partial)
    if (['c', 'd'].includes(answers.debt)) recs.push(t.rec_debt_clear)
    if (answers.amount === 'd' && score < 15) recs.push(t.rec_amount_lower)
    
    return recs.length > 0 ? recs : [
      t.rec_income,
      t.rec_dti,
      t.rec_pension
    ]
  }

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  const currentQuestion = questions[step - 1]
  const CurrentIcon = currentQuestion?.icon

  // Форматирование суммы в результате
  const getMaxAmountText = () => {
    if (answers.amount === 'a') return '7'
    if (answers.amount === 'b') return '15'
    if (answers.amount === 'c') return '25'
    return '30'
  }

  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-orange-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2" />
            {t.quiz_badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.quiz_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {t.quiz_subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">
                        {interpolate(t.question_of, { step, total: totalSteps })}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <Clock className="h-3 w-3 mr-1" />
                    {t.time_badge}
                  </Badge>
                </div>
                <Progress 
                  value={quizDone ? 100 : progress} 
                  className="h-2 bg-neutral-200 dark:bg-neutral-700"
                />
              </div>

              <AnimatePresence mode="wait">
                {!quizDone ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-4">
                      {CurrentIcon && (
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center">
                          <CurrentIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                        {currentQuestion?.question}
                      </h3>
                    </div>

                    <div className="grid gap-4">
                      {currentQuestion?.options.map((option, index) => (
                        <motion.div
                          key={option.value}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-auto py-6 px-6 text-left border-2 border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 group transition-all duration-300"
                            onClick={() => pick(
                              step === 1 ? 'amount' :
                              step === 2 ? 'job' :
                              step === 3 ? 'pension' : 'debt',
                              option.value
                            )}
                          >
                            <div className="flex items-center gap-4 w-full">
                              <div className="text-2xl">{option.emoji}</div>
                              <div className="flex-1 text-left">
                                <div className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {option.label}
                                </div>
                                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                  {option.description}
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    {currentQuestion?.hint && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-center"
                      >
                        {step === 3 ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                                <HelpCircle className="h-4 w-4 mr-2" />
                                {currentQuestion.hint}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t.dialog_title}</DialogTitle>
                                <DialogDescription>{t.dialog_desc}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 text-sm">
                                {[
                                  t.dialog_step1,
                                  t.dialog_step2,
                                  t.dialog_step3,
                                  t.dialog_step4
                                ].map((text, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">{idx + 1}</div>
                                    <span>{text}</span>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            {currentQuestion.hint}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-8"
                  >
                    {isTop20 ? (
                      <>
                        <div className="space-y-6">
                          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25">
                            <CheckCircle2 className="h-12 w-12 text-white" />
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                              {t.result_success_title}
                            </h3>
                            <p className="text-xl text-neutral-600 dark:text-neutral-400">
                              {t.result_success_text1}
                            </p>
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold">
                              {t.result_success_text2}{' '}
                              <span className="text-2xl text-green-600 dark:text-green-400">
                                {getMaxAmountText()} млн ₸
                              </span>{' '}
                              бүгін
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <Button 
                            onClick={scrollToBooking}
                            size="lg" 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
                          >
                            <CalendarDays className="mr-2 h-5 w-5" />
                            <span className='text-[12px] md:text-[20px]'>{t.result_success_cta}</span>
                          </Button>
                          
                          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700">
                            <div className="flex items-center gap-3">
                              <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                              <div>
                                <div className="font-semibold text-yellow-800 dark:text-yellow-300">
                                  {t.result_bonus_title}
                                </div>
                                <div className="text-yellow-700 dark:text-yellow-400 text-sm">
                                  {t.result_bonus_desc}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-6">
                          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/25">
                            <HelpCircle className="h-12 w-12 text-white" />
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                              {t.result_improve_title}
                            </h3>
                            <p className="text-xl text-neutral-600 dark:text-neutral-400">
                              {t.result_improve_text}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="text-left space-y-4 bg-white/50 dark:bg-neutral-800/50 rounded-2xl p-6">
                            <h4 className="font-semibold text-neutral-900 dark:text-white text-lg flex items-center gap-2">
                              <Star className="h-5 w-5 text-blue-500" />
                              {t.result_recommendations_title}
                            </h4>
                            <ul className="space-y-3">
                              {getPersonalizedRecommendations().map((rec, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                                >
                                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{rec}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <div className="text-center">
                              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                {t.result_phone_prompt}
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <div className="relative flex-1">
                                  <Input
                                    placeholder={lang === 'ru' ? "+7 (___) ___-__-__" : "+7 (___) ___-__-__"}
                                    value={phoneNumber}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                    className={`flex-1 pr-4 ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
                                    maxLength={18}
                                  />
                                  {phoneError && (
                                    <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
                                      {phoneError}
                                    </p>
                                  )}
                                </div>
                                <Button 
                                  onClick={handlePhoneSubmit}
                                  disabled={isSubmitting || !isPhoneValid()}
                                  className="bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap"
                                >
                                  {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <>
                                      <Send className="h-4 w-4" />
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { icon: Shield, text: t.trust_confidential, color: 'text-blue-500' },
            { icon: Clock, text: t.trust_60sec, color: 'text-green-500' },
            { icon: CheckCircle2, text: t.trust_no_spam, color: 'text-emerald-500' },
            { icon: Star, text: t.trust_accurate, color: 'text-amber-500' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 justify-center p-4 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50"
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
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
                    <span>Телефон:</span>
                    <span className="font-semibold">{phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Результат:</span>
                    <span className="font-semibold">{score}/20 баллов</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Статус:</span>
                    <span className={`font-semibold ${
                      isTop20 ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {isTop20 ? 'Топ 20%' : 'Нужна консультация'}
                    </span>
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