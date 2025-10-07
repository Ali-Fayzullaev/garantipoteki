"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createDeal, updateTxt } from "@/app/actions";

export default function BookingForm() {
  const { lang } = useApp();
  const t = dict[lang];

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

  const trustBadges = [
    { text: t.final_trust1, icon: CheckCircle2 },
    { text: t.final_trust2, icon: Shield },
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
      formData.name.trim().length > 0 && numbers.length === 11 && !phoneError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
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

      await updateTxt({
        name: formData.name,
        phone: formData.phone.replace(/\D/g, ""),
        comment: formData.comment,
      });

      setDialogData({ name: formData.name, phone: formData.phone });
      setDialogType("success");
      setIsDialogOpen(true);

      setFormData({ name: "", phone: "", comment: "" });
      setPhoneError("");
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setDialogData({ name: formData.name, phone: formData.phone });
      setDialogType("error");
      setIsDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <section className="px-2 sm:px-0">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="sticky top-2 md:top-8 mx-auto max-w-full"
      >
        <Card className="border-0 shadow-lg md:shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 mx-1 sm:mx-0">
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
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-10 md:h-14 text-sm md:text-lg pl-8 md:pl-12 border-neutral-200 dark:border-neutral-700"
                    required
                  />
                  <Users className="absolute left-2 md:left-4 top-2.5 md:top-4 h-3 w-3 md:h-5 md:w-5 text-neutral-400" />
                </div>

                <div className="relative">
                  <Input
                    placeholder={t.final_form_phone_placeholder}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
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
                  onChange={(e) => handleInputChange("comment", e.target.value)}
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
                    <div className="w-4 h-4 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-1 text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400"
                  >
                    <badge.icon className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-500 flex-shrink-0" />
                    <span className="text-[10px] md:text-xs">{badge.text}</span>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md mx-auto">
          <DialogHeader className="px-4 sm:px-6">
            <div
              className={`w-12 h-12 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full flex items-center justify-center ${
                dialogType === "success"
                  ? "bg-green-100 dark:bg-green-900"
                  : "bg-red-100 dark:bg-red-900"
              }`}
            >
              {dialogType === "success" ? (
                <CheckCircle2 className="h-5 w-5 md:h-10 md:w-10 text-green-600 dark:text-green-400" />
              ) : (
                <X className="h-5 w-5 md:h-10 md:w-10 text-red-600 dark:text-red-400" />
              )}
            </div>
            <DialogTitle
              className={`text-center text-lg md:text-2xl ${
                dialogType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {dialogType === "success"
                ? t.final_dialog_success_title
                : t.final_dialog_error_title}
            </DialogTitle>
            <DialogDescription className="text-center text-sm md:text-lg">
              {dialogType === "success"
                ? t.final_dialog_success_desc
                : t.final_dialog_error_desc}
            </DialogDescription>
          </DialogHeader>

          {dialogType === "success" && (
            <div className="space-y-3 text-sm px-4 sm:px-6">
              <div className="p-2 md:p-4 rounded-lg md:rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <div className="font-semibold text-neutral-900 dark:text-white mb-1 md:mb-2 text-xs md:text-base">
                  {t.final_dialog_details_title}
                </div>
                <div className="space-y-1 md:space-y-2 text-neutral-600 dark:text-neutral-400 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>{t.final_dialog_name_label}</span>
                    <span className="font-semibold">{dialogData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.final_dialog_phone_label}</span>
                    <span className="font-semibold">{dialogData.phone}</span>
                  </div>
                </div>
              </div>

              <div className="p-2 md:p-4 rounded-lg md:rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-1 md:gap-2 text-blue-800 dark:text-blue-300 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                  <Zap className="h-3 w-3 md:h-4 md:w-4" />
                  {t.final_dialog_next_steps}
                </div>
                <ul className="space-y-1 md:space-y-2 text-blue-700 dark:text-blue-400 text-[10px] md:text-xs">
                  <li className="flex items-center gap-1 md:gap-2">
                    <CheckCircle2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {t.final_dialog_step1}
                  </li>
                  <li className="flex items-center gap-1 md:gap-2">
                    <CheckCircle2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {t.final_dialog_step2}
                  </li>
                  <li className="flex items-center gap-1 md:gap-2">
                    <CheckCircle2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {t.final_dialog_step3}
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="px-4 sm:px-6 pb-4">
            <Button
              onClick={handleDialogClose}
              className={`w-full ${
                dialogType === "success"
                  ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white text-sm md:text-base`}
            >
              {t.final_dialog_close}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
