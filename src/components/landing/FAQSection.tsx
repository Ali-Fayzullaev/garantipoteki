'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, MessageCircle, Phone, CalendarDays, Shield, Clock, FileText } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function FAQSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const faqItems = [
    {
      question: t.q1,
      answer: t.a1,
      icon: Shield,
      category: 'Безопасность'
    },
    {
      question: t.q2,
      answer: t.a2,
      icon: FileText,
      category: 'Документы'
    },
    {
      question: t.q3,
      answer: t.a3,
      icon: Clock,
      category: 'Процесс'
    },
    {
      question: t.q4,
      answer: t.a4,
      icon: HelpCircle,
      category: 'Условия'
    },
    {
      question: t.q5,
      answer: t.a5,
      icon: MessageCircle,
      category: 'Сотрудничество'
    }
  ]

  const additionalQuestions = [
    {
      question: "Сколько стоит консультация?",
      answer: "Консультация абсолютно бесплатная. Мы зарабатываем только когда помогаем вам получить кредит, и только от банков-партнеров."
    },
    {
      question: "Что если мне откажут?",
      answer: "До подачи заявки мы проводим полный анализ вашей ситуации и подаем заявку только если уверены в одобрении. Если по каким-то причинам произойдет отказ, мы бесплатно подготовим новую заявку в другой банк."
    },
    {
      question: "Нужен ли первоначальный взнос?",
      answer: "Нет, мы не берем никаких предоплат. Оплата происходит только после успешного получения вами кредита."
    },
    {
      question: "Как быстро можно получить деньги?",
      answer: "При правильно подготовленной заявке большинство клиентов получают деньги в тот же день. Максимальный срок - 1-2 рабочих дня."
    }
  ]

  const supportChannels = [
    {
      icon: Phone,
      title: 'Телефон',
      description: 'Быстрая консультация по телефону',
      contact: '+7 (777) 123-45-67',
      responseTime: '5-10 минут'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Напишите нам в мессенджер',
      contact: '+7 (777) 123-45-67',
      responseTime: '2-5 минут'
    },
    {
      icon: CalendarDays,
      title: 'Онлайн-запись',
      description: 'Запишитесь на консультацию',
      contact: '24/7',
      responseTime: 'Подтверждение за 1 час'
    }
  ]

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
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Поддержка
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.faq_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Ответы на самые частые вопросы о получении кредита и нашей работе
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
                  <HelpCircle className="h-6 w-6 text-primary" />
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
                        className="border border-neutral-200 dark:border-neutral-700 rounded-2xl px-6 hover:border-primary/50 transition-colors duration-300"
                      >
                        <AccordionTrigger className="hover:no-underline py-6">
                          <div className="flex items-start gap-4 text-left">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mt-1">
                              <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
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
                          <div className="pl-14">
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>

                {/* Additional Questions */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Дополнительные вопросы
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {additionalQuestions.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 transition-colors duration-300">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-2">
                              {item.question}
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                              {item.answer}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Channels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Support Card */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
              <CardHeader className="text-center">
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Нужна помощь?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {supportChannels.map((channel, index) => (
                  <motion.div
                    key={channel.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <channel.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                        {channel.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-2">
                        {channel.description}
                      </p>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-neutral-900 dark:text-white">
                          {channel.contact}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Ответ: {channel.responseTime}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Записаться на консультацию
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Phone className="mr-2 h-4 w-4" />
                  Позвонить сейчас
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Написать в WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Гарантии
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { text: 'Конфиденциальность данных', icon: Shield },
                  { text: 'Бесплатная консультация', icon: HelpCircle },
                  { text: 'Официальный договор', icon: FileText },
                  { text: 'Работаем с 2015 года', icon: Clock }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {item.text}
                    </span>
                  </div>
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
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Не нашли ответ на свой вопрос?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
                Наши специалисты готовы ответить на любые ваши вопросы и помочь подобрать оптимальное решение
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  <Phone className="mr-2 h-4 w-4" />
                  Позвонить специалисту
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Написать в чат
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}