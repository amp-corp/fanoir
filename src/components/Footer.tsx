"use client";

import { useLang } from "@/contexts/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#C9A962]/20 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-2">FANOIR</p>
        <p className="text-[#4A4A4A] text-xs tracking-wider mb-6">
          {t.footer.tagline}
        </p>
        <p className="text-[#4A4A4A]/50 text-xs">
          &copy; {new Date().getFullYear()} FANOIR. {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
