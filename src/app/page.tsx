'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { CheckCircle2, Clock, ShieldCheck, Building2, Play, CalendarDays, Phone, ChevronRight, Languages, Moon, Sun, Star, Users, TrendingUp, ThumbsUp, MapPin } from 'lucide-react'

/**
 * GARANT IPOTEKI — One-file landing page
 * Stack: Next.js (app router), Tailwind CSS, shadcn/ui, lucide-react, framer-motion
 * Features: RU/KZ toggle, light/dark theme toggle, 7 blocks per brief, quiz with scoring, forms, countdown, simple slot picker
 *
 * How to use in Next.js:
 * 1) Create app/(marketing)/page.tsx and paste this file content there, or use as components/Landing.tsx and import into page.
 * 2) Ensure shadcn/ui is installed and paths match (e.g., '@/components/ui/button').
 * 3) Add Tailwind dark mode 'class' strategy and fonts per your design.
 * 4) Add brand colors (optional) in tailwind.config or use current inline hexes.
 */

// Simple bilingual dictionary (RU + KZ). You can expand as needed.
const dict = {
  ru: {
    brand: 'GARANT IPOTEKI',
    menu_consult: 'Записаться',
    menu_quiz: 'Квиз',
    menu_success: 'Кейсы',
    menu_faq: 'FAQ',
    // Block 1 — Hero / Pattern interrupt
    hero_badge: 'Видео-паттерн',
    hero_q1: 'Знаете ли вы, что 8 из 10 людей, которые получают отказ в банке, делают одну и ту же ошибку?',
    hero_q2: 'Они подают заявку в неправильный банк в неправильное время.',
    hero_pitch: 'Покажем, как получить в 2–3 раза больше денег, чем предлагает банк напрямую.',
    hero_me: 'Меня зовут',
    hero_name: 'Ваше Имя',
    hero_company: 'компания «Гарант Ипотеки»',
    hero_after: 'За последние годы мы помогли тысячам клиентов получить максимальные суммы. Давайте проверим, подходите ли вы под текущие требования банков.',
    hero_cta: 'Пройти квиз 60 сек',
    hero_watch: 'Смотреть видео',

    // Block 2 — Quiz
    quiz_title: 'Узнайте ваши шансы за 60 секунд',
    step1: 'Какая сумма вам нужна?',
    step1_a: 'До 5 млн ₸',
    step1_b: '5–10 млн ₸',
    step1_c: '10–15 млн ₸',
    step1_d: 'Более 15 млн ₸',
    hint1: '83% наших клиентов получают больше, чем изначально планировали',
    step2: 'У вас есть официальное трудоустройство?',
    step2_a: 'Да, официально работаю',
    step2_b: 'Нет, но есть стабильный доход',
    step2_c: 'Временно не работаю',
    hint2: 'Даже без официального трудоустройства можно получить до 5 млн ₸',
    step3: 'Проверьте пенсионные отчисления за последние 6 месяцев',
    step3_a: 'Есть все 6 месяцев',
    step3_b: 'Есть, но не за все месяцы',
    step3_c: 'Нет отчислений',
    howto: 'Как проверить отчисления?',
    howto_text: 'Зайдите на eGov → «Электронные услуги» → «Пенсионные отчисления» и скачайте выписку за 6 месяцев.',
    step4: 'Последний вопрос: текущие обязательства',
    step4_a: 'Нет действующих кредитов',
    step4_b: 'Есть кредиты, плачу вовремя',
    step4_c: 'Есть действующие микрозаймы',
    step4_d: 'Есть просрочки по платежам',
    hint4: 'Наличие кредитов не проблема, если платежи вносятся вовремя',
    result_good_title: 'Поздравляем! Вы в ТОП‑20% заемщиков',
    result_good_text: 'Наш эксперт покажет, как получить максимальную сумму уже сегодня.',
    book_now: 'Выбрать время в офисе',
    bonus: 'Бонус при записи сейчас: приоритетное рассмотрение',
    result_bad_title: 'Важно: сейчас не лучшее время',
    result_bad_text: 'Мы подготовили персональные рекомендации, чтобы повысить шансы.',
    reminder: 'Напомнить мне, когда лучше подать заявку',

    // Block 3 — Education video
    edu_title: '3 секрета, которые банки скрывают от заёмщиков',
    edu_p1_t: 'Почему банки отказывают надежным клиентам',
    edu_p2_t: 'Как система реально оценивает заявки',
    edu_p3_t: 'Почему время подачи критически важно',
    edu_cta: 'Записаться на консультацию',
    edu_ps: 'Мы проводим консультации только в офисе для вашей безопасности.',

    // Block 4 — Social proof
    proof_title: 'Нам доверяют',
    case_main_title: 'История Айгуль (Алматы)',
    case_main_text: 'Банки предлагали максимум 3 млн, нужно было 10. После правильного выбора банка и времени одобрение на 10 млн пришло за 1 час, ставка оказалась ниже.',
    stats_title: 'Наши результаты в цифрах',
    stat_1: '8 из 10 клиентов получают больше, чем просили',
    stat_2: '93% заявок одобряются с первого раза',
    stat_3: 'Средняя сумма выше банковской в 2.5 раза',
    latest_title: 'Свежие кейсы недели',

    // Block 5 — Booking form
    book_title: 'Запишитесь на консультацию',
    book_benefits: 'На встрече вы получите:',
    b1: 'Точный расчёт максимальной суммы',
    b2: 'Список банков, готовых одобрить сейчас',
    b3: 'Индивидуальную стратегию и защиту от отказов',
    when: 'Выберите время (30–40 минут):',
    today: 'Сегодня',
    tomorrow: 'Завтра',
    form_name: 'Имя',
    form_phone: 'Телефон',
    form_amount: 'Желаемая сумма',
    form_slot: 'Время консультации',
    submit: 'Записаться',
    security_badges: 'Ваши данные защищены. Бесплатно. Работаем с 2015 года.',

    // Block 6 — FAQ
    faq_title: 'Частые вопросы',
    q1: 'Почему нельзя консультировать по телефону?',
    a1: 'Для точного расчёта и вашей безопасности встречаемся в офисе и проверяем документы на месте.',
    q2: 'Какие документы нужны?',
    a2: 'Только удостоверение личности. Остальное поможем собрать на консультации.',
    q3: 'Сколько времени занимает процесс?',
    a3: 'Консультация 30–40 мин, подача 15–20 мин, решение от 1 часа до 1 дня.',
    q4: 'Что если есть действующие кредиты?',
    a4: 'Это не проблема, если платите вовремя — правильно структурируем заявку.',
    q5: 'С какими банками работаете?',
    a5: 'Со всеми крупными банками Казахстана — подбираем лучшие условия.',

    // Block 7 — Final CTA
    final_title: 'Сделайте первый шаг к максимальной сумме',
    final_text: 'Банки меняют условия каждый месяц. Успейте до следующего обновления.',
    countdown: 'До обновления условий осталось:',
    week_stats: 'На этой неделе: 47 записей • 39 одобрений • среднее одобрение 12 млн ₸',
    steps_title: '3 шага',
    step1: 'Запишитесь на бесплатную консультацию',
    step2: 'Приходите в офис',
    step3: 'Получите деньги в тот же день',
    final_form_title: 'Оставьте заявку сейчас',
    final_cta: 'Получить консультацию и максимальную сумму',
    footer_addr: 'Астана, 2 офиса — левый и правый берег. Ежедневно 9:00–18:00.'
  },
  kz: {
    brand: 'GARANT IPOTEKI',
    menu_consult: 'Кеңеске жазылу',
    menu_quiz: 'Квиз',
    menu_success: 'Нәтижелер',
    menu_faq: 'Сұрақ-Жауап',
    hero_badge: 'Видео-паттерн',
    hero_q1: 'Банктен бас тарту алған 10 адамның 8-і бір қателікті қайталайтынын білесіз бе?',
    hero_q2: 'Өтінішті дұрыс емес банкке және дұрыс емес уақытта береді.',
    hero_pitch: 'Банк тікелей ұсынғаннан 2–3 есе көп соманы қалай алуға болатынын көрсетеміз.',
    hero_me: 'Менің атым',
    hero_name: 'Атыңыз',
    hero_company: '«Гарант Ипотеки» компаниясы',
    hero_after: 'Соңғы жылдары мыңдаған клиентке ең жоғары сомаларды алуға көмектестік. Алдымен банктердің ағымдағы талаптарына сай келетін-келмейтініңізді тексерейік.',
    hero_cta: '60 сек квиз',
    hero_watch: 'Видеоны көру',

    quiz_title: 'Мүмкіндігіңізді 60 секундта біліңіз',
    step1: 'Қанша сома қажет?',
    step1_a: '5 млн ₸ дейін',
    step1_b: '5–10 млн ₸',
    step1_c: '10–15 млн ₸',
    step1_d: '15 млн ₸ жоғары',
    hint1: 'Клиенттеріміздің 83%-ы бастапқы жоспардан көп алады',
    step2: 'Ресми жұмыс бар ма?',
    step2_a: 'Иә, ресми жұмыс істеймін',
    step2_b: 'Жоқ, бірақ тұрақты табыс бар',
    step2_c: 'Уақытша жұмыс істемеймін',
    hint2: 'Ресми жұмыссыз да 5 млн ₸ дейін алуға болады',
    step3: 'Соңғы 6 айдағы зейнетақы аударымдары',
    step3_a: 'Барлық 6 ай бар',
    step3_b: 'Бар, бірақ барлық ай емес',
    step3_c: 'Аударымдар жоқ',
    howto: 'Қалай тексеру?',
    howto_text: 'eGov → «Электрондық қызметтер» → «Зейнетақы аударымдары» арқылы 6 айлық үзіндіні жүктеңіз.',
    step4: 'Соңғы сұрақ: ағымдағы міндеттемелер',
    step4_a: 'Белсенді несиелер жоқ',
    step4_b: 'Несиелер бар, уақытында төлеймін',
    step4_c: 'МҚҰ микронесиелері бар',
    step4_d: 'Кешіктірулер бар',
    hint4: 'Уақытында төленсе, несиелер мәселе емес',
    result_good_title: 'Құттықтаймыз! Сіз ТОП‑20% қарыз алушылардың қатарындасыз',
    result_good_text: 'Біздің маман бүгін ең жоғары соманы алудың жолын көрсетеді.',
    book_now: 'Офисте уақыт таңдау',
    bonus: 'Қазір жазылсаңыз: өтінімді басым қарау',
    result_bad_title: 'Маңызды: дәл қазір ең ыңғайлы уақыт емес',
    result_bad_text: 'Мүмкіндікті арттыру үшін жеке ұсынымдар дайындадық.',
    reminder: 'Қай кезде дұрыс болатынын еске салу',

    edu_title: 'Банктер қарыз алушылардан жасырған 3 құпия',
    edu_p1_t: 'Неге сенімді клиенттерге жиі бас тартады',
    edu_p2_t: 'Жүйе өтінішті қалай бағалайды',
    edu_p3_t: 'Өтініш берудің уақыты неге маңызды',
    edu_cta: 'Кеңеске жазылу',
    edu_ps: 'Қауіпсіздік үшін кеңестер тек офисте өтеді.',

    proof_title: 'Бізге сенеді',
    case_main_title: 'Айгүлдің оқиғасы (Алматы)',
    case_main_text: 'Банктер 3 млн ғана ұсынды, 10 млн қажет болды. Дұрыс банк пен уақыт — 1 сағатта 10 млн мақұлдау және төмен мөлшерлеме.',
    stats_title: 'Нәтижелер сандарда',
    stat_1: 'Клиенттердің 8/10-ы күткеннен көп алады',
    stat_2: 'Өтінімдердің 93%-ы бірінші ретте мақұлданады',
    stat_3: 'Орташа сома банктік ұсыныстан 2.5 есе жоғары',
    latest_title: 'Аптаның жаңа кейстері',

    book_title: 'Кеңеске жазылыңыз',
    book_benefits: 'Кездесуде мынаны аласыз:',
    b1: 'Ең жоғары сома есебі',
    b2: 'Қазір мақұлдайтын банктер тізімі',
    b3: 'Жеке стратегия және бас тартудан қорғау',
    when: 'Уақытты таңдаңыз (30–40 мин):',
    today: 'Бүгін',
    tomorrow: 'Ертең',
    form_name: 'Аты-жөні',
    form_phone: 'Телефон',
    form_amount: 'Қажет сома',
    form_slot: 'Кездесу уақыты',
    submit: 'Жазылу',
    security_badges: 'Деректеріңіз қорғалған. Тегін. 2015 жылдан бері жұмыс істейміз.',

    faq_title: 'Жиі қойылатын сұрақтар',
    q1: 'Неге телефон арқылы кеңес бермейміз?',
    a1: 'Дәл есеп пен қауіпсіздік үшін офисте кездесіп, құжаттарды орнында тексереміз.',
    q2: 'Қандай құжаттар керек?',
    a2: 'Тек жеке куәлік. Қалғанын кеңесте жинауға көмектесеміз.',
    q3: 'Процесс қанша уақыт алады?',
    a3: 'Кеңес 30–40 мин, өтініш 15–20 мин, шешім 1 сағаттан 1 күнге дейін.',
    q4: 'Белсенді несиелерім бар болса?',
    a4: 'Уақытында төленсе — мәселе емес. Өтінішті дұрыс құрастырамыз.',
    q5: 'Қандай банктермен жұмыс істейсіздер?',
    a5: 'Қазақстанның барлық ірі банктерімен — ең жақсы шарттарды таңдаймыз.',

    final_title: 'Ең жоғары сомага жол ашыңыз',
    final_text: 'Банктер шарттарды ай сайын өзгертеді. Келесі жаңартуға дейін үлгеріңіз.',
    countdown: 'Жаңартуға дейін қалды:',
    week_stats: 'Осы аптада: 47 жазылу • 39 мақұлдау • орташа 12 млн ₸',
    steps_title: '3 қадам',
    step1: 'Тегін кеңеске жазылыңыз',
    step2: 'Офиске келіңіз',
    step3: 'Сол күні ақшаны алыңыз',
    final_form_title: 'Қазір өтінім қалдырыңыз',
    final_cta: 'Кеңес және ең жоғары сома',
    footer_addr: 'Астана, 2 офис — сол және оң жағалау. Күн сайын 9:00–18:00.'
  }
}

