"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale, translations } from "@/lib/i18n";

type LangContextType = {
  locale: Locale;
  t: (typeof translations)[Locale];
  switchLocale: () => void;
  localePath: (path: string) => string;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = translations[locale];

  const switchLocale = () => {
    const other = locale === "ko" ? "en" : "ko";
    const newPath = pathname.replace(`/${locale}`, `/${other}`);
    router.push(newPath);
  };

  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <LangContext.Provider value={{ locale, t, switchLocale, localePath }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
