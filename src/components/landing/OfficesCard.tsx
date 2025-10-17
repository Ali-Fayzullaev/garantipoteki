"use client"

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, MapPin, Clock, CalendarDays, Navigation, Star } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { dict } from '@/lib/dictionary'

// Оптимизированный компонент расписания с memo
const ScheduleDisplay = React.memo(() => {
  const { lang } = useApp()
  
  const schedule = useMemo(() => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    const currentTime = currentHour + currentMinutes / 60

    if (lang === 'ru') {
      switch (dayOfWeek) {
        case 0: // Воскресенье
          return { 
            status: 'Закрыто',
            today: 'Выходной',
            nextOpen: 'Завтра в 10:00',
            isOpen: false,
            color: 'text-red-500',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            borderColor: 'border-red-200 dark:border-red-800'
          }
        case 6: // Суббота
          const isOpenSat = currentTime >= 10 && currentTime < 17
          return { 
            status: isOpenSat ? 'Открыто' : 'Закрыто',
            today: isOpenSat ? `До 17:00` : '10:00–17:00',
            nextOpen: isOpenSat ? '' : 'Понедельник в 10:00',
            isOpen: isOpenSat,
            color: isOpenSat ? 'text-green-500' : 'text-red-500',
            bgColor: isOpenSat ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
            borderColor: isOpenSat ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'
          }
        default: // Будни
          const isOpenWeekday = currentTime >= 10 && currentTime < 19
          return { 
            status: isOpenWeekday ? 'Открыто' : 'Закрыто',
            today: isOpenWeekday ? `До 19:00` : '10:00–19:00',
            nextOpen: isOpenWeekday ? '' : 'Завтра в 10:00',
            isOpen: isOpenWeekday,
            color: isOpenWeekday ? 'text-green-500' : 'text-red-500',
            bgColor: isOpenWeekday ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
            borderColor: isOpenWeekday ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'
          }
      }
    } else {
      // Казахский язык
      switch (dayOfWeek) {
        case 0: // Жексенбі
          return { 
            status: 'Жабық',
            today: 'Демалыс',
            nextOpen: 'Ертең сағат 10:00',
            isOpen: false,
            color: 'text-red-500',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            borderColor: 'border-red-200 dark:border-red-800'
          }
        case 6: // Сенбі
          const isOpenSat = currentTime >= 10 && currentTime < 17
          return { 
            status: isOpenSat ? 'Ашық' : 'Жабық',
            today: isOpenSat ? `17:00-ге дейін` : '10:00–17:00',
            nextOpen: isOpenSat ? '' : 'Дүйсенбі сағат 10:00',
            isOpen: isOpenSat,
            color: isOpenSat ? 'text-green-500' : 'text-red-500',
            bgColor: isOpenSat ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
            borderColor: isOpenSat ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'
          }
        default: // Жұмыс күндері
          const isOpenWeekday = currentTime >= 10 && currentTime < 19
          return { 
            status: isOpenWeekday ? 'Ашық' : 'Жабық',
            today: isOpenWeekday ? `19:00-ге дейін` : '10:00–19:00',
            nextOpen: isOpenWeekday ? '' : 'Ертең сағат 10:00',
            isOpen: isOpenWeekday,
            color: isOpenWeekday ? 'text-green-500' : 'text-red-500',
            bgColor: isOpenWeekday ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
            borderColor: isOpenWeekday ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'
          }
      }
    }
  }, [lang])

  return (
    <div className={`p-3 rounded-xl border ${schedule.borderColor} ${schedule.bgColor} transition-all duration-300`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${schedule.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className={`text-sm font-semibold ${schedule.color}`}>
            {schedule.status}
          </span>
        </div>
        <Clock className={`h-4 w-4 ${schedule.color}`} />
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            {lang === 'ru' ? 'Сегодня' : 'Бүгін'}:
          </span>
          <span className="text-sm font-medium text-neutral-900 dark:text-white">
            {schedule.today}
          </span>
        </div>
        
        {schedule.nextOpen && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {lang === 'ru' ? 'Следующее открытие' : 'Келесі ашылу'}:
            </span>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {schedule.nextOpen}
            </span>
          </div>
        )}
      </div>
    </div>
  )
})

ScheduleDisplay.displayName = 'ScheduleDisplay'

export default function OfficesCard() {
  const { lang } = useApp()
  const t = dict[lang]

  const offices = useMemo(() => [
    {
      name: lang === 'ru' ? 'пр. Бауыржан Момышулы, 2' : 'Бауыржан Момышұлы даңғ., 2',
      address: lang === 'ru' ? '52 этаж, Бизнес-центр' : '52-қабат, Бизнес-орт.',
      mapUrl: 'https://2giskz.app/astana/geo/70000001080131528',
      rating: '4.8'
    },
    {
      name: lang === 'ru' ? 'ул. Сыганак, 54а' : 'Сығанақ көш., 54а',
      address: lang === 'ru' ? '112 офис, 1 этаж' : '112-офис, 1-қабат',
      mapUrl: 'https://2giskz.app/astana/geo/70000001094569458',
      rating: '4.9'
    },
    {
      name: lang === 'ru' ? 'пр. Богенбай батыра, 56а' : 'Бөгенбай батыр даңғ., 56а',
      address: lang === 'ru' ? '703 офис, 7 этаж' : '703-офис, 7-қабат',
      mapUrl: 'https://2giskz.app/astana/geo/70000001103665266',
      rating: '4.7'
    }
  ], [lang])

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/30 dark:from-neutral-900 dark:to-blue-900/10 backdrop-blur-sm relative overflow-hidden group">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16 blur-xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/10 rounded-full translate-y-12 -translate-x-12 blur-xl" />
      
      <CardHeader className="pb-4 relative z-10">
        <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          {t.office_title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        {/* Список офисов */}
        <div className="space-y-4">
          {offices.map((office, index) => (
            <div 
              key={index}
              className="group/office p-4 rounded-2xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-white text-base truncate">
                      {office.name}
                    </h4>
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-tight mb-3">
                    {office.address}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="font-medium">{office.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                      <Navigation className="h-3 w-3" />
                      <span>2GIS</span>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={office.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-shrink-0 transform transition-transform hover:scale-110 active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-white dark:bg-neutral-800 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 min-h-9 px-3 shadow-sm"
                  >
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    {t.office_map}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Расписание */}
        <ScheduleDisplay />

        {/* График работы */}
        <div className="p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50">
          <h5 className="font-semibold text-neutral-900 dark:text-white text-sm mb-3">
            {lang === 'ru' ? 'График работы' : 'Жұмыс кестесі'}
          </h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-neutral-600 dark:text-neutral-400">{lang === 'ru' ? 'Пн-Пт' : 'Дс-Жм'}</div>
            <div className="font-medium text-neutral-900 dark:text-white text-right">10:00–19:00</div>
            
            <div className="text-neutral-600 dark:text-neutral-400">{lang === 'ru' ? 'Суббота' : 'Сенбі'}</div>
            <div className="font-medium text-neutral-900 dark:text-white text-right">10:00–17:00</div>
            
            <div className="text-neutral-600 dark:text-neutral-400">{lang === 'ru' ? 'Воскресенье' : 'Жексенбі'}</div>
            <div className="font-medium text-red-600 dark:text-red-400 text-right">
              {lang === 'ru' ? 'Выходной' : 'Демалыс'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}