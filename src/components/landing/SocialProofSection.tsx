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
import Partners from "@/lib/partners";
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
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="proof"
      className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <Award className="w-4 h-4 mr-2" />
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <CardContent className="p-8 lg:p-12">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-lg italic text-neutral-700 dark:text-neutral-300">
                    {t.story_quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">АК</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {t.story_name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <MapPin className="h-4 w-4" />
                      <span>{t.story_city}</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  {t.story_text}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 px-4 py-2">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      {t.story_approved}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0 px-4 py-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {t.story_time}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-neutral-800/50">
                      <div className="text-neutral-600 dark:text-neutral-400">
                        {t.story_bank_offer}
                      </div>
                      <div className="font-semibold text-neutral-900 dark:text-white">
                        3 000 000 ₸
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                      <div className="text-green-600 dark:text-green-400">
                        {t.story_our_result}
                      </div>
                      <div className="font-bold text-green-600 dark:text-green-400">
                        10 000 000 ₸
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 flex items-center justify-center p-8 lg:p-12">
                <div className="text-center space-y-8 w-full">
                  <div>
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25 mb-4">
                      <TrendingUp className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                      +233%
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      {t.story_increase}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        83%
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        Ниже ставка
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        1 час
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        Время одобрения
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={scrollToBooking}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg shadow-green-500/25"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    {t.cta_know_amount}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                {t.stats_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl flex items-center justify-center">
                      <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                {t.latest_cases_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestCases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-white/50 dark:border-neutral-700/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {caseItem.amount}
                    </div>
                    <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-2">
                      {caseItem.name}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {caseItem.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="h-5 w-5 text-blue-500" />
                  {t.security_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20"
                  >
                    <feature.icon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-5 w-5 text-green-500" />
                  {t.office_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        {t.office_left}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {t.office_left_address}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {t.office_map}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        {t.office_right}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {t.office_right_address}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {t.office_map}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Clock className="h-4 w-4" />
                  <span>{t.office_hours}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {t.office_cta}
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16 text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            {t.partner_title}
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {Partners.map((bank, index) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Image
                    src={bank.logoUrl}
                    alt={bank.name}
                    width={48}
                    height={48}
                    className="object-contain max-h-10 max-w-10 rounded-lg"
                  />
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {bank.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t.final_title}
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                {t.final_subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={scrollToBooking}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 px-8 font-semibold"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
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