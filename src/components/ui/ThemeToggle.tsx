'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { cn } from '@/lib/utils'
import { dict } from '@/lib/dictionary'


export default function ThemeToggle() {
  const { dark, setDark } = useApp()
  const { lang } = useApp();
  const t = dict[lang];
  return (
    <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
      <div className={cn(
        "flex items-center gap-2 transition-all duration-200",
        !dark ? "text-amber-500" : "text-neutral-400"
      )}>
        <Sun className="h-4 w-4" />
        <span className="text-xs font-medium hidden md:inline">{t.themaLight}</span>
      </div>
      
      <Switch 
        checked={dark} 
        onCheckedChange={setDark}
        className={cn(
          "relative transition-all duration-300",
          "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-neutral-300",
          "ring-2 ring-transparent hover:ring-blue-200 focus:ring-blue-300",
          "scale-110"
        )}
      />
      
      <div className={cn(
        "flex items-center gap-2 transition-all duration-200",
        dark ? "text-blue-400" : "text-neutral-400"
      )}>
        <span className="text-xs font-medium hidden md:inline">{t.themaDark}</span>
        <Moon className="h-4 w-4" />
      </div>
    </div>
  )
}