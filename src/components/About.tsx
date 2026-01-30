"use client";

import { useLang } from "@/contexts/LangContext";

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="bg-[#F8F8F8] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-4 uppercase">
            About FANOIR
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-wider mb-6 leading-tight">
            {t.about.title}
          </h2>
          <div className="w-12 h-px bg-[#C9A962] mb-8" />
          <p className="text-[#C9A962] text-lg tracking-widest mb-4">
            {t.about.meaning}
          </p>
          <p className="text-[#4A4A4A] leading-relaxed text-lg">
            {t.about.desc1}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div className="relative pl-8 border-l-2 border-[#C9A962]/30">
            <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-4">
              {t.about.mission}
            </p>
            <p className="text-2xl md:text-3xl font-light text-[#1A1A1A] mb-4 leading-snug">
              &ldquo;{t.about.missionText}&rdquo;
            </p>
            <p className="text-[#4A4A4A] leading-relaxed">
              {t.about.missionDesc}
            </p>
          </div>
          <div className="relative pl-8 border-l-2 border-[#C9A962]/30">
            <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-4">
              {t.about.vision}
            </p>
            <p className="text-2xl md:text-3xl font-light text-[#1A1A1A] mb-4 leading-snug">
              &ldquo;{t.about.visionText}&rdquo;
            </p>
            <p className="text-[#4A4A4A] leading-relaxed">
              {t.about.visionDesc}
            </p>
          </div>
        </div>

        {/* Persona & Target */}
        <div className="bg-[#1A1A1A] p-10 md:p-16 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#C9A962]/60 via-[#C9A962]/20 to-transparent" />
          <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-6 uppercase">
            {t.about.personaLabel}
          </p>
          <blockquote className="text-xl md:text-2xl text-[#F8F8F8] font-light leading-relaxed mb-8 max-w-3xl">
            &ldquo;{t.about.persona}&rdquo;
          </blockquote>
          <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-[#F8F8F8]/10">
            <div>
              <p className="text-[#C9A962] text-sm tracking-wider mb-1">{t.about.targetAge}</p>
              <p className="text-[#F8F8F8]/70 text-sm">{t.about.targetAgeVal}</p>
            </div>
            <div>
              <p className="text-[#C9A962] text-sm tracking-wider mb-1">{t.about.targetRegion}</p>
              <p className="text-[#F8F8F8]/70 text-sm">{t.about.targetRegionVal}</p>
            </div>
            <div>
              <p className="text-[#C9A962] text-sm tracking-wider mb-1">{t.about.targetTrait}</p>
              <p className="text-[#F8F8F8]/70 text-sm">{t.about.targetTraitVal}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
