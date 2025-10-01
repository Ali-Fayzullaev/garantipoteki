'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, CheckCircle2, TrendingUp, Users, Award, MapPin } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function SocialProofSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const stats = [
    {
      icon: TrendingUp,
      value: '8/10',
      label: t.stat_1,
      description: 'Клиентов получают больше запрошенного'
    },
    {
      icon: CheckCircle2,
      value: '93%',
      label: t.stat_2,
      description: 'Одобрение с первого обращения'
    },
    {
      icon: Star,
      value: '2.5x',
      label: t.stat_3,
      description: 'Выше среднего банковского предложения'
    },
    {
      icon: Users,
      value: '1000+',
      label: 'Успешных сделок',
      description: 'С 2015 года'
    }
  ]

  const successStories = [
    {
      id: 1,
      name: 'Айгуль, бухгалтер',
      location: 'Алматы',
      amount: '10 000 000 ₸',
      duration: '1 час',
      image: '/avatars/avatar-1.jpg',
      story: t.case_main_text,
      badges: ['Повышенная сумма', 'Ускоренное одобрение', 'Пониженная ставка']
    },
    {
      id: 2,
      name: 'Марат К., предприниматель',
      location: 'Астана',
      amount: '12 000 000 ₸',
      duration: '1 день',
      image: '/avatars/avatar-2.jpg',
      story: 'Банки давали только 4 млн, нужно было 15. Через «Гарант Ипотеки» получил 12 миллионов за один день!',
      badges: ['Бизнес-кредит', 'Сложный случай', 'Быстрое решение']
    },
    {
      id: 3,
      name: 'Динара Т., врач',
      location: 'Астана',
      amount: '8 000 000 ₸',
      duration: '2 часа',
      image: '/avatars/avatar-3.jpg',
      story: 'Помогли получить 8 млн — другие банки отказывали из‑за специфики зарплаты врача.',
      badges: ['Специальность', 'Подтверждение дохода', 'Оптимальная ставка']
    }
  ]

  const latestCases = [
    {
      name: 'Асхат М., менеджер',
      amount: '15 000 000 ₸',
      description: 'Получил крупную сумму без залога — специалисты знают своё дело.'
    },
    {
      name: 'Гульнара С., учитель',
      amount: '6 500 000 ₸',
      description: 'Банки отказывали из-за возраста, нашли оптимальное решение.'
    },
    {
      name: 'Арман Ж., инженер',
      amount: '9 000 000 ₸',
      description: 'С действующими кредитами одобрили дополнительную сумму.'
    },
    {
      name: 'Алия К., фрилансер',
      amount: '5 000 000 ₸',
      description: 'Без официального трудоустройства, по справкам о доходах.'
    }
  ]

  const banks = [
    { name: 'Halyk Bank', logo: '🏦' },
    { name: 'Kaspi Bank', logo: '💳' },
    { name: 'ForteBank', logo: '🏢' },
    { name: 'Jusan Bank', logo: '🌟' },
    { name: 'Eurasian Bank', logo: '🌍' },
    { name: 'Bank CenterCredit', logo: '🎯' }
  ]

  return (
    <section id="proof" className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
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
            <Award className="w-4 h-4 mr-2" />
            Реальные результаты
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.proof_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Более 1000 успешных кейсов и довольных клиентов по всему Казахстану
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">АК</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {t.case_main_title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <MapPin className="h-4 w-4" />
                      <span>Алматы</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  {t.case_main_text}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0">
                    ✅ {successStories[0].amount}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0">
                    ⚡ {successStories[0].duration}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-0">
                    📉 Пониженная ставка
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Было предложено банками:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">3 000 000 ₸</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Получили через нас:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">10 000 000 ₸</span>
                  </div>
                </div>
              </CardContent>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-8 lg:p-12">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                      +233%
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      Выше первоначального предложения
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Узнать свою сумму
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Success Stories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            {t.latest_title}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.slice(1).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">
                          {story.name.split(' ')[0][0]}{story.name.split(' ')[1][0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {story.name}
                        </h4>
                        <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <MapPin className="h-3 w-3" />
                          <span>{story.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 leading-relaxed">
                      {story.story}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Сумма:</span>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0">
                          {story.amount}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Срок:</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">{story.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-4">
                      {story.badges.slice(0, 2).map((badge, badgeIndex) => (
                        <Badge 
                          key={badgeIndex} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Latest Cases Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                Свежие одобрения на этой неделе
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestCases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600"
                  >
                    <div className="text-lg font-bold text-primary mb-2">
                      {caseItem.amount}
                    </div>
                    <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-2">
                      {caseItem.name}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      {caseItem.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Partner Banks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            Работаем со всеми ведущими банками Казахстана
          </h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {banks.map((bank, index) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg flex items-center justify-center text-2xl">
                  {bank.logo}
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {bank.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Узнайте, какую сумму можете получить вы
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам довольных клиентов, которые уже получили максимальные суммы на лучших условиях
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  Записаться на консультацию
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  Посмотреть все кейсы
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}