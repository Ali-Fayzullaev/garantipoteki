"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";

export default function SuccessStoriesCarousel() {
  const { lang } = useApp();
  const t = dict[lang];

  const successStories = [
    {
      id: 2,
      name: t.story1_name,
      location: t.story1_location,
      amount: t.story1_amount,
      duration: t.story1_duration,
      rating: 5,
      story: t.story1_story,
      badges: [t.story1_badge1, t.story1_badge2, t.story1_badge3],
    },
    {
      id: 3,
      name: t.story2_name,
      location: t.story2_location,
      amount: t.story2_amount,
      duration: t.story2_duration,
      rating: 5,
      story: t.story2_story,
      badges: [t.story2_badge1, t.story2_badge2, t.story2_badge3],
    },
    {
      id: 4,
      name: t.story3_name,
      location: t.story3_location,
      amount: t.story3_amount,
      duration: t.story3_duration,
      rating: 5,
      story: t.story3_story,
      badges: [t.story3_badge1, t.story3_badge2, t.story3_badge3],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play каждые 6 секунд
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, successStories.length]);

  const nextSlide = () => {
    setCurrentIndex(
      currentIndex === successStories.length - 1 ? 0 : currentIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? successStories.length - 1 : currentIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="reviews"
      className="py-16 mb-4 md:py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/50 px-4 py-2 md:py-3 mb-4 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t.carousel_badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            {t.carousel_title}
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4">
            {t.carousel_subtitle}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative mb-12 md:mb-16"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons - Desktop */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
          </Button>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-700 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-700 shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel Content */}
          <div className="w-full max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group mx-4 md:mx-0">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                      {/* Left Column - Amount & Basic Info */}
                      <div className="flex flex-col items-center lg:items-start lg:w-2/5 space-y-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-green-500/20 transition-all duration-500">
                          <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
                        </div>
                        
                        <div className="text-center lg:text-left">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-green-600 to-blue-600 text-transparent bg-clip-text mb-2">
                            {successStories[currentIndex].amount}
                          </div>
                          <div className="flex items-center justify-center lg:justify-start gap-1 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                            <Clock className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="font-medium">{successStories[currentIndex].duration}</span>
                          </div>
                        </div>

                        {/* Rating - Mobile */}
                        <div className="flex lg:hidden items-center gap-1">
                          {[...Array(successStories[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg text-sm md:text-base">
                          <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          {t.carousel_approved}
                        </Badge>
                      </div>

                      {/* Right Column - Details */}
                      <div className="flex-1 space-y-4 md:space-y-6">
                        {/* Client Info */}
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-xl md:text-2xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {successStories[currentIndex].name}
                          </h4>
                          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm md:text-base">{successStories[currentIndex].location}</span>
                            
                            {/* Rating - Desktop */}
                            <div className="hidden lg:flex items-center gap-1 ml-4">
                              {[...Array(successStories[currentIndex].rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Story */}
                        <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed md:leading-loose">
                          {successStories[currentIndex].story}
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          {successStories[currentIndex].badges.map((badge, badgeIndex) => (
                            <Badge
                              key={badgeIndex}
                              variant="secondary"
                              className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs md:text-sm px-3 py-1 border-0 shadow-sm"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-3 mb-12 md:mb-16">
          {successStories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-blue-500 to-green-500 w-8"
                  : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              { value: "47+", label: t.stat_cases },
              { value: "92%", label: t.stat_approval },
              { value: lang === "ru" ? "1 день" : "1 күн", label: t.stat_time },
              { value: "9.8 млн ₸", label: t.stat_amount },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 md:p-6 rounded-2xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700"
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-br from-blue-600 to-green-600 text-transparent bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}