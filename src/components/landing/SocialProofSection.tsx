"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  CheckCircle2,
  TrendingUp,
  Users,
  Award,
  MapPin,
  Clock,
  Shield,
  FileText,
  Building2,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";
import SuccessStoriesCarousel from "./Reviews";
import Image from "next/image";

export default function SocialProofSection() {
  const { lang } = useApp();
  const t = dict[lang];

  const stats = [
    {
      icon: TrendingUp,
      value: "8/10",
      label: t.stat1_label,
      description: t.stat1_descSo,
    },
    {
      icon: CheckCircle2,
      value: "93%",
      label: t.stat2_label,
      description: t.stat2_descSo,
    },
    {
      icon: Star,
      value: "2.5x",
      label: t.stat3_label,
      description: t.stat3_descSo,
    },
    {
      icon: Users,
      value: "1000+",
      label: t.stat4_label,
      description: t.stat4_desc,
    },
  ];

  const latestCases = [
    {
      name: t.case1_name,
      amount: "6 500 000 ₸",
      description: t.case1_desc,
    },
    {
      name: t.case2_name,
      amount: "9 000 000 ₸",
      description: t.case2_desc,
    },
    {
      name: t.case3_name,
      amount: "5 000 000 ₸",
      description: t.case3_desc,
    },
    {
      name: t.case4_name,
      amount: "7 200 000 ₸",
      description: t.case4_desc,
    },
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: t.security1_title,
      description: t.security1_desc,
    },
    {
      icon: FileText,
      title: t.security2_title,
      description: t.security2_desc,
    },
    {
      icon: Users,
      title: t.security3_title,
      description: t.security3_desc,
    },
    {
      icon: CheckCircle2,
      title: t.security4_title,
      description: t.security4_desc,
    },
  ];

  const scrollToBooking = () => {
    const bookingElement = document.getElementById("booking");
    if (bookingElement) {
      bookingElement.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  // Конфигурация анимаций для предотвращения прыжков
  const animationConfig = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 }
  };

  const itemAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.4 }
  };

  return (
    <section
      id="proof"
      className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...animationConfig}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <Award className="w-4 h-4 mr-2 flex-shrink-0" />
            {t.social_badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.social_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t.social_subtitle}
          </p>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 overflow-hidden min-h-[500px] lg:min-h-[400px]">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 h-full">
              <CardContent className="p-6 md:p-8 lg:p-12">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current flex-shrink-0" />
                    ))}
                  </div>
                  <p className="text-base md:text-lg italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {t.story_quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm md:text-lg">АК</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white truncate">
                      {t.story_name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                      <span className="truncate">{t.story_city}</span>
                    </div>
                  </div>
                </div>

                <p className="text-base text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed line-clamp-3 md:line-clamp-4">
                  {t.story_text}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 px-3 py-1 md:px-4 md:py-2 text-xs min-h-[24px]">
                      <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                      {t.story_approved}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0 px-3 py-1 md:px-4 md:py-2 text-xs min-h-[24px]">
                      <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                      {t.story_time}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-neutral-800/50 min-h-[60px] flex flex-col justify-center">
                      <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                        {t.story_bank_offer}
                      </div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                        3 000 000 ₸
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 min-h-[60px] flex flex-col justify-center">
                      <div className="text-green-600 dark:text-green-400 text-xs">
                        {t.story_our_result}
                      </div>
                      <div className="font-bold text-green-600 dark:text-green-400 text-sm">
                        10 000 000 ₸
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 flex items-center justify-center p-6 md:p-8 lg:p-12">
                <div className="text-center space-y-6 md:space-y-8 w-full">
                  <div>
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25 mb-4">
                      <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-white flex-shrink-0" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                      +233%
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {t.story_increase}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 min-h-[70px] flex flex-col justify-center">
                      <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                        83%
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        Ниже ставка
                      </div>
                    </div>
                    <div className="text-center p-3 md:p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 min-h-[70px] flex flex-col justify-center">
                      <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                        1 час
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        Время одобрения
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={scrollToBooking}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg shadow-green-500/25 min-h-[44px] text-sm md:text-base"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 flex-shrink-0" />
                    {t.cta_know_amount}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[300px]">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2 text-xl md:text-2xl">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-500 flex-shrink-0" />
                {t.stats_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="text-center min-h-[140px] flex flex-col justify-center"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl flex items-center justify-center">
                      <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-neutral-700 dark:text-neutral-300 text-sm mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
                      {stat.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <SuccessStoriesCarousel/>

        <motion.div
          {...cardAnimation}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 min-h-[200px]">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                {t.latest_cases_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {latestCases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-15px" }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    className="text-center p-3 md:p-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-white/50 dark:border-neutral-700/50 hover:border-blue-500/30 transition-all duration-300 min-h-[100px] flex flex-col justify-center"
                  >
                    <div className="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {caseItem.amount}
                    </div>
                    <div className="font-semibold text-neutral-900 dark:text-white text-xs md:text-sm mb-2 line-clamp-1">
                      {caseItem.name}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {caseItem.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[300px]">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  {t.security_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 min-h-[70px]"
                  >
                    <feature.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1 leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 min-h-[300px]">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Building2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  {t.office_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base truncate">
                        {t.office_left}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-tight">
                        {t.office_left_address}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs min-h-[24px]"
                    >
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      {t.office_map}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base truncate">
                        {t.office_right}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-tight">
                        {t.office_right_address}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs min-h-[24px]"
                    >
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      {t.office_map}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs md:text-sm">{t.office_hours}</span>
                </div>

                <a href="#booking">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white min-h-[44px] text-sm md:text-base">
                    <CalendarDays className="mr-2 h-4 w-4 flex-shrink-0" />
                    {t.office_cta}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white min-h-[200px] flex items-center justify-center">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                {t.final_title}
              </h3>
              <p className="text-white/80 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                {t.final_subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button
                  onClick={scrollToBooking}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 px-6 md:px-8 font-semibold min-h-[48px] text-sm md:text-base"
                >
                  <CalendarDays className="mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  {t.final_cta1}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}