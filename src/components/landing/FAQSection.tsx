'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, CalendarDays } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function FAQSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const faqItems = [
    {
      question: t.faq_q1,
      answer: t.faq_a1,
    },
    {
      question: t.faq_q2,
      answer: t.faq_a2,
    },
    {
      question: t.faq_q3,
      answer: t.faq_a3,
    },
    {
      question: t.faq_q4,
      answer: t.faq_a4,
    },
    {
      question: t.faq_q5,
      answer: t.faq_a5,
    },
    {
      question: t.faq_q6,
      answer: t.faq_a6,
    },
    {
      question: t.faq_q7,
      answer: t.faq_a7,
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

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            {t.faq_badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.faq_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t.faq_subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div>
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-blue-500" />
                {t.faq_main_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index}>
                    <AccordionItem 
                      value={`item-${index}`}
                      className="border border-neutral-200 dark:border-neutral-700 rounded-2xl px-4 sm:px-6 bg-white dark:bg-neutral-800"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 sm:py-6">
                        <div className="text-left w-full">
                          <div className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white pr-4">
                            {item.question}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 sm:pb-6">
                        <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                          {item.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
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
                  className="bg-white text-blue-600 hover:bg-white/90 px-6 sm:px-8 font-semibold min-h-[48px]"
                >
                  <CalendarDays className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className='text-xs sm:text-sm'>{t.faq_cta_button}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}