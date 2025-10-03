'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, MessageCircle, Phone, CalendarDays, Shield, Clock, FileText, Building2, CheckCircle2, Zap } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function FAQSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const faqItems = [
    {
      question: "Почему нельзя получить консультацию по телефону?",
      answer: "К сожалению, в последнее время участились случаи мошенничества в сфере кредитования. Встреча в офисе - это гарантия вашей безопасности. Кроме того, для точного расчета максимальной суммы нам нужно детально изучить вашу ситуацию и документы, что невозможно сделать по телефону.",
      icon: Shield,
      category: 'Безопасность'
    },
    {
      question: "Какие документы нужны для консультации?",
      answer: "Только удостоверение личности. Остальные документы мы можем собрать на самой консультации.",
      icon: FileText,
      category: 'Документы'
    },
    {
      question: "Сколько времени занимает весь процесс?",
      answer: "• Консультация: 30-40 минут\n• Подача заявки: 15-20 минут\n• Получение решения: от 1 часа до 1 дня\n\nПри правильно подготовленной заявке большинство клиентов получают деньги в тот же день.",
      icon: Clock,
      category: 'Процесс'
    },
    {
      question: "Сколько стоит консультация?",
      answer: "Консультация абсолютно бесплатная. Мы зарабатываем только когда помогаем вам получить кредит, и только от банков-партнеров.",
      icon: HelpCircle,
      category: 'Стоимость'
    },
    {
      question: "Что если у меня есть действующие кредиты?",
      answer: "Наличие текущих кредитов - не проблема, если платежи вносятся вовремя. Мы знаем, как правильно структурировать заявку, чтобы получить одобрение даже с действующими кредитами.",
      icon: CheckCircle2,
      category: 'Условия'
    },
    {
      question: "С какими банками вы работаете?",
      answer: "Мы сотрудничаем со всеми крупными банками Казахстана. На консультации подберем банк с лучшими условиями именно для вашей ситуации.",
      icon: Building2,
      category: 'Сотрудничество'
    },
    {
      question: "Что если мне откажут?",
      answer: "До подачи заявки мы проводим полный анализ вашей ситуации и подаем заявку только если уверены в одобрении. Если по каким-то причинам произойдет отказ, мы бесплатно подготовим новую заявку в другой банк.",
      icon: Zap,
      category: 'Гарантии'
    }
  ]

  const supportChannels = [
    {
      icon: Phone,
      title: 'Телефон',
      description: 'Быстрая консультация по телефону',
      contact: '+7 (777) 123-45-67',
      responseTime: '5-10 минут',
      color: 'text-blue-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Напишите нам в мессенджер',
      contact: '+7 (777) 123-45-67',
      responseTime: '2-5 минут',
      color: 'text-green-500'
    },
    {
      icon: CalendarDays,
      title: 'Онлайн-запись',
      description: 'Запишитесь на консультацию',
      contact: '24/7',
      responseTime: 'Подтверждение за 1 час',
      color: 'text-purple-500'
    }
  ]

  const processSteps = [
    {
      step: "1",
      title: "Консультация",
      duration: "30-40 минут",
      description: "Детальный разбор вашей ситуации"
    },
    {
      step: "2",
      title: "Подача заявки",
      duration: "15-20 минут",
      description: "Оформление документов"
    },
    {
      step: "3",
      title: "Получение решения",
      duration: "1 час - 1 день",
      description: "Одобрение от банка"
    }
  ]

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 mr-2" />
            Ответы на частые вопросы
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Всё, что вам нужно знать о процессе получения кредита и нашей работе
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main FAQ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-blue-500" />
                  Частые вопросы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <AccordionItem 
                        value={`item-${index}`}
                        className="border border-neutral-200 dark:border-neutral-700 rounded-2xl px-6 hover:border-blue-500/50 transition-all duration-300"
                      >
                        <AccordionTrigger className="hover:no-underline py-6">
                          <div className="flex items-start gap-4 text-left">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl flex items-center justify-center">
                              <item.icon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-neutral-900 dark:text-white text-lg mb-2">
                                {item.question}
                              </div>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                {item.category}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <div className="pl-16">
                            <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Channels & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Process Timeline */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Время процесса
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-3 rounded-xl bg-white/50 dark:bg-neutral-800/50"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                          {step.title}
                        </h4>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-1">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div className="mt-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      Большинство клиентов получают деньги в тот же день!
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Trust Badges */}
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Наши гарантии
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { 
                    text: 'Конфиденциальность данных', 
                    icon: Shield,
                    description: 'Полная защита вашей информации' 
                  },
                  { 
                    text: 'Бесплатная консультация', 
                    icon: HelpCircle,
                    description: 'Никаких предоплат' 
                  },
                  { 
                    text: 'Официальный договор', 
                    icon: FileText,
                    description: 'Прозрачные условия' 
                  },
                  { 
                    text: 'Работаем с 2015 года', 
                    icon: Clock,
                    description: '10 лет успешной работы' 
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <item.icon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">
                        {item.text}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Остались вопросы?
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Задайте их нашему специалисту на консультации и получите персональные ответы на все ваши вопросы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={scrollToBooking}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-white/90 px-8 font-semibold"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Записаться и получить ответы на все вопросы
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}