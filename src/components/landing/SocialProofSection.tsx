'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Award, 
  MapPin, 
  Clock,
  Shield,
  FileText,
  Building2,
  CalendarDays,
  ArrowRight
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function SocialProofSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const stats = [
    {
      icon: TrendingUp,
      value: '8/10',
      label: 'Клиентов получают больше',
      description: 'чем просили изначально'
    },
    {
      icon: CheckCircle2,
      value: '93%',
      label: 'Заявок одобряются',
      description: 'с первого раза'
    },
    {
      icon: Star,
      value: '2.5x',
      label: 'Средняя сумма',
      description: 'выше банковской'
    },
    {
      icon: Users,
      value: '1000+',
      label: 'Успешных сделок',
      description: 'с 2015 года'
    }
  ]

  const successStories = [
    {
      id: 1,
      name: 'Айгуль, бухгалтер',
      location: 'Алматы',
      amount: '10 000 000 ₸',
      duration: '1 час',
      story: "У меня была хорошая кредитная история, но банки предлагали максимум 3 миллиона, хотя мне нужно было 10. В Гарант Ипотеки мне объяснили, что дело не в моей платежеспособности, а в неправильном выборе банка и времени подачи заявки. После консультации мы подали заявку в нужный банк, и через час я получила одобрение на 10 миллионов тенге! Самое удивительное - ставка оказалась даже ниже, чем предлагали другие банки на меньшую сумму.",
      badges: ['Повышенная сумма', 'Ускоренное одобрение', 'Пониженная ставка'],
      quote: "Я думала, что из-за действующих кредитов мне никто не поможет..."
    },
    {
      id: 2,
      name: 'Марат К., предприниматель',
      location: 'Астана',
      amount: '12 000 000 ₸',
      duration: '1 день',
      story: "Нужны были деньги на расширение бизнеса. Банки давали только 4 миллиона, хотя просил 15. Через Гарант Ипотеки получил 12 миллионов за один день!",
      badges: ['Бизнес-кредит', 'Сложный случай', 'Быстрое решение']
    },
    {
      id: 3,
      name: 'Динара Т., врач',
      location: 'Астана',
      amount: '8 000 000 ₸',
      duration: '2 часа',
      story: "Спасибо команде за профессионализм! Помогли получить 8 миллионов, хотя другие говорили, что это невозможно с моей зарплатой",
      badges: ['Специальность', 'Подтверждение дохода', 'Оптимальная ставка']
    },
    {
      id: 4,
      name: 'Асхат М., менеджер',
      location: 'Астана',
      amount: '15 000 000 ₸',
      duration: '3 часа',
      story: "Честно не верил, что можно получить такую сумму без залога. Но ваши специалисты знают своё дело!",
      badges: ['Без залога', 'Крупная сумма', 'Профессионализм']
    }
  ]

  const latestCases = [
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
    },
    {
      name: 'Ербол Н., таксист',
      amount: '7 200 000 ₸',
      description: 'С сезонным доходом получил стабильное финансирование.'
    }
  ]

  const banks = [
    { name: 'Halyk Bank', logo: 'H' },
    { name: 'Kaspi Bank', logo: 'K' },
    { name: 'ForteBank', logo: 'F' },
    { name: 'Jusan Bank', logo: 'J' },
    { name: 'Eurasian Bank', logo: 'E' },
    { name: 'Bank CenterCredit', logo: 'BCC' }
  ]

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Гарантия безопасности ваших данных',
      description: 'Полная конфиденциальность и защита информации'
    },
    {
      icon: FileText,
      title: 'Возможность проверить все документы',
      description: 'Прозрачность на всех этапах работы'
    },
    {
      icon: Users,
      title: 'Детальный разбор вашей ситуации',
      description: 'Индивидуальный подход к каждому клиенту'
    },
    {
      icon: CheckCircle2,
      title: 'Прозрачность всех условий',
      description: 'Никаких скрытых комиссий и платежей'
    }
  ]

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="proof" className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <Award className="w-4 h-4 mr-2" />
            Вот почему нам доверяют
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Реальные истории успеха
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Более 1000 довольных клиентов по всему Казахстану уже получили максимальные суммы
          </p>
        </motion.div>

        {/* Main Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <CardContent className="p-8 lg:p-12">
                {/* Quote */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-lg italic text-neutral-700 dark:text-neutral-300">
                    "{successStories[0].quote}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">АК</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      История Айгуль, бухгалтера из Алматы
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <MapPin className="h-4 w-4" />
                      <span>Алматы</span>
                    </div>
                  </div>
                </div>

                {/* Story */}
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  {successStories[0].story}
                </p>

                {/* Results */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 px-4 py-2">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Одобрено: {successStories[0].amount}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0 px-4 py-2">
                      <Clock className="h-4 w-4 mr-1" />
                      Срок рассмотрения: {successStories[0].duration}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-neutral-800/50">
                      <div className="text-neutral-600 dark:text-neutral-400">Было предложено банками:</div>
                      <div className="font-semibold text-neutral-900 dark:text-white">3 000 000 ₸</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                      <div className="text-green-600 dark:text-green-400">Получили через нас:</div>
                      <div className="font-bold text-green-600 dark:text-green-400">10 000 000 ₸</div>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Stats Side */}
              <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 flex items-center justify-center p-8 lg:p-12">
                <div className="text-center space-y-8 w-full">
                  <div>
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25 mb-4">
                      <TrendingUp className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                      +233%
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      Выше первоначального предложения
                    </div>
                  </div>

                  {/* Mini Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">83%</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">Ниже ставка</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">1 час</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">Время одобрения</div>
                    </div>
                  </div>

                  <Button 
                    onClick={scrollToBooking}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg shadow-green-500/25"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Узнать свою сумму
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                Наши результаты в цифрах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl flex items-center justify-center">
                      <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {stat.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Stories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Последние успешные кейсы этой недели
            </h3>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Реальные истории клиентов, получивших крупные суммы
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStories.slice(1).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:from-blue-500/20 group-hover:to-green-500/20 transition-all duration-300">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {story.amount}
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-lg mb-1">
                        {story.name}
                      </h4>
                      <div className="flex items-center justify-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>{story.location}</span>
                      </div>
                    </div>

                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 leading-relaxed text-center">
                      {story.story}
                    </p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                        <Clock className="h-3 w-3" />
                        <span>{story.duration}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Одобрено
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 justify-center">
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

        {/* Latest Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
            <CardHeader className="text-center">
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
                    className="text-center p-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-white/50 dark:border-neutral-700/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {caseItem.amount}
                    </div>
                    <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-2">
                      {caseItem.name}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {caseItem.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security & Offices Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Security Features */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Почему мы проводим консультации только в офисе
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20"
                  >
                    <feature.icon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Office Info */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-5 w-5 text-green-500" />
                  Наши офисы в Астане
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">Левый берег</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">пр. Кабанбай батыра, 15</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <MapPin className="h-3 w-3 mr-1" />
                      Карта
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">Правый берег</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">ул. Достык, 12</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <MapPin className="h-3 w-3 mr-1" />
                      Карта
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Clock className="h-4 w-4" />
                  <span>Работаем ежедневно с 9:00 до 18:00</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Записаться на консультацию
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Partner Banks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16 text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            Работаем со всеми ведущими банками Казахстана
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {banks.map((bank, index) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{bank.logo}</span>
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
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Узнайте, какую сумму можете получить вы
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам довольных клиентов, которые уже получили максимальные суммы на лучших условиях
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={scrollToBooking}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-white/90 px-8 font-semibold"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Записаться на консультацию
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 px-8"
                >
                  <FileText className="mr-2 h-5 w-5" />
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