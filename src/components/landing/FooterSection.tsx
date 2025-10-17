"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Calculator,
  FileText,
  CheckCircle,
  Star,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { dict } from "@/lib/dictionary";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function FooterSection() {
  const { lang } = useApp();
  const t = dict[lang];

  const companyInfo = {
    name: t.footer_company_name,
    description: t.footer_company_desc,
    bin: t.footer_bin,
    founded: t.footer_founded_year,
  };

  const contactInfo = {
    phone: "+7 (###) ###-##-##",
    email: "###@garantipoteki.kz",
    address: t.footer_address_short,
    hours:
      lang === "ru"
        ? "Пн-Пт: 9:00-18:00, Сб: 10:00-16:00"
        : "Дс-Жм: 9:00-18:00, Сб: 10:00-16:00",
  };

  const usefulLinks = [
    {
      icon: Calculator,
      name: t.footer_link1,
      href: "#booking",
    },
    {
      icon: CheckCircle,
      name: t.footer_link2,
      href: "#quiz",
    },
    {
      icon: FileText,
      name: t.footer_link3,
      href: "#faq",
    },
    {
      icon: Star,
      name: t.footer_link4,
      href: "#reviews",
    },
  ];

  const documents = [
    {
      name: t.footer_doc1,
      href: "/consent",
    },
    {
      name: t.footer_doc2,
      href: "/consent",
    },
    {
      name: t.footer_doc3,
      href: "/consent",
    },
    {
      name: t.footer_doc4,
      href: "/rules",
    },
  ];

  const trustBadges = [
    {
      icon: Award,
      text: t.footer_trust2.replace("{{year}}", companyInfo.founded),
    },
    { icon: Clock, text: t.footer_trust3 },
  ];

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
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white">
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Колонка 1: О компании */}
            <div className="space-y-6 min-h-[300px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Гарант Ипотеки"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-white truncate">
                      Гарант Ипотеки
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {lang === "ru"
                        ? "Профессиональное кредитное сопровождение"
                        : "Кәсіби несиелік қолдау"}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {companyInfo.description}
                </p>
                <div className="space-y-2">
                  <p className="text-neutral-400 text-sm font-medium">
                    {companyInfo.name}
                  </p>
                  <p className="text-neutral-500 text-xs">{companyInfo.bin}</p>
                </div>
              </div>

              <div className="space-y-3">
                {trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <badge.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-neutral-300 text-sm">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Колонка 2: Контакты */}
            <div className="space-y-6 min-h-[300px]">
              <h4 className="font-semibold text-white text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-400" />
                {t.footer_contact_title}
              </h4>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {contactInfo.phone}
                      </p>
                      <p className="text-neutral-400 text-xs">
                        {t.footer_phone_label}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {contactInfo.email}
                      </p>
                      <p className="text-neutral-400 text-xs">
                        {t.footer_email_label}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  {/* График работы */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium mb-2">
                        {t.footer_hours_label}
                      </p>
                      <div className="space-y-1 text-neutral-400 text-xs">
                        <div className="flex justify-between">
                          <span>
                            {lang === "ru" ? "Будни" : "Дүйсенбі-Жұма"}
                          </span>
                          <span className="text-white">10:00–19:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang === "ru" ? "Суббота" : "Сенбі"}</span>
                          <span className="text-white">10:00–17:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="mr-3">
                            {lang === "ru" ? "Воскресенье " : "Жексенбі "}
                          </span>
                          <span className="text-red-400">
                            {lang === "ru" ? "Выходной" : "Демалыс"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Адреса офисов */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium mb-2">
                        {t.footer_address_label}
                      </p>
                      <div className="space-y-2 text-neutral-400 text-xs">
                        {/* Офис 1 */}
                        <div className="flex items-start gap-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-500/20 text-blue-300 border-blue-400 text-[10px] px-1 h-4"
                          >
                            1
                          </Badge>
                          <div>
                            <p className="text-white text-xs">
                              {lang === "ru"
                                ? "Проспект Бауыржан Момышулы, 2/52 этаж"
                                : "Бауыржан Момышулы даңғылы, 2/52 қабат"}
                            </p>
                          </div>
                        </div>

                        {/* Офис 2 */}
                        <div className="flex items-start gap-2">
                          <Badge
                            variant="outline"
                            className="bg-green-500/20 text-green-300 border-green-400 text-[10px] px-1 h-4"
                          >
                            2
                          </Badge>
                          <div>
                            <p className="text-white text-xs">
                              {lang === "ru"
                                ? "Улица Сыганак, 54а, 112 офис; 1 этаж"
                                : "Сығанақ көшесі, 54а, 112 офис; 1 қабат"}
                            </p>
                          </div>
                        </div>

                        {/* Офис 3 */}
                        <div className="flex items-start gap-2">
                          <Badge
                            variant="outline"
                            className="bg-purple-500/20 text-purple-300 border-purple-400 text-[10px] px-1 h-4"
                          >
                            3
                          </Badge>
                          <div>
                            <p className="text-white text-xs">
                              {lang === "ru"
                                ? "Проспект Богенбай батыра, 56а, 703 офис; 7 этаж"
                                : "Бөгенбай батыр даңғылы, 56а, 703 офис; 7 қабат"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={scrollToBooking}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold min-h-[44px]"
              >
                <Phone className="mr-2 h-4 w-4" />
                {t.footer_cta_button}
              </Button>
            </div>

            {/* Колонка 3: Полезное */}
            <div className="space-y-6 min-h-[250px]">
              <h4 className="font-semibold text-white text-lg">
                {t.footer_useful_title}
              </h4>

              <div className="space-y-3">
                {usefulLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center gap-3 group text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-800/50"
                  >
                    <link.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 flex-shrink-0" />
                    <span className="text-sm truncate">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Колонка 4: Документы */}
            <div className="space-y-6 min-h-[250px]">
              <h4 className="font-semibold text-white text-lg">
                {t.footer_docs_title}
              </h4>

              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.href}
                    className="block text-neutral-400 hover:text-white text-sm py-1 hover:pl-2 truncate"
                  >
                    {doc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-neutral-400 text-sm">
                {t.footer_copyright.replace(
                  "{{year}}",
                  new Date().getFullYear().toString()
                )}
              </p>
              <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                {t.footer_disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}