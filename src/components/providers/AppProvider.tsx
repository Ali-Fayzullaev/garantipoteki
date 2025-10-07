'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Lang = 'ru' | 'kz'

interface AppContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  dark: boolean
  setDark: (dark: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Светлая тема по умолчанию
    const isDark = localStorage.getItem('theme') === 'dark'
    setDark(isDark)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (dark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }, [dark, mounted])

  if (!mounted) {
    return null
  }

  return (
    <AppContext.Provider value={{ lang, setLang, dark, setDark }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}