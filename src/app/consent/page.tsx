'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield,
  FileText,
  CheckCircle2,
  Download,
  ArrowLeft,
  Calendar,
  UserCheck,
  MoveLeft
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageToggle from '@/components/ui/LanguageToggle'

export default function PrivacyPolicy() {
  const { lang } = useApp()

  const consentData = {
    ru: {
      title: "Согласие на обработку персональных данных",
      lastUpdated: "Последнее обновление: 15 декабря 2024 года",
      company: 'ТОО "Гарант Ипотеки"',
      intro: "Настоящим я даю свое согласие на обработку моих персональных данных в соответствии с Законом Республики Казахстан «О персональных данных и их защите».",
      
      sections: [
        {
          title: "1. Состав персональных данных",
          content: "Я предоставляю согласие на обработку следующих персональных данных: фамилия, имя, отчество; контактные данные (телефон, электронная почта); паспортные данные; данные о месте работы и доходах; семейное положение; информация об имуществе; кредитная история; иные данные, необходимые для рассмотрения заявки на ипотеку."
        },
        {
          title: "2. Цели обработки",
          content: "Обработка персональных данных осуществляется в следующих целях: рассмотрение заявки на получение ипотечного кредита; подбор оптимальных ипотечных программ; консультирование по вопросам ипотечного кредитования; оформление необходимых документов; взаимодействие с банками-партнерами; улучшение качества обслуживания."
        },
        {
          title: "3. Способы обработки",
          content: "Обработка может включать следующие действия: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных."
        },
        {
          title: "4. Передача третьим лицам",
          content: "Я соглашаюсь с тем, что мои персональные данные могут быть переданы банкам-партнерам и другим организациям, участвующим в процессе оформления ипотечного кредита, исключительно в целях, указанных в настоящем согласии."
        },
        {
          title: "5. Срок действия согласия",
          content: "Согласие действует с момента его предоставления и до достижения целей обработки, но не менее 5 лет. Я вправе отозвать настоящее согласие путем направления письменного заявления по адресу компании."
        },
        {
          title: "6. Права субъекта",
          content: "Я осведомлен(а) о том, что имею право: получать информацию regarding обработки моих персональных данных; требовать уточнения, блокирования или уничтожения моих персональных данных; отозвать настоящее согласие; защищать свои права и законные интересы в установленном законом порядке."
        }
      ],

      contacts: {
        address: "г. Нур-Султан, пр. Кабанбай батыра, 15",
        email: "info@garantipoteki.kz"
      },

      downloadText: "Скачать согласие в формате PDF",
      backText: "Вернуться на главную"
    },

    kk: {
      title: "Жеке деректерді өңдеуге келісім",
      lastUpdated: "Соңғы жаңартылуы: 15 желтоқсан 2024 жыл",
      company: '"Гарант Ипотеки" ЖШС',
      intro: "Осы арқылы мен Қазақстан Республикасының «Жеке деректер және оларды қорғау туралы» Заңына сәйкес жеке деректерімді өңдеуге келісім беремін.",
      
      sections: [
        {
          title: "1. Жеке деректердің құрамы",
          content: "Мен келесі жеке деректерді өңдеуге келісім беремін: тегі, аты, әкесінің аты; байланыс деректері (телефон, электрондық пошта); төлқұжат деректері; жұмыс орны және табыс туралы деректер; отбасылық жағдай; мүлік туралы ақпарат; несие тарихы; ипотекаға өтініш қарау үшін қажетті басқа да деректер."
        },
        {
          title: "2. Өңдеу мақсаттары",
          content: "Жеке деректерді өңдеу келесі мақсаттарда жүргізіледі: ипотекалық несие алуға өтініш қарау; оңтайлы ипотекалық бағдарламаларды таңдау; ипотекалық несиелеу мәселелері бойынша кеңес беру; қажетті құжаттарды ресімдеу; серіктес банктермен өзара әрекеттесу; қызмет көрсету сапасын жақсарту."
        },
        {
          title: "3. Өңдеу әдістері",
          content: "Өңдеу келесі әрекеттерді қамтуы мүмкін: жинау, жазбаша түрде белгілеу, жүйелеу, жинақтау, сақтау, нақтылау (жаңарту, өзгерту), алу, пайдалану, беру (қамтамасыз ету, қол жеткізу), жеке емес ету, бұғаттау, жою, жою жеке деректер."
        },
        {
          title: "4. Үшінші тұлғаларға беру",
          content: "Мен жеке деректерімнің осы келісімде көрсетілген мақсаттарда ғана серіктес банктерге және ипотекалық несиені ресімдеу процесіне қатысатын басқа ұйымдарға берілуіне келісемін."
        },
        {
          title: "5. Келісімнің мерзімі",
          content: "Келісім оны беру сәтінен бастап және өңдеу мақсаттарына жеткенге дейін, бірақ кем дегенде 5 жыл мерзімге жарамды. Мен осы келісімді компания мекенжайына жазбаша өтініш жіберу арқылы кері алуға құқылымын."
        },
        {
          title: "6. Субъектінің құқықтары",
          content: "Мен мына құқықтарға ие екенімді білемін: жеке деректерімді өңдеу туралы ақпарат алу; жеке деректерімді нақтылау, бұғаттау немесе жоюды талап ету; осы келісімді кері алу; заңда белгіленген тәртіпте өз құқықтары мен заңды мүдделерін қорғау."
        }
      ],

      contacts: {
        address: "Нұр-Сұлтан к., Қабанбай батыр даңғылы, 15",
        phone: "+7 (777) 123-45-67",
        email: "info@garantipoteki.kz"
      },

      downloadText: "PDF форматында келісімді жүктеу",
      backText: "Басты бетке оралу"
    }
  }

  const data = lang === 'ru' ? consentData.ru : consentData.kk

  return (
    <section className="min-h-screen py-8 md:py-16 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 ">
        <div className="flex gap-4 mb-8">
          <Button
            className="py-3 px-4 flex items-center gap-2"
            variant="outline"
            size="lg"
          >
            <MoveLeft size={16} />
            <Link href="/" className="flex items-center">
              {lang === "ru" ? "Назад" : "Артқа"}
            </Link>
          </Button>
          <ThemeToggle />
          <LanguageToggle />
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex justify-center mb-4">
            <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-2 backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              {lang === 'ru' ? "Юридический документ" : "Заңдық құжат"}
            </Badge>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {data.title}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{data.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">{data.company}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {lang === 'ru' ? "Содержание" : "Мазмұны"}
                </h3>
                
                <nav className="space-y-2">
                  {data.sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#section-${index + 1}`}
                      className="block text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-1"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {data.downloadText}
                  </Button>
                  
                  <Link href="/" className="block mt-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {data.backText}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                {/* Intro */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
                    <p className="text-blue-800 dark:text-blue-200 text-lg leading-relaxed">
                      {data.intro}
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-8">
                    {data.sections.map((section, index) => (
                      <motion.div
                        key={index}
                        id={`section-${index + 1}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="scroll-mt-24"
                      >
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          {section.title}
                        </h3>
                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {section.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contacts */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700"
                  >
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-blue-500" />
                      {lang === 'ru' ? "Контактная информация" : "Байланыс ақпараты"}
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <FileText className="h-6 w-6 text-blue-500" />
                        </div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {lang === 'ru' ? "Адрес" : "Мекенжай"}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {data.contacts.address}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <FileText className="h-6 w-6 text-green-500" />
                        </div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                          {lang === 'ru' ? "Телефон" : "Телефон"}
                        </h4>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <FileText className="h-6 w-6 text-purple-500" />
                        </div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                          E-mail
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {data.contacts.email}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}