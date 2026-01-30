"use client";

import { useLang } from "@/contexts/LangContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#1A1A1A] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,98,0.08)_0%,_transparent_70%)]" />

      <div className="relative text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-[0.4em] font-extralight text-[#C9A962] mb-8">
          FANOIR
        </h1>
        <p className="text-xl md:text-2xl text-[#F8F8F8] font-light tracking-widest mb-4">
          {t.hero.slogan}
        </p>
        <p className="text-sm md:text-base text-[#4A4A4A] tracking-wider mb-12">
          {t.hero.sub}
        </p>
        <a
          href="#about"
          className="inline-block border border-[#C9A962]/50 text-[#C9A962] px-8 py-3 text-sm tracking-widest hover:bg-[#C9A962]/10 transition-colors"
        >
          {t.hero.cta}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A962]/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
