"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Star,
  Zap,
  TrendingUp,
  Target,
  FileText,
  Building2,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";
import BookingForm from "./booking-form";

export default function BookingSection() {
  const { lang } = useApp();
  const t = dict[lang];
  const sectionRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Generate time slots from 9:00 to 18:00
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 9 + i;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: Target,
      title: t.benefit_1_title,
      description: t.benefit_1_desc,
    },
    {
      icon: Building2,
      title: t.benefit_2_title,
      description: t.benefit_2_desc,
    },
    {
      icon: TrendingUp,
      title: t.benefit_3_title,
      description: t.benefit_3_desc,
    },
    {
      icon: ShieldCheck,
      title: t.benefit_4_title,
      description: t.benefit_4_desc,
    },
  ];

  const specialOffers = [
    {
      icon: Zap,
      title: t.offer_1_title,
      description: t.offer_1_desc,
    },
    {
      icon: FileText,
      title: t.offer_3_title,
      description: t.offer_3_desc,
    },
  ];

  const securityFeatures = [
    {
      icon: ShieldCheck,
      text: t.security_1_text,
      description: t.security_1_desc,
    },
    {
      icon: CheckCircle2,
      text: t.security_2_text,
      description: t.security_2_desc,
    },
    {
      icon: CalendarDays,
      text: t.security_3_text,
      description: t.security_3_desc,
    },
  ];

  const officeLocations = [
    {
      name: t.office_left_bank,
      address: t.office_left_address,
      hours: t.office_hours,
      features: [
        t.office_features_parking,
        t.office_features_metro,
        t.office_features_elevator,
        t.office_features_ac,
      ],
    },
    {
      name: t.office_right_bank,
      address: t.office_right_address,
      hours: t.office_hours,
      features: [
        t.office_features_parking,
        t.office_features_center,
        t.office_features_elevator,
        t.office_features_wifi,
      ],
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-3 mb-4 backdrop-blur-sm">
            <CalendarDays className="w-4 h-4 mr-2" />
            {t.professional_consultation_badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.booking_title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t.booking_subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Benefits */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[300px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  {t.benefits_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 to-green-500/5 hover:from-blue-500/10 hover:to-green-500/10 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-green-500/20 transition-all duration-300">
                      <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 min-h-[300px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  {t.special_offers_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {specialOffers.map((offer, index) => (
                  <motion.div
                    key={offer.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-amber-900/20"
                  >
                    <offer.icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                        {offer.title}
                      </h4>
                      <p className="text-amber-700 dark:text-amber-400 text-xs">
                        {offer.description}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 p-4 rounded-xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700"
                >
                  <div className="text-center">
                    <div className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-2">
                      {t.countdown_label}
                    </div>
                    <div className="flex justify-center gap-3 text-amber-900 dark:text-amber-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {timeLeft.hours}
                        </div>
                        <div className="text-xs">{t.hours}</div>
                      </div>
                      <div className="text-2xl font-bold">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {timeLeft.minutes}
                        </div>
                        <div className="text-xs">{t.minutes}</div>
                      </div>
                      <div className="text-2xl font-bold">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {timeLeft.seconds}
                        </div>
                        <div className="text-xs">{t.seconds}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card
              id="adress"
              className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm min-h-[300px]"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  {t.offices_title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {officeLocations.map((office, index) => (
                  <motion.div
                    key={office.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500/50 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {office.name}
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {office.address}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-[8px] sm:text-sm">{office.hours}</span>
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {office.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="outline"
                          className="text-xs bg-blue-50 dark:bg-blue-900/20"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 min-h-[200px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    {t.security_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                          {feature.text}
                        </div>
                        <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column - Booking Form */}
          <BookingForm/>
        </div>
      </div>
    </section>
  );
}