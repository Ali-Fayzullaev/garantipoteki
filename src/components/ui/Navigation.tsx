'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CalendarDays, X, Phone } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'

export default function Navigation() {
  const { lang } = useApp()
  const t = dict[lang]
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { href: '#quiz', label: 'Квиз' },
    { href: '#proof', label: 'Кейсы' },
    { href: '#faq', label: 'FAQ' },
    { href: '#reviews', label: 'Отзывы клиентов' },
    { href: '#adress', label: 'Адрес' },
  ]

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-2xl bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl shadow-black/5' 
          : 'backdrop-blur-lg bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/30 dark:border-neutral-800/30'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-12 w-12 rounded-2xl  flex items-center justify-center border border-yellow-300">
                <Image 
                  src="/logo.png" 
                  width={30} 
                  height={30} 
                  alt="GI" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                  {t.brand}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1">
                  Кредитное сопровождение
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button 
                  onClick={scrollToBooking}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 font-semibold"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Записаться
                </Button>
              </motion.div>
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />

              {/* Mobile menu button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-105"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <svg
                    className="h-5 w-5 text-neutral-700 dark:text-neutral-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white dark:bg-neutral-900 z-50 lg:hidden shadow-2xl shadow-black/20 border-l border-neutral-200 dark:border-neutral-800"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl border border-yellow-300  flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      width={24} 
                      height={24} 
                      alt="GI" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                      {t.brand}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Кредитное сопровождение
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 dark:hover:from-blue-900/20 dark:hover:to-green-900/20 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* CTA Buttons */}
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <Button 
                  onClick={scrollToBooking}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:scale-105 font-semibold h-12 text-base"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Записаться на консультацию
                </Button>
                
                {/* <Button 
                  variant="outline"
                  className="w-full border-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 h-12 text-base"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  +7 (777) 123-45-67
                </Button> */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}