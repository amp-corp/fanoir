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
      </div>
    </section>
  );
}
