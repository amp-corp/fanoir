"use client";

import { LangProvider } from "@/contexts/LangContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </LangProvider>
  );
}