type Lang = keyof typeof dict

export default function GarantIpotekiLanding() {
  const [lang, setLang] = useState<Lang>('ru')
  const t = useMemo(() => dict[lang], [lang])
  const [dark, setDark] = useState(false)

  // Brand palette (close to provided logo):
  const brand = {
    yellow: '#F2C94C', // primary accent
    orange: '#D66A2E', // secondary accent
    darkText: '#1E1E1E'
  }

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  // ---- QUIZ STATE ----
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ [k: string]: string }>({})
  const [quizDone, setQuizDone] = useState(false)

  const totalSteps = 4
  const progress = (Math.min(step - 1, totalSteps) / totalSteps) * 100

  function pick(key: string, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }))
    if (step < totalSteps) setStep(step + 1)
    else setQuizDone(true)
  }

  // Simple scoring: positive for stable employment, full pension inflow, no delinquencies; larger amount slightly harder
  const score = useMemo(() => {
    let s = 0
    if (answers.amount === 'd') s += 2
    if (answers.amount === 'c') s += 3
    if (answers.amount === 'b') s += 4
    if (answers.amount === 'a') s += 5

    if (answers.job === 'a') s += 5
    else if (answers.job === 'b') s += 3
    else s += 1

    if (answers.pension === 'a') s += 5
    else if (answers.pension === 'b') s += 3

    if (answers.debt === 'a') s += 5
    else if (answers.debt === 'b') s += 4
    else if (answers.debt === 'c') s += 2
    else s += 0

    return s
  }, [answers])

  const isTop20 = score >= 15

  // ---- BOOKING ----
  const [dayTab, setDayTab] = useState<'today' | 'tomorrow'>('today')
  const [slot, setSlot] = useState<string>('')
  const [form, setForm] = useState({ name: '', phone: '', amount: '' })
  const [okOpen, setOkOpen] = useState(false)

  const slots = Array.from({ length: 10 }, (_, i) => {
    const start = 9 + i
    return `${start.toString().padStart(2, '0')}:00`
  })

  function submitBooking() {
    if (!form.name || !form.phone || !slot) return alert('Заполните поля / Өрістерді толтырыңыз')
    setOkOpen(true)
  }

  // ---- COUNTDOWN (to end of current month) ----
  const [now, setNow] = useState<Date>(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const end = useMemo(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth() + 1, 1, 0, 0, 0)
  }, [])

  const diff = end.getTime() - now.getTime()
  const dd = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  const hh = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24))
  const mm = Math.max(0, Math.floor((diff / (1000 * 60)) % 60))
  const ss = Math.max(0, Math.floor((diff / 1000) % 60))

  return (
    <div style={{ ['--brand' as any]: brand.yellow, ['--brand-2' as any]: brand.orange } as React.CSSProperties} className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/50 border-b border-neutral-200/60 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-sm bg-[var(--brand)]" />
            <span className="font-bold tracking-wide">{t.brand}</span>
          </div>
          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm">
            <a href="#quiz" className="hover:text-[var(--brand-2)]">{t.menu_quiz}</a>
            <a href="#proof" className="hover:text-[var(--brand-2)]">{t.menu_success}</a>
            <a href="#faq" className="hover:text-[var(--brand-2)]">{t.menu_faq}</a>
            <Button className="bg-[var(--brand-2)] hover:bg-[var(--brand-2)]/90 text-white" size="sm">
              <CalendarDays className="mr-2 h-4 w-4" />{t.menu_consult}
            </Button>
          </nav>
          <div className="ml-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <Tabs value={lang} onValueChange={(v:any)=>setLang(v)}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="ru">RU</TabsTrigger>
                  <TabsTrigger value="kz">KZ</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      {/* HERO / PATTERN INTERRUPT */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="bg-[var(--brand)] text-neutral-900 font-semibold">{t.hero_badge}</Badge>
            <motion.h1 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}} className="mt-6 text-3xl md:text-4xl font-extrabold">
              {t.hero_q1}
            </motion.h1>
            <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">{t.hero_q2}</p>
            <p className="mt-4 text-xl font-medium text-[var(--brand-2)]">{t.hero_pitch}</p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t.hero_me} <b>{t.hero_name}</b>, {t.hero_company}. {t.hero_after}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#quiz"><Button size="lg" className="bg-[var(--brand-2)] hover:bg-[var(--brand-2)]/90 text-white">
                <ChevronRight className="mr-2 h-4 w-4" /> {t.hero_cta}
              </Button></a>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg"><Play className="mr-2 h-4 w-4" />{t.hero_watch}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t.hero_badge}</DialogTitle>
                    <DialogDescription>{t.hero_q1}</DialogDescription>
                  </DialogHeader>
                  <div className="aspect-video w-full rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">MP4/YouTube placeholder</div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--brand-2)]" /> ISO-like data safety</div>
              <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[var(--brand-2)]" /> Partner banks KZ</div>
            </div>
          </div>
          <motion.div initial={{opacity:0,scale:.98}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.5}} className="relative">
            <Card className="border-[3px] border-[var(--brand)] shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">{t.quiz_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div id="quiz" className="space-y-4">
                  <Progress value={quizDone?100:progress} className="h-2" />

                  <AnimatePresence mode="wait">
                    {!quizDone && (
                      <motion.div key={step} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.25}} className="space-y-4">
                        {step===1 && (
                          <div>
                            <p className="font-semibold">{t.step1}</p>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <Button variant="secondary" onClick={()=>pick('amount','a')}>{t.step1_a}</Button>
                              <Button variant="secondary" onClick={()=>pick('amount','b')}>{t.step1_b}</Button>
                              <Button variant="secondary" onClick={()=>pick('amount','c')}>{t.step1_c}</Button>
                              <Button variant="secondary" onClick={()=>pick('amount','d')}>{t.step1_d}</Button>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500">{t.hint1}</p>
                          </div>
                        )}
                        {step===2 && (
                          <div>
                            <p className="font-semibold">{t.step2}</p>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                              <Button variant="secondary" onClick={()=>pick('job','a')}>{t.step2_a}</Button>
                              <Button variant="secondary" onClick={()=>pick('job','b')}>{t.step2_b}</Button>
                              <Button variant="secondary" onClick={()=>pick('job','c')}>{t.step2_c}</Button>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500">{t.hint2}</p>
                          </div>
                        )}
                        {step===3 && (
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{t.step3}</p>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button size="sm" variant="outline">{t.howto}</Button>
                                </PopoverTrigger>
                                <PopoverContent className="max-w-xs text-sm">{t.howto_text}</PopoverContent>
                              </Popover>
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                              <Button variant="secondary" onClick={()=>pick('pension','a')}>{t.step3_a}</Button>
                              <Button variant="secondary" onClick={()=>pick('pension','b')}>{t.step3_b}</Button>
                              <Button variant="secondary" onClick={()=>pick('pension','c')}>{t.step3_c}</Button>
                            </div>
                          </div>
                        )}
                        {step===4 && (
                          <div>
                            <p className="font-semibold">{t.step4}</p>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                              <Button variant="secondary" onClick={()=>pick('debt','a')}>{t.step4_a}</Button>
                              <Button variant="secondary" onClick={()=>pick('debt','b')}>{t.step4_b}</Button>
                              <Button variant="secondary" onClick={()=>pick('debt','c')}>{t.step4_c}</Button>
                              <Button variant="secondary" onClick={()=>pick('debt','d')}>{t.step4_d}</Button>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500">{t.hint4}</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {quizDone && (
                    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="space-y-4">
                      {isTop20 ? (
                        <Card className="border-green-500">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400"><CheckCircle2 className="h-5 w-5" />{t.result_good_title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300">{t.result_good_text}</p>
                            <a href="#booking"><Button className="mt-4 bg-[var(--brand-2)] hover:bg-[var(--brand-2)]/90 text-white"><CalendarDays className="mr-2 h-4 w-4" />{t.book_now}</Button></a>
                            <p className="mt-2 text-xs text-neutral-500">⚡ {t.bonus}</p>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="border-amber-500">
                          <CardHeader>
                            <CardTitle className="text-amber-600 dark:text-amber-400">{t.result_bad_title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm text-neutral-600 dark:text-neutral-300">{t.result_bad_text}</p>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              <li>Увеличьте прозрачность дохода (официальный доход/выписки)</li>
                              <li>Погасите просрочки и удерживайте DTI &lt; 45%</li>
                              <li>Нарастите пенсионные отчисления 2–3 месяца</li>
                            </ul>
                            <div className="flex gap-2 items-center">
                              <Input placeholder="{t.form_phone}" />
                              <Button>{t.reminder}</Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="aspect-video rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">
                <Play className="mr-2 h-5 w-5" /> {t.edu_title}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t.edu_title}</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3"><ThumbsUp className="h-5 w-5 text-[var(--brand-2)]" /><div><p className="font-semibold">{t.edu_p1_t}</p><p className="text-sm text-neutral-600 dark:text-neutral-300">Каждый банк ежемесячно меняет алгоритмы — важно знать, кто сейчас даёт лучшие условия.</p></div></div>
                <div className="flex items-start gap-3"><TrendingUp className="h-5 w-5 text-[var(--brand-2)]" /><div><p className="font-semibold">{t.edu_p2_t}</p><p className="text-sm text-neutral-600 dark:text-neutral-300">История, нагрузка, доход и внутренний скоринг — настраиваем заявку под требования.</p></div></div>
                <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-[var(--brand-2)]" /><div><p className="font-semibold">{t.edu_p3_t}</p><p className="text-sm text-neutral-600 dark:text-neutral-300">Есть «высокие сезоны» — подаём в нужный банк в нужный момент.</p></div></div>
              </div>
              <p className="mt-4 text-xs text-neutral-500">{t.edu_ps}</p>
              <a href="#booking"><Button className="mt-6 bg-[var(--brand-2)] hover:bg-[var(--brand-2)]/90 text-white">{t.edu_cta}</Button></a>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="proof" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold">{t.proof_title}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{t.case_main_title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-neutral-700 dark:text-neutral-300">
                {t.case_main_text}
                <div className="mt-4 flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
                  <Badge className="bg-green-600">10 000 000 ₸</Badge>
                  <Badge variant="secondary">1 час одобрение</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" />{t.stats_title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />{t.stat_1}</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />{t.stat_2}</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />{t.stat_3}</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { name: 'Марат К., предприниматель', sum: '12 000 000 ₸', text: 'Банки давали только 4 млн, через «Гарант Ипотеки» получил 12 млн за 1 день.' },
              { name: 'Динара Т., врач', sum: '8 000 000 ₸', text: 'Помогли получить 8 млн — другие отказывали из‑за зарплаты.' },
              { name: 'Асхат М., менеджер', sum: '15 000 000 ₸', text: 'Получил крупную сумму без залога — специалисты знают своё дело.' },
            ].map((it, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base">{it.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-neutral-700 dark:text-neutral-300">
                  <p>{it.text}</p>
                  <Badge className="mt-3 bg-[var(--brand-2)]">{it.sum}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-16 bg-neutral-50 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold">{t.book_title}</h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{t.book_benefits}</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" />{t.b1}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" />{t.b2}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" />{t.b3}</li>
              </ul>
              <p className="mt-6 text-xs text-neutral-500"><ShieldCheck className="inline h-4 w-4 mr-1" />{t.security_badges}</p>
              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 flex items-center gap-2"><MapPin className="h-4 w-4" />{t.footer_addr}</div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5" />{t.when}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={dayTab} onValueChange={(v:any)=>setDayTab(v)}>
                  <TabsList>
                    <TabsTrigger value="today">{t.today}</TabsTrigger>
                    <TabsTrigger value="tomorrow">{t.tomorrow}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="today">
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map(s => (
                        <Button key={s} variant={slot===`T-${s}`?'default':'secondary'} onClick={()=>setSlot(`T-${s}`)}>{s}</Button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="tomorrow">
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map(s => (
                        <Button key={s} variant={slot===`M-${s}`?'default':'secondary'} onClick={()=>setSlot(`M-${s}`)}>{s}</Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder={t.form_name} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                  <Input placeholder={t.form_phone} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                  <Input placeholder={t.form_amount} value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} />
                  <Input placeholder={t.form_slot} value={slot?slot.replace('T-','').replace('M-',''):'—'} readOnly />
                </div>
                <div className="flex gap-3">
                  <Button className="bg-[var(--brand-2)] hover:bg-[var(--brand-2)]/90 text-white" onClick={submitBooking}>{t.submit}</Button>
                  <Button variant="outline"><Phone className="mr-2 h-4 w-4" />+7 (7XX) XXX‑XX‑XX</Button>
                </div>
                <Dialog open={okOpen} onOpenChange={setOkOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Спасибо! / Рақмет!</DialogTitle>
                      <DialogDescription>Мы свяжемся для подтверждения времени. Сохраните телефон включенным.</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold">{t.faq_title}</h2>
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t.q1}</AccordionTrigger>
              <AccordionContent>{t.a1}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t.q2}</AccordionTrigger>
              <AccordionContent>{t.a2}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{t.q3}</AccordionTrigger>
              <AccordionContent>{t.a3}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>{t.q4}</AccordionTrigger>
              <AccordionContent>{t.a4}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>{t.q5}</AccordionTrigger>
              <AccordionContent>{t.a5}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-[var(--brand)]/20 dark:bg-[var(--brand)]/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold">{t.final_title}</h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">{t.final_text}</p>
              <div className="mt-6 text-sm">
                <div className="font-medium">{t.countdown}</div>
                <div className="mt-1 text-2xl font-mono">{String(dd).padStart(2,'0')}д : {String(hh).padStart(2,'0')}ч : {String(mm).padStart(2,'0')}м : {String(ss).padStart(2,'0')}с</div>
                <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">{t.week_stats}</div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />{t.final_form_title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder={t.form_name} />
                <Input placeholder={t.form_phone} />
                <Textarea placeholder="Комментарий" />
                <Button className="w-full bg-[var(--brand-2)] hover:bg-[var(--brand-2)]/90 text-white text-base py-6">{t.final_cta}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-sm bg-[var(--brand)]" />
            <span className="font-semibold">{t.brand}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} GARANT IPOTEKI</span>
            <span>ИНН/БИН • Официальный партнёр банков</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
