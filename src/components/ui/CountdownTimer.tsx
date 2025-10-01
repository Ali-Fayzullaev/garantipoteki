'use client'

import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 min-w-16 shadow-lg border">
            <div className="text-2xl font-bold text-primary tabular-nums">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase mt-1">
              {unit === 'days' ? 'дней' : 
               unit === 'hours' ? 'часов' : 
               unit === 'minutes' ? 'мин' : 'сек'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}