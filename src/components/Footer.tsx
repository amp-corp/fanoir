"use client";

import { useLang } from "@/contexts/LangContext";
import Image from "next/image";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#C9A962]/20">
      {/* Trust bar */}
      <div className="border-b border-[#F8F8F8]/5 py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.footer.trustItems.map((item, i) => (
            <div key={i}>
              <p className="text-[#C9A962] text-sm tracking-wider mb-1">{item.label}</p>
              <p className="text-[#F8F8F8]/40 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <Image src="/logo.png" alt="FANOIR" width={100} height={33} className="h-6 w-auto mb-4" style={{ filter: "brightness(0) invert(1)" }} />
            <p className="text-[#F8F8F8]/40 text-sm leading-relaxed mb-4">
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#C9A962] text-xs tracking-[0.2em] mb-4 uppercase">{t.footer.contactLabel}</p>
            <div className="space-y-2">
              <a href="mailto:contact@fanoir.com" className="text-[#F8F8F8]/60 text-sm hover:text-[#C9A962] transition-colors block">
                contact@fanoir.com
              </a>
              <a href="https://instagram.com/fanoir.official" target="_blank" rel="noopener noreferrer" className="text-[#F8F8F8]/60 text-sm hover:text-[#C9A962] transition-colors block">
                @fanoir.official
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[#C9A962] text-xs tracking-[0.2em] mb-4 uppercase">{t.footer.linksLabel}</p>
            <div className="space-y-2">
              <a href="#about" className="text-[#F8F8F8]/60 text-sm hover:text-[#C9A962] transition-colors block">{t.nav.brand}</a>
              <a href="#values" className="text-[#F8F8F8]/60 text-sm hover:text-[#C9A962] transition-colors block">{t.nav.values}</a>
              <a href="#products" className="text-[#F8F8F8]/60 text-sm hover:text-[#C9A962] transition-colors block">{t.nav.products}</a>
              <a href="#story" className="text-[#F8F8F8]/60 text-sm hover:text-[#C9A962] transition-colors block">{t.nav.story}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F8F8F8]/5 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#4A4A4A]/50 text-xs">
            &copy; {new Date().getFullYear()} FANOIR. {t.footer.copyright}
          </p>
          <p className="text-[#4A4A4A]/40 text-xs">
            {t.footer.business}
          </p>
        </div>
      </div>
    </footer>
  );
}
