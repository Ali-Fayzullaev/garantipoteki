'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'

export default function ThemeToggle() {
  const { dark, setDark } = useApp()

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
      <Switch 
        checked={dark} 
        onCheckedChange={setDark}
        className="data-[state=checked]:bg-primary"
      />
      <Moon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
    </div>
  )
}