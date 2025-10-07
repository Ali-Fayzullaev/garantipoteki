"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
  const { lang, setLang } = useApp();

  return (
    <div className="flex items-center ms-2 gap-2 p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
      <Languages className="h-4 w-4 text-neutral-500" />
      
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang("ru")}
          className={cn(
            "w-9 h-7 p-0 text-xs font-medium rounded transition-all duration-200",
            lang === "ru" 
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-200" 
              : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
          )}
          title="Русский"
        >
          🇷🇺
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang("kz")}
          className={cn(
            "w-9 h-7 p-0 text-xs font-medium rounded transition-all duration-200",
            lang === "kz" 
              ? "bg-green-50 dark:bg-green-900/20 text-green-600 border border-green-200" 
              : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
          )}
          title="Казахский"
        >
          🇰🇿
        </Button>
      </div>
    </div>
  );
}