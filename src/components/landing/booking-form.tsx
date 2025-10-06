"use client";
import { useState } from "react";
import { createDeal, updateTxt } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  Phone,
  User,
  CreditCard,
  CheckCircle2,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";

export function BookingForm() {
  const { lang } = useApp();
  const t = dict[lang];

  // Состояния формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    amount: "",
    comment: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [dayTab, setDayTab] = useState("today");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Временные слоты
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  // Обработчик изменения полей
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Форматирование телефона
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 1) return `+7${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`;
    if (numbers.length <= 7)
      return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
    if (numbers.length <= 9)
      return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(
        4,
        7
      )}-${numbers.slice(7, 9)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(
      7,
      9
    )}-${numbers.slice(9, 11)}`;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert(t.booking_form_error_no_time);
      return;
    }

    setIsSubmitting(true);

    try {
      const deal = await createDeal({
        name: formData.name,
        phone_number: formData.phone.replace(/\D/g, ""),
        comment:
          formData.comment ||
          `Сумма: ${formData.amount}. Время: ${selectedSlot}`,
        // amount: formData.amount,
        // selected_time: selectedSlot,
      });

      await updateTxt({
        name: formData.name,
        phone: formData.phone.replace(/\D/g, ""),
        service: "Консультация по кредиту",
        comment: formData.comment,
        amount: formData.amount,
        selected_time: selectedSlot,
      });

      setIsDialogOpen(true);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert(t.booking_form_error_submit);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setFormData({
      name: "",
      phone: "",
      amount: "",
      comment: "",
    });
    setSelectedSlot("");
    setDayTab("today");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 sticky top-8">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/25">
              <CalendarDays className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
              {t.booking_form_title}
            </CardTitle>
            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <p>• {t.booking_form_note1}</p>
              <p>• {t.booking_form_note2}</p>
              <p>• {t.booking_form_note3}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {t.booking_form_time_label}
              </label>
              <Tabs value={dayTab} onValueChange={setDayTab}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger
                    value="today"
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    {t.booking_form_today}
                  </TabsTrigger>
                  <TabsTrigger
                    value="tomorrow"
                    className="flex items-center gap-2"
                  >
                    <CalendarDays className="h-4 w-4" />
                    {t.booking_form_tomorrow}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={
                          selectedSlot === `today-${slot}`
                            ? "default"
                            : "outline"
                        }
                        className={`h-12 ${
                          selectedSlot === `today-${slot}`
                            ? "bg-gradient-to-r from-blue-500 to-green-500 text-white border-transparent"
                            : "hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        } transition-all duration-300`}
                        onClick={() => setSelectedSlot(`today-${slot}`)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tomorrow" className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={
                          selectedSlot === `tomorrow-${slot}`
                            ? "default"
                            : "outline"
                        }
                        className={`h-12 ${
                          selectedSlot === `tomorrow-${slot}`
                            ? "bg-gradient-to-r from-blue-500 to-green-500 text-white border-transparent"
                            : "hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        } transition-all duration-300`}
                        onClick={() => setSelectedSlot(`tomorrow-${slot}`)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                  <Input
                    placeholder={t.booking_form_name_placeholder}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-12 h-14 text-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                  <Input
                    placeholder={t.booking_form_phone_placeholder}
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", formatPhone(e.target.value))
                    }
                    className="pl-12 h-14 text-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                  <Input
                    placeholder={t.booking_form_amount_placeholder}
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    className="pl-12 h-14 text-lg"
                  />
                </div>

                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                  <Input
                    placeholder={t.booking_form_selected_time_placeholder}
                    value={selectedSlot ? selectedSlot.split("-")[1] : ""}
                    readOnly
                    className="pl-12 h-14 text-lg bg-neutral-50 dark:bg-neutral-800"
                  />
                </div>

                <Textarea
                  placeholder={t.booking_form_comment_placeholder}
                  value={formData.comment}
                  onChange={(e) => handleInputChange("comment", e.target.value)}
                  className="min-h-[120px] resize-none text-lg p-4"
                />
              </div>

              <div className="text-center space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedSlot}
                  className="w-full h-16 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg font-bold shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t.booking_form_submitting}
                    </div>
                  ) : (
                    <>
                      <CalendarDays className="mr-2 h-6 w-6" />
                      {t.booking_form_submit_button}
                    </>
                  )}
                </Button>

                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {t.booking_form_submit_hint}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center text-2xl">
              {t.booking_success_title}
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              {t.booking_success_desc}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <div className="font-semibold text-neutral-900 dark:text-white mb-2">
                {t.booking_success_details_title}
              </div>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>{t.booking_success_name_label}</span>
                  <span className="font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.booking_success_phone_label}</span>
                  <span className="font-semibold">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.booking_success_time_label}</span>
                  <span className="font-semibold">
                    {selectedSlot.split("-")[1]}
                  </span>
                </div>
                {formData.amount && (
                  <div className="flex justify-between">
                    <span>{t.booking_success_amount_label}</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formData.amount}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold mb-2">
                <Zap className="h-4 w-4" />
                {t.booking_success_next_steps}
              </div>
              <ul className="space-y-2 text-blue-700 dark:text-blue-400 text-xs">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  {t.booking_success_step1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  {t.booking_success_step2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  {t.booking_success_step3}
                </li>
              </ul>
            </div>
          </div>

          <Button
            onClick={handleDialogClose}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
          >
            {t.booking_success_close}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
