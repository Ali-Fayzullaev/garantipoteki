'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, CalendarDays, Shield, Clock, FileText, Building2, CheckCircle2, Zap } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function FAQSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const faqItems = [
    {
      question: t.faq_q1,
      answer: t.faq_a1,
      icon: Shield,
      category: t.faq_cat_security
    },
    {
      question: t.faq_q2,
      answer: t.faq_a2,
      icon: FileText,
      category: t.faq_cat_docs
    },
    {
      question: t.faq_q3,
      answer: t.faq_a3,
      icon: Clock,
      category: t.faq_cat_process
    },
    {
      question: t.faq_q4,
      answer: t.faq_a4,
      icon: HelpCircle,
      category: t.faq_cat_cost
    },
    {
      question: t.faq_q5,
      answer: t.faq_a5,
      icon: CheckCircle2,
      category: t.faq_cat_terms
    },
    {
      question: t.faq_q6,
      answer: t.faq_a6,
      icon: Building2,
      category: t.faq_cat_partners
    },
    {
      question: t.faq_q7,
      answer: t.faq_a7,
      icon: Zap,
      category: t.faq_cat_guarantee
    }
  ]

  const processSteps = [
    {
      step: "1",
      title: t.process_step1_title,
      duration: t.process_step1_duration,
      description: t.process_step1_desc
    },
    {
      step: "2",
      title: t.process_step2_title,
      duration: t.process_step2_duration,
      description: t.process_step2_desc
    },
    {
      step: "3",
      title: t.process_step3_title,
      duration: t.process_step3_duration,
      description: t.process_step3_desc
    }
  ]

  const scrollToBooking = () => {
    const bookingElement = document.getElementById('booking')
    if (bookingElement) {
      bookingElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Конфигурация анимаций для предотвращения прыжков
  const animationConfig = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  }

  const cardAnimation = {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7 }
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          {...animationConfig}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 mr-2" />
            {t.faq_badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.faq_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t.faq_subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main FAQ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[600px]">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-blue-500" />
                  {t.faq_main_title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <AccordionItem 
                        value={`item-${index}`}
                        className="border border-neutral-200 dark:border-neutral-700 rounded-2xl px-4 sm:px-6 hover:border-blue-500/50 transition-all duration-300 bg-white dark:bg-neutral-800"
                      >
                        <AccordionTrigger className="hover:no-underline py-4 sm:py-6">
                          <div className="flex items-start gap-3 sm:gap-4 text-left w-full">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl flex items-center justify-center">
                              <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-2 pr-4">
                                {item.question}
                              </div>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                {item.category}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 sm:pb-6">
                          <div className="pl-0 sm:pl-14">
                            <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
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
            {...cardAnimation}
            className="space-y-6"
          >
            {/* Process Timeline */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 min-h-[300px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-blue-500" />
                  {t.time_process_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-neutral-800/50"
                  >
                    <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{step.step}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                          {step.title}
                        </h4>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs whitespace-nowrap">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mt-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      {t.process_fast_result}
                    </span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 min-h-[280px]">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  {t.security_titleBook || "Наши гарантии"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { 
                    text: t.trust_data_privacy, 
                    icon: Shield,
                    description: t.trust_data_desc 
                  },
                  { 
                    text: t.trust_free_consult, 
                    icon: HelpCircle,
                    description: t.trust_free_desc 
                  },
                  { 
                    text: t.trust_official_contract, 
                    icon: FileText,
                    description: t.trust_contract_desc 
                  },
                  { 
                    text: t.trust_experience, 
                    icon: Clock,
                    description: t.trust_exp_desc 
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-5px" }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <item.icon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white leading-tight">
                        {item.text}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
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
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white overflow-hidden">
            <CardContent className="p-6 sm:p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 relative z-10">
                {t.faq_cta_title}
              </h3>
              <p className="text-white/80 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base relative z-10">
                {t.faq_cta_subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
                <Button 
                  onClick={scrollToBooking}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-white/90 px-6 sm:px-8 font-semibold transition-all duration-300 hover:scale-105 min-h-[48px]"
                >
                  <CalendarDays className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className='text-xs sm:text-sm'>{t.faq_cta_button}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}