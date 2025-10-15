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
  CheckCircle,
  Star
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import Image from 'next/image'

export default function FooterSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const companyInfo = {
    name: t.footer_company_name,
    description: t.footer_company_desc,
    bin: t.footer_bin,
    founded: t.footer_founded_year
  }

  const contactInfo = {
    phone: '+7 (777) 123-45-67',
    email: 'info@garantipoteki.kz',
    address: t.footer_address_short,
    hours: lang === 'ru' 
      ? 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00' 
      : 'Дс-Жм: 9:00-18:00, Сб: 10:00-16:00'
  }

  const usefulLinks = [
    {
      icon: Calculator,
      name: t.footer_link1,
      href: '#booking'
    },
    {
      icon: CheckCircle,
      name: t.footer_link2,
      href: '#quiz'
    },
    {
      icon: FileText,
      name: t.footer_link3,
      href: '#faq'
    },
    {
      icon: Star,
      name: t.footer_link4,
      href: '#reviews'
    }
  ]

  const documents = [
    {
      name: t.footer_doc1,
      href: '/consent'
    },
    {
      name: t.footer_doc2,
      href: '/consent'
    },
    {
      name: t.footer_doc3,
      href: '/consent'
    },
    {
      name: t.footer_doc4,
      href: '/rules'
    }
  ]

  const trustBadges = [
    { icon: Shield, text: t.footer_trust1 },
    { 
      icon: Award, 
      text: t.footer_trust2.replace('{{year}}', companyInfo.founded) 
    },
    { icon: Clock, text: t.footer_trust3 }
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

  const columnAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 }
  }

  const itemAnimation = {
    initial: { opacity: 0, x: -10 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.3 }
  }

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white">
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Колонка 1: О компании */}
            <motion.div
              {...columnAnimation}
              className="space-y-6 min-h-[300px]"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Image 
                      src="/logo.png" 
                      alt="Гарант Ипотеки"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-white truncate">Гарант Ипотеки</h3>
                    <p className="text-neutral-400 text-sm">
                      {lang === 'ru' ? 'Профессиональное кредитное сопровождение' : 'Кәсіби несиелік қолдау'}
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

              <div className="space-y-3">
                {trustBadges.map((badge, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
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
              {...columnAnimation}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6 min-h-[300px]"
            >
              <h4 className="font-semibold text-white text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-400" />
                {t.footer_contact_title}
              </h4>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{contactInfo.phone}</p>
                      <p className="text-neutral-400 text-xs">{t.footer_phone_label}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{contactInfo.email}</p>
                      <p className="text-neutral-400 text-xs">{t.footer_email_label}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium">{t.footer_address_label}</p>
                      <p className="text-neutral-400 text-xs">{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium">{t.footer_hours_label}</p>
                      <p className="text-neutral-400 text-xs">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={scrollToBooking}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold transition-all duration-300 hover:scale-105 min-h-[44px]"
              >
                <Phone className="mr-2 h-4 w-4" />
                {t.footer_cta_button}
              </Button>
            </motion.div>

            {/* Колонка 3: Полезное */}
            <motion.div
              {...columnAnimation}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 min-h-[250px]"
            >
              <h4 className="font-semibold text-white text-lg">{t.footer_useful_title}</h4>
              
              <div className="space-y-3">
                {usefulLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    {...itemAnimation}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    className="flex items-center gap-3 group text-neutral-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-neutral-800/50"
                  >
                    <link.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200 flex-shrink-0" />
                    <span className="text-sm truncate">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Колонка 4: Документы */}
            <motion.div
              {...columnAnimation}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6 min-h-[250px]"
            >
              <h4 className="font-semibold text-white text-lg">{t.footer_docs_title}</h4>
              
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <motion.a
                    key={index}
                    href={doc.href}
                    {...itemAnimation}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    className="block text-neutral-400 hover:text-white text-sm py-1 hover:pl-2 transition-all duration-200 truncate"
                  >
                    {doc.name}
                  </motion.a>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <div className="space-y-2 text-xs text-neutral-500">
                  <p className="leading-relaxed">{t.footer_license}</p>
                  <p className="leading-relaxed">{t.footer_trust1}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-left"
            >
              <p className="text-neutral-400 text-sm">
                {t.footer_copyright.replace('{{year}}', new Date().getFullYear().toString())}
              </p>
              <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                {t.footer_disclaimer}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-neutral-400 text-sm text-center"
            >
              <span className="truncate">{contactInfo.address}</span>
              <span className="hidden sm:block">•</span>
              <span>{t.footer_license}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}