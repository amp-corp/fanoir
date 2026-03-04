'use client';

import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

export default function Hero({ heroImage }: { heroImage?: string }) {
  const { t, localePath } = useLang();

  const bgSrc = heroImage || '/hero-bg.jpg';

  return (
    <section className="flex-1 flex flex-col pt-16">
      <div className="flex-1 flex flex-col relative min-h-[calc(100vh-64px)] justify-center items-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 " />
        </div>

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center px-4 max-w-[960px] text-center gap-8"
          style={{ textShadow: '0 2px 8px rgba(15, 1, 1, 0.3)' }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Badge */}
            <span
              className="px-3 py-1 rounded-full  text-[#FF6B6B] text-xs font-bold uppercase tracking-widest"
              style={{ textShadow: 'none' }}
            >
              {t.hero.label}
            </span>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
                {t.hero.title} {t.hero.titleBefore}
                <span className="font-extrabold ">{t.hero.titleAccent}</span>
                {t.hero.titleAfter}
              </h1>
              <p
                className="text-white text-base md:text-lg lg:text-xl font-semibold  "
                style={{ textShadow: '0 2px 8px rgba(15, 1, 1, 0.3)' }}
              >
                {t.hero.subtitle}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
            style={{ textShadow: 'none' }}
          >
            <a
              href={localePath('/products')}
              className="group flex items-center justify-center rounded-full h-14 px-8 bg-[#FF6B6B] text-white text-sm font-bold leading-normal tracking-wide hover:bg-[#FF8585] transition-all transform hover:scale-105"
            >
              <span>{t.hero.cta1}</span>
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform text-xl">
                arrow_forward
              </span>
            </a>
            <a
              href={localePath('/#identity')}
              className="group flex items-center justify-center rounded-full h-14 px-8 bg-white text-[#FF6B6B] text-sm font-bold leading-normal tracking-wide hover:bg-white/90  transition-all"
            >
              <span>{t.hero.cta2}</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">
            {t.hero.scroll}
          </span>
          <span className="material-symbols-outlined text-white">
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </section>
  );
}
