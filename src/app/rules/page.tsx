"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  CheckCircle2,
  FileText,
  Star,
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Users,
  Home,
  MoveLeft,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function HowToUse() {
  const { lang } = useApp();

  const steps = [
    {
      icon: Calculator,
      title: lang === "ru" ? "Расчет ипотеки" : "Ипотеканы есептеу",
      description:
        lang === "ru"
          ? "Воспользуйтесь калькулятором для предварительного расчета платежей"
          : "Алдын ала төлемдерді есептеу үшін калькуляторды пайдаланыңыз",
      duration: lang === "ru" ? "2 минуты" : "2 минут",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle2,
      title: lang === "ru" ? "Пройдите тест" : "Тесті тапсырыңыз",
      description:
        lang === "ru"
          ? "Ответьте на несколько вопросов для подбора лучшей программы"
          : "Ең жақсы бағдарламаны таңдау үшін бірнеше сұраққа жауап беріңіз",
      duration: lang === "ru" ? "5 минут" : "5 минут",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FileText,
      title: lang === "ru" ? "Оставьте заявку" : "Өтініш қалдырыңыз",
      description:
        lang === "ru"
          ? "Заполните простую форму для связи со специалистом"
          : "Сарапшымен байланысу үшін қарапайым нысанды толтырыңыз",
      duration: lang === "ru" ? "3 минуты" : "3 минут",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Phone,
      title: lang === "ru" ? "Получите консультацию" : "Кеңес алыңыз",
      description:
        lang === "ru"
          ? "Наш эксперт свяжется с вами и предложит лучшие условия"
          : "Біздің сарапшы сізбен байланысады және ең жақсы жағдайларды ұсынады",
      duration: lang === "ru" ? "15 минут" : "15 минут",
      color: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: lang === "ru" ? "Экономия времени" : "Уақыт үнемдеу",
      description:
        lang === "ru"
          ? "Весь процесс от заявки до одобрения занимает 1-2 дня"
          : "Өтініштен мақұлдауға дейін бүкіл процесс 1-2 күнді алады",
    },
    {
      icon: Shield,
      title: lang === "ru" ? "Безопасность" : "Қауіпсіздік",
      description:
        lang === "ru"
          ? "Все данные защищены и не передаются третьим лицам"
          : "Барлық деректер қорғалған және үшінші тұлғаларға берілмейді",
    },
    {
      icon: Users,
      title: lang === "ru" ? "Поддержка 24/7" : "Қолдау 24/7",
      description:
        lang === "ru"
          ? "Наши специалисты всегда готовы ответить на ваши вопросы"
          : "Біздің сарапшылар әрқашан сіздің сұрақтарыңызға жауап беруге дайын",
    },
    {
      icon: Home,
      title:
        lang === "ru" ? "Любая недвижимость" : "Кез келген жылжымайтын мүлік",
      description:
        lang === "ru"
          ? "Работаем с новостройками, вторичкой и загородной недвижимостью"
          : "Жаңа ғимараттар, ескі қорлар және қала сыртындағы жылжымайтын мүліктермен жұмыс істейміз",
    },
  ];

  const benefits = [
    {
      number: "01",
      title: lang === "ru" ? "Бесплатный расчет" : "Тегін есептеу",
      description:
        lang === "ru"
          ? "Калькулятор ипотеки доступен без регистрации и совершенно бесплатно"
          : "Ипотека калькуляторы тіркеусіз және мүлдем тегін қол жетімді",
    },
    {
      number: "02",
      title: lang === "ru" ? "Подбор программ" : "Бағдарламаларды таңдау",
      description:
        lang === "ru"
          ? "Автоматически подбираем лучшие программы из 15+ банков-партнеров"
          : "15+ банк-серіктестердің ең жақсы бағдарламаларын автоматты түрде таңдаймыз",
    },
    {
      number: "03",
      title: lang === "ru" ? "Экспертная помощь" : "Сарапшылық көмек",
      description:
        lang === "ru"
          ? "Опытные специалисты помогут с оформлением документов и получением одобрения"
          : "Тәжірибелі мамандар құжаттарды ресімдеуге және мақұлдау алуға көмектеседі",
    },
  ];

  return (
    <section
      id="how-to-use"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 mb-8">
          <Button
            className="py-3 px-4 flex items-center gap-2"
            variant="outline"
            size="lg"
          >
            <MoveLeft size={16} />
            <Link href="/" className="flex items-center">
              {lang === "ru" ? "Назад" : "Артқа"}
            </Link>
          </Button>
          <ThemeToggle />
          <LanguageToggle />
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-2 mb-4 backdrop-blur-sm">
            <Star className="w-4 h-4 mr-2" />
            {lang === "ru" ? "Как пользоваться" : "Қалай пайдалануға болады"}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {lang === "ru"
              ? "4 простых шага к вашей ипотеке"
              : "Сіздің ипотекаңызға 4 қарапайым қадам"}
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {lang === "ru"
              ? "Всего 15 минут и вы получите предварительное одобрение от ведущих банков Казахстана"
              : "Барлығы 15 минут және сіз Қазақстанның жетекші банктерінен алдын ала мақұлдау аласыз"}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                {index + 1}
              </div>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group h-full">
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-neutral-900 dark:text-white text-lg mb-3">
                    {step.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <Clock className="h-3 w-3" />
                    <span>{step.duration}</span>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-4">
                      <ArrowRight className="h-5 w-5 text-neutral-400" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 z-0">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              {lang === "ru" ? "Почему выбирают нас" : "Неге бізді таңдайды"}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    {/* Number */}
                    <div className="text-6xl font-bold text-neutral-200 dark:text-neutral-700 absolute top-2 right-4 group-hover:text-blue-200 dark:group-hover:text-blue-800 transition-colors duration-300">
                      {benefit.number}
                    </div>

                    <div className="relative z-10">
                      <h4 className="font-bold text-neutral-900 dark:text-white text-lg mb-3 pr-16">
                        {benefit.title}
                      </h4>

                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
