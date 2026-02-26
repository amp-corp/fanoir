"use client";

import { LangProvider } from "@/contexts/LangContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/i18n";

export default function ClientLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LangProvider locale={locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LangProvider>
  );
}
