'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, CalendarDays, HelpCircle } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function QuizSection() {
  const { lang } = useApp()
  const t = dict[lang]
  
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [quizDone, setQuizDone] = useState(false)

  const totalSteps = 4
  const progress = (Math.min(step - 1, totalSteps) / totalSteps) * 100

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
    // Scoring logic based on answers
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

  const questions = [
    {
      id: 1,
      question: t.step1,
      options: [
        { value: 'a', label: t.step1_a },
        { value: 'b', label: t.step1_b },
        { value: 'c', label: t.step1_c },
        { value: 'd', label: t.step1_d },
      ],
      hint: t.hint1
    },
    {
      id: 2,
      question: t.step2,
      options: [
        { value: 'a', label: t.step2_a },
        { value: 'b', label: t.step2_b },
        { value: 'c', label: t.step2_c },
      ],
      hint: t.hint2
    },
    {
      id: 3,
      question: t.step3,
      options: [
        { value: 'a', label: t.step3_a },
        { value: 'b', label: t.step3_b },
        { value: 'c', label: t.step3_c },
      ],
      hint: t.howto
    },
    {
      id: 4,
      question: t.step4,
      options: [
        { value: 'a', label: t.step4_a },
        { value: 'b', label: t.step4_b },
        { value: 'c', label: t.step4_c },
        { value: 'd', label: t.step4_d },
      ],
      hint: t.hint4
    }
  ]

  return (
    <section id="quiz" className="py-20 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-4">
            Квалификационный квиз
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.quiz_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Ответьте на 4 простых вопроса и узнайте вашу максимальную сумму кредита
          </p>
        </motion.div>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Progress */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                  <span>Вопрос {step} из {totalSteps}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={quizDone ? 100 : progress} className="h-3 bg-neutral-200 dark:bg-neutral-700" />
              </div>

              <AnimatePresence mode="wait">
                {!quizDone ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white text-center">
                      {questions[step - 1]?.question}
                    </h3>

                    <div className="grid gap-3">
                      {questions[step - 1]?.options.map((option, index) => (
                        <Button
                          key={option.value}
                          variant="outline"
                          className="justify-start h-auto py-4 px-6 text-left border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                          onClick={() => pick(
                            step === 1 ? 'amount' :
                            step === 2 ? 'job' :
                            step === 3 ? 'pension' : 'debt',
                            option.value
                          )}
                        >
                          <span className="flex-1">{option.label}</span>
                        </Button>
                      ))}
                    </div>

                    {questions[step - 1]?.hint && (
                      <div className="text-center">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-2">
                          <HelpCircle className="h-4 w-4" />
                          {questions[step - 1].hint}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-6"
                  >
                    {isTop20 ? (
                      <>
                        <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                            {t.result_good_title}
                          </h3>
                          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                            {t.result_good_text}
                          </p>
                        </div>
                        <Button 
                          size="lg" 
                          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
                        >
                          <CalendarDays className="mr-2 h-5 w-5" />
                          {t.book_now}
                        </Button>
                        <p className="text-sm text-neutral-500">
                          ⚡ {t.bonus}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-4">
                            {t.result_bad_title}
                          </h3>
                          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                            {t.result_bad_text}
                          </p>
                        </div>
                        <div className="space-y-4 max-w-md mx-auto">
                          <div className="text-left space-y-3">
                            <h4 className="font-semibold text-neutral-900 dark:text-white">
                              Рекомендации для улучшения шансов:
                            </h4>
                            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Увеличьте прозрачность дохода
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Погасите текущие просрочки
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Нарастите пенсионные отчисления
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}