'use client'

import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

interface TimeUnit {
  value: number
  max: number
  label: string
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        const units: TimeUnit[] = [
          {
            value: Math.floor(difference / (1000 * 60 * 60 * 24)),
            max: 365,
            label: 'дней'
          },
          {
            value: Math.floor((difference / (1000 * 60 * 60)) % 24),
            max: 24,
            label: 'часов'
          },
          {
            value: Math.floor((difference / 1000 / 60) % 60),
            max: 60,
            label: 'мин'
          },
          {
            value: Math.floor((difference / 1000) % 60),
            max: 60,
            label: 'сек'
          }
        ]
        setTimeUnits(units)
      }
      setIsLoading(false)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const CircularProgress = ({ value, max, label, size = 80 }: { value: number; max: number; label: string; size?: number }) => {
    const radius = (size - 4) / 2
    const circumference = 2 * Math.PI * radius
    const progress = (value / max) * circumference
    const strokeDashoffset = circumference - progress

    if (isLoading) {
      return (
        <div className="text-center">
          <div className="relative" style={{ width: size, height: size }}>
            <div className="w-full h-full border-4 border-gray-200 dark:border-neutral-700 rounded-full animate-pulse"></div>
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase mt-2 font-medium">
            {label}
          </div>
        </div>
      )
    }

    return (
      <div className="text-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200 dark:text-neutral-700"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-blue-500 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-800 dark:text-white tabular-nums">
              {String(value).padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase mt-2 font-medium">
          {label}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {timeUnits.map((unit, index) => (
        <CircularProgress
          key={index}
          value={unit.value}
          max={unit.max}
          label={unit.label}
          size={90}
        />
      ))}
    </div>
  )
}