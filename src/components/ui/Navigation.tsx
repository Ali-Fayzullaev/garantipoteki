'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'

export default function Navigation() {
  const { lang } = useApp()
  const t = dict[lang]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/60 dark:border-neutral-800 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg brand-gradient flex items-center justify-center shadow-lg">
              <Image
                src="/logo.png"
                width={30}
                height={30}
                alt='GI'
              />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              {t.brand}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#quiz" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors duration-200">
              {t.menu_quiz}
            </a>
            <a href="#proof" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors duration-200">
              {t.menu_success}
            </a>
            <a href="#faq" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors duration-200">
              {t.menu_faq}
            </a>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
              <CalendarDays className="mr-2 h-4 w-4" />
              {t.menu_consult}
            </Button>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}