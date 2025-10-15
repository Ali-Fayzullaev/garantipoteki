"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  CheckCircle2,
  Zap,
  CalendarDays,
  Star,
  Target,
  Crown,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";
import CountdownTimer from "../ui/CountdownTimer";
import BookingForm from "./booking-form";

export default function FinalCTASection() {
  const { lang } = useApp();
  const t = dict[lang];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const difference = targetDate.getTime() - now.getTime();
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      step: 1,
      title: t.final_step1_title,
      description: t.final_step1_desc,
      icon: CalendarDays,
    },
    {
      step: 2,
      title: t.final_step2_title,
      description: t.final_step2_desc,
      icon: Users,
    },
    {
      step: 3,
      title: t.final_step3_title,
      description: t.final_step3_desc,
      icon: CheckCircle2,
    },
  ];

  const weekStats = [
    {
      label: t.final_stat1_label,
      value: "47",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: t.final_stat2_label,
      value: "39",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      label: t.final_stat3_label,
      value: "12 млн ₸",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  const specialOffers = [
    {
      icon: Crown,
      title: t.final_offer1_title,
      description: t.final_offer1_desc,
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: t.final_offer3_title,
      description: t.final_offer3_desc,
      color: "text-purple-500",
    },
  ];

  // Конфигурация анимаций для предотвращения прыжков
  const animationConfig = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  const cardAnimation = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7 }
  };

  const itemAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.4 }
  };

  return (
    <section
      id="final-cta"
      className="py-8 md:py-20 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...animationConfig}
          className="text-center mb-6 md:mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-3 py-1.5 md:px-4 md:py-3 mb-3 md:mb-4 backdrop-blur-sm text-xs">
            <Zap className="w-3 h-3 mr-1 md:mr-2" />
            {t.final_cta_badge}
          </Badge>
          <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-2 md:mb-4 px-2">
            {t.final_cta_title}
          </h2>
          <p className="text-sm md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-2 leading-relaxed">
            {t.final_cta_subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-12 items-start">
          <motion.div
            {...cardAnimation}
            className="space-y-3 md:space-y-8"
          >
            {/* Urgency Card */}
            <Card className="border-0 shadow-md md:shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[180px] md:min-h-[200px]">
              <CardHeader className="text-center pb-2 md:pb-4">
                <CardTitle className="flex items-center justify-center gap-1 text-sm md:text-xl">
                  <Zap className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                  {t.final_urgency_title}
                </CardTitle>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-base px-1">
                  {t.final_urgency_desc}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-center space-y-2 md:space-y-6">
                  <div className="flex justify-center">
                    <CountdownTimer
                      targetDate={
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() + 1,
                          1
                        )
                      }
                      className="text-lg md:text-3xl font-bold dark:text-white bg-gradient-to-br from-blue-500 to-green-500 text-transparent bg-clip-text"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="p-2 rounded-lg md:rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700"
                  >
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-semibold text-orange-800 dark:text-orange-300 text-xs">
                          {t.final_urgency_limit}
                        </div>
                        <div className="text-orange-700 dark:text-orange-400 text-[10px] leading-tight">
                          {t.final_urgency_limit_desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-0 shadow-md md:shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[180px] md:min-h-[200px]">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="flex items-center gap-1 text-sm md:text-xl">
                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                  {t.final_stats_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 gap-1 md:gap-4">
                  {weekStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-15px" }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex items-center gap-1 p-2 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600"
                    >
                      <stat.icon
                        className={`h-4 w-4 md:h-8 md:w-8 ${stat.color}`}
                      />
                      <div className="flex-1">
                        <div className="text-xs md:text-lg font-bold text-neutral-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Steps Card */}
            <Card className="border-0 shadow-md md:shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[220px] md:min-h-[250px]">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="flex items-center gap-1 text-sm md:text-xl">
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                  {t.final_steps_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 md:space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-1 md:gap-4"
                  >
                    <div className="flex-shrink-0 w-5 h-5 md:w-10 md:h-10 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full flex items-center justify-center mt-0.5">
                      <step.icon className="h-2.5 w-2.5 md:h-5 md:w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white text-xs md:text-base truncate">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-[10px] md:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Offers Card */}
            <Card className="border-0 shadow-md md:shadow-2xl bg-gradient-to-r from-blue-500/5 to-green-500/5 dark:from-blue-500/10 dark:to-green-500/10 min-h-[150px] md:min-h-[180px]">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-xs md:text-lg flex items-center gap-1">
                  <Crown className="h-3 w-3 text-yellow-500" />
                  {t.final_offers_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-1 md:space-y-4">
                {specialOffers.map((offer, index) => (
                  <motion.div
                    key={offer.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="flex items-center gap-1 p-1.5 md:p-3 rounded-lg md:rounded-xl bg-white/50 dark:bg-neutral-800/50"
                  >
                    <offer.icon
                      className={`h-3 w-3 md:h-4 md:w-4 ${offer.color} flex-shrink-0`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-neutral-900 dark:text-white text-xs md:text-sm truncate">
                        {offer.title}
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400 text-[10px] md:text-xs leading-tight">
                        {offer.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Form */}
          <div className="mt-3 md:mt-0">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}