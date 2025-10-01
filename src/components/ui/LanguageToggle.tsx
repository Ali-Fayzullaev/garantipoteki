'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Languages } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'

export default function LanguageToggle() {
  const { lang, setLang } = useApp()

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
      <Tabs value={lang} onValueChange={(value: 'ru' | 'kz') => setLang(value)}>
        <TabsList className="grid grid-cols-2 w-20">
          <TabsTrigger value="ru" className="text-xs">RU</TabsTrigger>
          <TabsTrigger value="kz" className="text-xs">KZ</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}