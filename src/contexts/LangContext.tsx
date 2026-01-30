"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type Locale, translations } from "@/lib/i18n";

type LangContextType = {
  locale: Locale;
  t: (typeof translations)[Locale];
  toggle: () => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ko");
  const toggle = () => setLocale((l) => (l === "ko" ? "en" : "ko"));
  const t = translations[locale];

  return (
    <LangContext.Provider value={{ locale, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
