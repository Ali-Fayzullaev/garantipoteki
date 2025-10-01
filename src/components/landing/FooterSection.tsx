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
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

export default function FooterSection() {
  const { lang } = useApp()
  const t = dict[lang]

  const officeLocations = [
    {
      name: 'Офис на левом берегу',
      address: 'г. Астана, пр. Кабанбай батыра, 15',
      hours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00',
      phone: '+7 (7172) 123-456',
      features: ['Бесплатная парковка', 'Рядом с метро', 'Лифт']
    },
    {
      name: 'Офис на правом берегу',
      address: 'г. Астана, ул. Достык, 12',
      hours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00',
      phone: '+7 (7172) 123-457',
      features: ['Парковка', 'Центр города', 'Кондиционер']
    }
  ]

  const quickLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Квиз', href: '#quiz' },
    { name: 'Кейсы', href: '#proof' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Контакты', href: '#contact' }
  ]

  const services = [
    'Кредиты наличными',
    'Ипотечное кредитование',
    'Рефинансирование кредитов',
    'Кредиты для бизнеса',
    'Экспресс-кредиты'
  ]

  const partnerBanks = [
    'Halyk Bank',
    'Kaspi Bank',
    'ForteBank',
    'Jusan Bank',
    'Eurasian Bank',
    'Bank CenterCredit'
  ]

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', href: '#' },
    { icon: Instagram, name: 'Instagram', href: '#' },
    { icon: Youtube, name: 'YouTube', href: '#' },
    { icon: MessageCircle, name: 'WhatsApp', href: '#' }
  ]

  const trustBadges = [
    { icon: Shield, text: 'Официальный партнер банков' },
    { icon: Award, text: 'Работаем с 2015 года' },
    { icon: Clock, text: 'Более 1000 успешных сделок' }
  ]

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white">
      {/* Main Footer */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Company Info & Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Logo & Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-xl flex items-center justify-center">
                    <span className="font-bold text-white text-lg">GI</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{t.brand}</h3>
                    <p className="text-neutral-400 text-sm">
                      Профессиональное кредитное сопровождение
                    </p>
                  </div>
                </div>
                <p className="text-neutral-300 max-w-md">
                  Помогаем получить максимальные суммы кредитов на лучших условиях 
                  с 2015 года. Более 1000 довольных клиентов по всему Казахстану.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <badge.icon className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                    <span className="text-neutral-300 text-sm">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Мы в соцсетях</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 border-neutral-700 hover:border-brand-yellow hover:bg-brand-yellow/10 text-neutral-400 hover:text-brand-yellow"
                    >
                      <social.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Offices & Links Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Office Locations */}
              <div className="space-y-6">
                <h4 className="font-semibold text-white text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-yellow" />
                  Наши офисы
                </h4>
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-white mb-1">{office.name}</h5>
                        <p className="text-neutral-400 text-sm mb-2">{office.address}</p>
                        <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{office.hours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400 text-sm">
                          <Phone className="h-4 w-4" />
                          <span>{office.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {office.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-300"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links & Services */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white text-lg mb-4">Быстрые ссылки</h4>
                  <div className="space-y-2">
                    {quickLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="block text-neutral-400 hover:text-brand-yellow transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white text-lg mb-4">Услуги</h4>
                  <div className="space-y-2">
                    {services.map((service, index) => (
                      <span
                        key={index}
                        className="block text-neutral-400 text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Partner Banks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-neutral-800 pt-12"
          >
            <h4 className="text-center font-semibold text-white mb-8">
              Банки-партнеры
            </h4>
            <div className="flex flex-wrap justify-center gap-8">
              {partnerBanks.map((bank, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-brand-yellow/10 transition-colors duration-200">
                    <div className="text-2xl">🏦</div>
                  </div>
                  <span className="text-neutral-400 text-sm group-hover:text-white transition-colors duration-200">
                    {bank}
                  </span>
                </div>
              ))}
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
                © {new Date().getFullYear()} {t.brand}. Все права защищены.
              </p>
              <p className="text-neutral-500 text-xs mt-1">
                ИНН/БИН • Официальный партнёр банков Казахстана
              </p>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <Button 
                size="sm"
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-neutral-900"
              >
                <Phone className="mr-2 h-4 w-4" />
                Бесплатная консультация
              </Button>
              
              <div className="hidden sm:flex items-center gap-2 text-neutral-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@garantipoteki.kz</span>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-6 pt-6 border-t border-neutral-800"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-neutral-500 text-xs">
              <span>{t.footer_addr}</span>
              <span className="hidden md:block">•</span>
              <span>Лицензия №1234567890</span>
              <span className="hidden md:block">•</span>
              <a href="#" className="hover:text-brand-yellow transition-colors duration-200">
                Политика конфиденциальности
              </a>
              <span className="hidden md:block">•</span>
              <a href="#" className="hover:text-brand-yellow transition-colors duration-200">
                Пользовательское соглашение
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl shadow-green-500/25"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </footer>
  )
}