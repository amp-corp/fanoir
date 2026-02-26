'use client';

import { useLang } from '@/contexts/LangContext';

export default function Hero() {
  const { t, localePath } = useLang();

  return (
    <section className="flex-1 flex flex-col pt-16">
      <div className="flex-1 flex flex-col relative min-h-[calc(100vh-64px)] justify-center items-center overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#1e1b14]/80 bg-linear-to-t from-[#1e1b14] via-[#1e1b14]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-[960px] text-center gap-8">
          <div className="flex flex-col items-center gap-6">
            {/* Badge */}
            <span className="px-3 py-1 rounded-full border border-[#caa963]/30 bg-[#caa963]/10 text-[#caa963] text-xs font-bold uppercase tracking-widest">
              {t.hero.label}
            </span>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                {t.hero.title}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#caa963] to-[#e3cd96]">
                  {t.hero.titleAccent}
                </span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg lg:text-xl font-light">
                {t.hero.subtitle}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <a
              href={localePath('/#products')}
              className="group flex items-center justify-center rounded-full h-14 px-8 bg-[#caa963] text-[#1e1b14] text-sm font-bold leading-normal tracking-wide hover:bg-[#d4b975] transition-all transform hover:scale-105"
            >
              <span>{t.hero.cta1}</span>
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform text-xl">
                arrow_forward
              </span>
            </a>
            <a
              href={localePath('/#identity')}
              className="group flex items-center justify-center rounded-full h-14 px-8 bg-transparent border border-white/20 text-white text-sm font-bold leading-normal tracking-wide hover:bg-white/5 transition-all"
            >
              <span>{t.hero.cta2}</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">
            {t.hero.scroll}
          </span>
          <span className="material-symbols-outlined text-[#caa963]">
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </section>
  );
}
