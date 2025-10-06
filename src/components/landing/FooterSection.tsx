'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  Award,
  Calculator,
  FileText,
  MessageCircle,
  CheckCircle,
  Star
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import Image from 'next/image'
import Partners from '@/lib/partners'

export default function FooterSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const companyInfo = {
    name: 'ТОО Гарант Ипотеки',
    description: 'Помогаем получить максимальную сумму кредита на лучших условиях с 2015 года.',
    bin: 'БИН: 123456789012',
    founded: '2015'
  }

  const contactInfo = {
    phone: '+7 (777) 123-45-67',
    email: 'info@garantipoteki.kz',
    address: 'г. Астана, пр. Кабанбай батыра, 15',
    hours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00'
  }

  const usefulLinks = [
    {
      icon: Calculator,
      name: 'Профессиональная консультация',
      href: '#booking'
    },
    {
      icon: CheckCircle,
      name: 'Узнайте за 60 секунд',
      href: '#quiz'
    },
    {
      icon: FileText,
      name: 'Частые вопросы',
      href: '#faq'
    },
    {
      icon: Star,
      name: 'Отзывы клиентов',
      href: '#reviews'
    }
  ]

  const documents = [
    {
      name: 'Политика конфиденциальности',
      href: '/privacy'
    },
    {
      name: 'Пользовательское соглашение',
      href: '/terms'
    },
    {
      name: 'Согласие на обработку персональных данных',
      href: '/consent'
    },
    {
      name: 'Правила использования сайта',
      href: '/rules'
    }
  ]

  const trustBadges = [
    { icon: Shield, text: 'Официальный партнер банков' },
    { icon: Award, text: `Работаем с ${companyInfo.founded} года` },
    { icon: Clock, text: 'Более 1000 успешных сделок' }
  ]

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white">
      {/* Main Footer */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Колонка 1: О компании */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Logo & Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="Гарант Ипотеки"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Гарант Ипотеки</h3>
                    <p className="text-neutral-400 text-sm">
                      Профессиональное кредитное сопровождение
                    </p>
                  </div>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {companyInfo.description}
                </p>
                <div className="space-y-2">
                  <p className="text-neutral-400 text-sm font-medium">
                    {companyInfo.name}
                  </p>
                  <p className="text-neutral-500 text-xs">
                    {companyInfo.bin}
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                {trustBadges.map((badge, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <badge.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-neutral-300 text-sm">{badge.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Колонка 2: Контакты */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6"
            >
              <h4 className="font-semibold text-white text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-400" />
                Контакты
              </h4>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">{contactInfo.phone}</p>
                      <p className="text-neutral-400 text-xs">Основной телефон</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">{contactInfo.email}</p>
                      <p className="text-neutral-400 text-xs">Электронная почта</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">Адрес офиса</p>
                      <p className="text-neutral-400 text-xs">{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">Режим работы</p>
                      <p className="text-neutral-400 text-xs">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={scrollToBooking}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold"
              >
                <Phone className="mr-2 h-4 w-4" />
                Бесплатная консультация
              </Button>
            </motion.div>

            {/* Колонка 3: Полезное */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="font-semibold text-white text-lg">Полезное</h4>
              
              <div className="space-y-3">
                {usefulLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 group text-neutral-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-neutral-800/50"
                  >
                    <link.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                    <span className="text-sm">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Колонка 4: Документы */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h4 className="font-semibold text-white text-lg">Документы</h4>
              
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <motion.a
                    key={index}
                    href={doc.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="block text-neutral-400 hover:text-white   text-sm py-1 hover:pl-2 transition-all duration-200"
                  >
                    {doc.name}
                  </motion.a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="space-y-2 text-xs text-neutral-500">
                  <p>Лицензия №1234567890</p>
                  <p>Официальный партнёр банков Казахстана</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-neutral-800 pt-12"
          >
            <div className="text-center">
              <h4 className="font-semibold text-white mb-8 text-lg">
                Официальные партнеры ведущих банков Казахстана
              </h4>
              <div className="flex flex-wrap justify-center gap-8 opacity-60">
                {Partners.map((bank, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className=" flex items-center justify-center mb-2">
                      <Image
                        src={bank.logoUrl}
                        alt={bank.name}
                        width={40}
                        height={40}
                        className="object-contain max-h-8 max-w-8 rounded-2xl" 
                      />
                    </div>
                    <span className="text-neutral-400 text-xs">
                      {bank.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center md:text-left"
            >
              <p className="text-neutral-400 text-sm">
                © {new Date().getFullYear()} Гарант Ипотеки. Все права защищены.
              </p>
              <p className="text-neutral-500 text-xs mt-1">
                Информация на сайте не является публичной офертой
              </p>
            </motion.div>

            {/* Additional Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-4 text-neutral-400 text-sm"
            >
              <span>{contactInfo.address}</span>
              <span className="hidden md:block">•</span>
              <span>Лицензия №1234567890</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}