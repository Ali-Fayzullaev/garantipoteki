"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Users,
  CheckCircle2,
  Zap,
  Phone,
  ArrowRight,
  Shield,
  X,
  Loader2,
  CheckCircle,
  Calendar,
  Star,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";
import { createDeal, updateTxt, getServices, updateDeal } from "@/app/actions";

interface ServiceType {
  id: number;
  name: string;
}

declare global {
  interface Window {
    fbq?: (
      event: string,
      action: string,
      data?: Record<string, unknown>
    ) => void;
  }
}

export default function BookingForm() {
  const { lang } = useApp();
  const t = dict[lang];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogData, setDialogData] = useState({ name: "", phone: "" });
  const [phoneError, setPhoneError] = useState("");
  const [services, setServices] = useState<ServiceType[]>([]);
  const [dealId, setDealId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");

  const trustBadges = [
    { text: t.final_trust1, icon: CheckCircle2 },
    { text: t.final_trust3, icon: Shield },
    { text: t.final_trust4, icon: CheckCircle2 },
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field === "phone") {
      const formattedValue = formatPhone(value);
      setFormData((prev) => ({ ...prev, [field]: formattedValue }));

      const numbers = formattedValue.replace(/\D/g, "");
      if (numbers.length < 11) {
        setPhoneError("Номер телефона должен содержать 11 цифр");
      } else {
        setPhoneError("");
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    const limitedNumbers = numbers.slice(0, 11);

    if (limitedNumbers.length === 0) return "";
    if (limitedNumbers.length === 1) return `+7`;
    if (limitedNumbers.length <= 4) return `+7 (${limitedNumbers.slice(1, 4)}`;
    if (limitedNumbers.length <= 7)
      return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4, 7)}`;
    if (limitedNumbers.length <= 9)
      return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(
        4,
        7
      )}-${limitedNumbers.slice(7, 9)}`;
    return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(
      4,
      7
    )}-${limitedNumbers.slice(7, 9)}-${limitedNumbers.slice(9, 11)}`;
  };

  const isFormValid = (): boolean => {
    const numbers = formData.phone.replace(/\D/g, "");
    return (
      formData.name.trim().length >= 2 && numbers.length === 11 && !phoneError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setDialogType("error");
      setDialogData({ name: formData.name, phone: formData.phone });
      setIsDialogOpen(true);
      return;
    }

    const numbers = formData.phone.replace(/\D/g, "");
    if (numbers.length !== 11) {
      setPhoneError("Номер телефона должен содержать 11 цифр");
      setDialogType("error");
      setDialogData({ name: formData.name, phone: formData.phone });
      setIsDialogOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const deal = await createDeal({
        name: formData.name,
        phone_number: formData.phone.replace(/\D/g, ""),
        comment: formData.comment,
      });

      setDealId(deal.id);
      const servicesData = await getServices();
      setServices(servicesData);

      setIsSubmitting(false);
      setStep(2);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setIsSubmitting(false);
      setDialogType("error");
      setDialogData({ name: formData.name, phone: formData.phone });
      setIsDialogOpen(true);
    }
  };

  const handleServiceSelect = async (
    serviceId: number,
    serviceName: string
  ) => {
    if (!dealId) return;

    setIsSubmitting(true);
    setSelectedService(serviceName);

    try {
      await updateDeal(
        {
          service_id: serviceId,
          phone_number: formData.phone.replace(/\D/g, ""),
        },
        dealId
      );

      await updateTxt({
        name: formData.name,
        phone: formData.phone.replace(/\D/g, ""),
        comment: formData.comment,
        service: serviceName,
      });

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: serviceName,
          content_category: "form_submission",
        });
      }

      setIsSubmitting(false);
      setStep(3);

      setTimeout(() => {
        setDialogData({ name: formData.name, phone: formData.phone });
        setDialogType("success");
        setIsDialogOpen(true);

        setTimeout(() => {
          setFormData({ name: "", phone: "", comment: "" });
          setStep(1);
          setServices([]);
          setDealId(null);
          setSelectedService("");
        }, 12000);
      }, 12000);
    } catch (error) {
      console.error("Ошибка при выборе услуги:", error);
      setIsSubmitting(false);
      setStep(3);

      setTimeout(() => {
        setDialogType("error");
        setIsDialogOpen(true);

        setTimeout(() => {
          setFormData({ name: "", phone: "", comment: "" });
          setStep(1);
          setServices([]);
          setDealId(null);
          setSelectedService("");
        }, 12000);
      }, 12000);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "", comment: "" });
    setStep(1);
    setPhoneError("");
  };

  // Шаг 1: Форма ввода данных
  if (step === 1) {
    return (
      <section id="booking" className="px-2 sm:px-0">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sticky top-2 md:top-8 mx-auto max-w-full"
        >
          <Card className="border-0 shadow-lg md:shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 mx-1 sm:mx-0 min-h-[500px]">
            <CardHeader className="text-center pb-3 md:pb-4 px-3 md:px-6">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-2 md:mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg">
                <Zap className="h-4 w-4 md:h-8 md:w-8 text-white" />
              </div>
              <CardTitle className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-white">
                {t.final_form_title}
              </CardTitle>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-base mt-1">
                {t.final_form_subtitle}
              </p>
            </CardHeader>

            <CardContent className="px-3 md:px-6 pb-4 md:pb-6">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
                <div className="space-y-2 md:space-y-4">
                  <div className="relative">
                    <Input
                      placeholder={t.final_form_name_placeholder}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="h-10 md:h-14 text-sm md:text-lg pl-8 md:pl-12 border-neutral-200 dark:border-neutral-700"
                      required
                    />
                    <Users className="absolute left-2 md:left-4 top-2.5 md:top-4 h-3 w-3 md:h-5 md:w-5 text-neutral-400" />
                  </div>

                  <div className="relative">
                    <Input
                      placeholder={t.final_form_phone_placeholder}
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`h-10 md:h-14 text-sm md:text-lg pl-8 md:pl-12 border-neutral-200 dark:border-neutral-700 ${
                        phoneError ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      required
                      maxLength={18}
                    />
                    <Phone className="absolute left-2 md:left-4 top-2.5 md:top-4 h-3 w-3 md:h-5 md:w-5 text-neutral-400" />
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
                        {phoneError}
                      </p>
                    )}
                  </div>

                  <Textarea
                    placeholder={t.final_form_comment_placeholder}
                    value={formData.comment}
                    onChange={(e) =>
                      handleInputChange("comment", e.target.value)
                    }
                    className="min-h-[80px] md:min-h-[120px] resize-none text-sm md:text-lg p-2 md:p-4 border-neutral-200 dark:border-neutral-700"
                  />
                </div>

                <div className="p-2 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-1 md:gap-3">
                    <Clock className="h-3 w-3 md:h-5 md:w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-300 text-xs">
                        {t.final_form_urgency_title}
                      </div>
                      <div className="text-green-700 dark:text-green-400 text-[10px] md:text-xs">
                        {t.final_form_urgency_desc}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className="w-full h-12 md:h-16 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-sm md:text-lg font-bold shadow-lg md:shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-1 md:gap-2">
                      <Loader2 className="w-4 h-4 md:w-6 md:h-6 animate-spin" />
                      <span className="text-xs md:text-base">
                        {t.booking_form_submitting}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="text-xs md:text-base">
                        {t.final_form_submit_button}
                      </span>
                      <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-5 md:w-5" />
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-3">
                  {trustBadges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-10px" }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-1 text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400"
                    >
                      <badge.icon className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-500 flex-shrink-0" />
                      <span className="text-[10px] md:text-xs">
                        {badge.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-center text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400">
                  {t.final_form_consent}
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    );
  }

  // Шаг 2: Выбор услуги
  if (step === 2) {
    return (
      <section className="px-2 sm:px-0">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-2 md:top-8 mx-auto max-w-full"
        >
          <Card className="border-0 shadow-lg md:shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 mx-1 sm:mx-0 min-h-[400px]">
            <CardHeader className="text-center pb-3 md:pb-4 px-3 md:px-6">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-2 md:mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg">
                <Zap className="h-4 w-4 md:h-8 md:w-8 text-white" />
              </div>
              <CardTitle className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-white">
                {t.booking_step2_title}
              </CardTitle>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-base mt-1">
                {t.booking_step2_subtitle}
              </p>
            </CardHeader>

            <CardContent className="px-3 md:px-6 pb-4 md:pb-6">
              <div className="space-y-3 md:space-y-4">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() =>
                      handleServiceSelect(service.id, service.name)
                    }
                    disabled={isSubmitting}
                    className="w-full h-12 md:h-16 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-sm md:text-lg font-bold shadow-lg md:shadow-xl rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {service.name}
                  </motion.button>
                ))}
              </div>

              {isSubmitting && (
                <div className="mt-4 flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Обработка...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    );
  }

  // Шаг 3: Загрузка
  if (step === 3) {
    return (
      <section className="px-2 sm:px-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sticky top-2 md:top-8 mx-auto max-w-full"
        >
          <Card className="border-0 shadow-lg md:shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 mx-1 sm:mx-0 min-h-[600px]">
            <CardContent className="p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 opacity-60"></div>

              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                    initial={{
                      y: -20,
                      x: Math.random() * 100 - 50,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      y: 400,
                      x: Math.random() * 100 - 50,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeatDelay: 3,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 p-6 md:p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-10 h-10 md:w-14 md:h-14 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3 md:mb-4"
                >
                  {t.booking_loading_title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-6 md:mb-8"
                >
                  {t.booking_loading_thanks.replace("{{name}}", formData.name)}
                  <br />
                  {t.booking_loading_desc}
                  <br />
                  <span className="font-semibold text-blue-600">
                    {formData.phone}
                  </span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-green-200 dark:border-green-800"
                >
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 md:mb-4 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                    {t.booking_details_title}
                  </h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {t.booking_name_label}
                      </span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {formData.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {t.booking_phone_label}
                      </span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {formData.phone}
                      </span>
                    </div>
                    {formData.comment && (
                      <div className="flex justify-between items-start">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {t.booking_comment_label}
                        </span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-right max-w-[200px]">
                          {formData.comment}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-blue-50/70 dark:bg-blue-900/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-blue-200 dark:border-blue-800"
                >
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 md:mb-4 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                    {t.booking_next_steps_title}
                  </h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base text-blue-700 dark:text-blue-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{t.booking_step_next1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{t.booking_step_next2}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{t.booking_step_next3}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <Button
                    onClick={handleReset}
                    className="w-full md:w-auto h-12 md:h-14 px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-base md:text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    {t.booking_new_request}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    );
  }

  return null;
}