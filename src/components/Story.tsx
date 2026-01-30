"use client";

import { useLang } from "@/contexts/LangContext";

export default function Story() {
  const { t } = useLang();

  return (
    <section id="story" className="bg-[#1A1A1A] py-24 md:py-36 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,169,98,0.06)_0%,_transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-4 uppercase">
            Our Story
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-[#F8F8F8] tracking-wider mb-6">
            {t.story.title}
          </h2>
          <div className="w-12 h-px bg-[#C9A962] mx-auto" />
        </div>

        {/* Timeline-style narrative */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#C9A962]/20 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-20">
            {/* Origin */}
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="md:text-right mb-6 md:mb-0">
                <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-3">{t.story.originLabel}</p>
                <p className="text-xl md:text-2xl text-[#F8F8F8] font-light leading-relaxed">
                  {t.story.p1}
                </p>
              </div>
              <div className="md:pl-16">
                <p className="text-[#F8F8F8]/50 leading-relaxed">
                  {t.story.p2}
                </p>
              </div>
            </div>

            {/* Philosophy */}
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="md:text-right mb-6 md:mb-0 md:order-2">
                <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-3">{t.story.philLabel}</p>
                <p className="text-xl md:text-2xl text-[#F8F8F8] font-light leading-relaxed">
                  {t.story.p3}
                </p>
              </div>
              <div className="md:pr-16 md:order-1">
                <p className="text-[#F8F8F8]/50 leading-relaxed">
                  {t.story.p3detail}
                </p>
              </div>
            </div>

            {/* Promise */}
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="md:text-right mb-6 md:mb-0">
                <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-3">{t.story.promiseLabel}</p>
                <p className="text-xl md:text-2xl text-[#F8F8F8] font-light leading-relaxed">
                  {t.story.p5}
                </p>
              </div>
              <div className="md:pl-16">
                <p className="text-[#F8F8F8]/50 leading-relaxed">
                  {t.story.p5detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing quote */}
        <div className="text-center mt-24 pt-16 border-t border-[#C9A962]/10">
          <p className="text-2xl md:text-3xl text-[#C9A962] font-light tracking-wide leading-relaxed">
            &ldquo;{t.story.p4}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
