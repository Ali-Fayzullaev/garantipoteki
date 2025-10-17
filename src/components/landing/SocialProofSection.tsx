"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  MapPin,
  Clock,
  Shield,
  FileText,
  Users,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckSquare,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider"; // Исправленный путь
import { dict } from "@/lib/dictionary";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function SocialProofSection() {
  const { lang } = useApp();
  const t = dict[lang as keyof typeof dict]; // Добавлено приведение типа

  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      id: 1,
      name: t.story1_name,
      location: t.story1_location,
      amount: t.story1_amount,
      duration: t.story1_duration,
      story: t.story1_story,
      url: "/user_p.png",
      rating: 5,
    },
    {
      id: 2,
      name: t.story2_name,
      location: t.story2_location,
      amount: t.story2_amount,
      duration: t.story2_duration,
      story: t.story2_story,
      url: "/user_p.png",
      rating: 5,
    },
    {
      id: 3,
      name: t.story3_name,
      location: t.story3_location,
      amount: t.story3_amount,
      duration: t.story3_duration,
      story: t.story3_story,
      url: "/user_p.png",
      rating: 5,
    },
  ];

  const nextReview = useCallback(() => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Автопрокрутка для карусели
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextReview]);

  const offices = [
    {
      address:
        lang === "ru"
          ? "Проспект Бауыржан Момышулы, 2/52 этаж"
          : "Бауыржан Момышулы даңғылы, 2/52 қабат",
      mapUrl: "https://2giskz.app/astana/geo/70000001080131528",
      area: lang === "ru" ? "Правый берег" : "Оң жағалау",
    },
    {
      address:
        lang === "ru"
          ? "Улица Сыганак, 54а, 112 офис; 1 этаж"
          : "Сығанақ көшесі, 54а, 112 офис; 1 қабат",
      mapUrl: "https://2giskz.app/astana/geo/70000001094569458",
      area: lang === "ru" ? "Левый берег" : "Сол жағалау",
    },
    {
      address:
        lang === "ru"
          ? "Проспект Богенбай батыра, 56а, 703 офис; 7 этаж"
          : "Бөгенбай батыр даңғылы, 56а, 703 офис; 7 қабат",
      mapUrl: "https://2giskz.app/astana/geo/70000001103665266",
      area: lang === "ru" ? "Центр" : "Орталық",
    },
  ];

  const schedule = {
    today: lang === "ru" ? "10:00–19:00" : "10:00–19:00",
    weekdays: lang === "ru" ? "10:00–19:00" : "10:00–19:00",
    saturday: lang === "ru" ? "10:00–17:00" : "10:00–17:00",
    sunday: lang === "ru" ? "Выходной" : "Демалыс",
  };

  const scrollToBooking = () => {
    const bookingElement = document.getElementById("booking");
    if (bookingElement) {
      bookingElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="proof"
      className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-emerald-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-500/15 to-emerald-500/15 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/50 px-4 py-2 mb-4 backdrop-blur-sm">
            {t.social_badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.social_title}
          </h2>
        </div>

        {/* Секция 1: Главная история успеха */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 overflow-hidden">
            <div className="grid md:grid-cols-3 gap-8 p-8">
              {/* Левая колонка - фото и основная информация */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="relative">
                  <Image
                    src="/user_p.png"
                    className="rounded-full shadow-lg"
                    width={150}
                    height={150}
                    alt="АК"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-center space-y-3 mt-4">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {t.story_name}
                  </h3>
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 text-sm px-3 py-1 shadow-sm">
                      <CheckSquare className="text-green-500" size={20} />{" "}
                      {t.story_approved}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0 text-sm px-3 py-1 shadow-sm">
                      ⏱ {t.story_time}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Правая колонка - цитата и история */}
              <div className="md:col-span-2">
                <div className="bg-white/60 dark:bg-neutral-800/60 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <blockquote className="text-lg italic text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed border-l-4 border-blue-500 pl-4">
                    &ldquo;{t.story_quote}&rdquo;
                  </blockquote>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {t.story_text}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Секция 2: Статистика в цифрах */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                📊 {t.stats_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200/50">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                    8/10
                  </div>
                  <div className="font-semibold text-neutral-900 dark:text-white mb-2 text-lg">
                    {t.stat1_label}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t.stat1_descSo}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border border-green-200/50">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3">
                    93%
                  </div>
                  <div className="font-semibold text-neutral-900 dark:text-white mb-2 text-lg">
                    {t.stat2_label}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t.stat2_descSo}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl border border-purple-200/50">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                    2.5x
                  </div>
                  <div className="font-semibold text-neutral-900 dark:text-white mb-2 text-lg">
                    {t.stat3_label}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t.stat3_descSo}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Секция 3: Карусель свежих отзывов */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                {t.carousel_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <div key={review.id}>
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 h-full backdrop-blur-sm">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <Image
                            alt="AA"
                            src={review.url}
                            width={40}
                            height={45}
                            className="rounded-full shadow-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-neutral-900 dark:text-white">
                              {review.name}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {review.location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <p className="text-neutral-700 dark:text-neutral-300 mb-4 text-sm leading-relaxed flex-1">
                          {review.story}
                        </p>

                        <div className="space-y-2">
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 w-full justify-center shadow-sm">
                            <CheckSquare className="text-green-500" size={20} />{" "}
                            {review.amount}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="w-full justify-center shadow-sm"
                          >
                            ⏱ {review.duration}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden relative">
                <div className="relative overflow-hidden rounded-2xl">
                  <div key={currentReview} className="w-full">
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {reviews[currentReview].name
                                .split(" ")
                                .map((n: string) => n[0]) // Добавлена типизация
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-neutral-900 dark:text-white">
                              {reviews[currentReview].name}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {reviews[currentReview].location}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(reviews[currentReview].rating)].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>

                        <p className="text-neutral-700 dark:text-neutral-300 mb-4 text-sm leading-relaxed">
                          {reviews[currentReview].story}
                        </p>

                        <div className="space-y-2">
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 w-full justify-center shadow-sm">
                            <CheckSquare className="text-green-500" size={20} />{" "}
                            {reviews[currentReview].amount}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="w-full justify-center shadow-sm"
                          >
                            ⏱ {reviews[currentReview].duration}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevReview}
                    className="w-12 h-12 rounded-full shadow-sm border-neutral-300 dark:border-neutral-600"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentReview(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentReview
                            ? "bg-blue-500 w-6"
                            : "bg-neutral-300 dark:bg-neutral-600"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextReview}
                    className="w-12 h-12 rounded-full shadow-sm border-neutral-300 dark:border-neutral-600"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Секция 4: Гарантии и безопасность с новыми адресами */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2 text-neutral-900 dark:text-white">
                🏢 {t.security_title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Гарантии */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200/50">
                  <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4 p-2 bg-white rounded-xl shadow-lg" />
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-lg">
                    {t.security1_title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t.security1_desc}
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border border-green-200/50">
                  <FileText className="h-12 w-12 text-green-500 mx-auto mb-4 p-2 bg-white rounded-xl shadow-lg" />
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-lg">
                    {t.security2_title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t.security2_desc}
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl border border-purple-200/50">
                  <Users className="h-12 w-12 text-purple-500 mx-auto mb-4 p-2 bg-white rounded-xl shadow-lg" />
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-lg">
                    {t.security3_title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t.security3_desc}
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl border border-orange-200/50">
                  <Building2 className="h-12 w-12 text-orange-500 mx-auto mb-4 p-2 bg-white rounded-xl shadow-lg" />
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-lg">
                    {t.security4_title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {t.security4_desc}
                  </p>
                </div>
              </div>

              {/* Офисы и график работы */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Офисы */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    {t.office_title}
                  </h3>
                  <div className="space-y-3">
                    {offices.map((office, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50"
                      >
                        <div className="flex items-start gap-3">
                          <Badge className="bg-blue-500 text-white flex-shrink-0 shadow-sm">
                            {index + 1}
                          </Badge>
                          <div className="flex-1">
                            <p className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                              {office.address}
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                              {office.area}
                            </p>
                            <a
                              href={office.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                            >
                              {t.office_map} →
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* График работы */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    {lang === "ru" ? "График работы" : "Жұмыс кестесі"}
                  </h3>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-green-200/50">
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {lang === "ru" ? "Сегодня" : "Бүгін"}
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          {schedule.today}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {lang === "ru" ? "Будни" : "Дүйсенбі-Жұма"}
                        </span>
                        <span className="font-semibold">
                          {schedule.weekdays}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {lang === "ru" ? "Суббота" : "Сенбі"}
                        </span>
                        <span className="font-semibold">
                          {schedule.saturday}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {lang === "ru" ? "Воскресенье" : "Жексенбі"}
                        </span>
                        <span className="text-red-500 font-semibold">
                          {schedule.sunday}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Призыв к действию */}
        <div className="text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t.final_title}
                </h3>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto text-lg">
                  {t.final_subtitle}
                </p>
                <Button
                  onClick={scrollToBooking}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 px-8 font-semibold min-h-[48px] text-lg shadow-lg"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  {t.final_cta1}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}