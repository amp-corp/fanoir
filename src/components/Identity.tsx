'use client';

import { useLang } from '@/contexts/LangContext';

export default function Identity() {
  const { t, localePath } = useLang();

  const cards = [
    {
      icon: 'favorite',
      title: t.identity.meaningTitle,
      desc: t.identity.meaningDesc,
    },
    {
      icon: 'stars',
      title: t.identity.roleTitle,
      desc: t.identity.roleDesc,
    },
    {
      icon: 'visibility',
      title: t.identity.visionTitle,
      desc: t.identity.visionDesc,
    },
  ];

  return (
    <section id="identity" className="bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-[#caa963] uppercase mb-4">
            {t.identity.label}
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-[#1e1b14] tracking-tight mb-6 leading-tight">
            {t.identity.title}
          </h2>
          <p className="text-[#6b6355] leading-relaxed">{t.identity.desc}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative bg-white border border-[#e8e0d4] rounded-2xl p-8 hover:border-[#caa963]/40 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Decorative hover circle */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#caa963]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#f5f0e8] ring-1 ring-[#caa963]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#caa963] text-xl!">
                    {card.icon}
                  </span>
                </div>
              </div>

              {/* Gold separator */}
              <div className="w-8 h-0.5 bg-linear-to-r from-[#caa963] to-transparent mb-5" />

              <h3 className="relative z-10 text-[#1e1b14] text-lg font-semibold mb-3 tracking-wide">
                {card.title}
              </h3>
              <p className="relative z-10 text-[#8a8070] text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Join CTA - Image background card */}
        <div className="relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/identity-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e1b14]/90 via-[#1e1b14]/75 to-[#1e1b14]/30" />

          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#caa963] text-base!">
                  diamond
                </span>
                <span className="text-xs tracking-[0.3em] text-[#caa963] uppercase">
                  {t.identity.noirMovement}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#F8F8F8] mb-4 tracking-tight">
                {t.identity.joinTitle}
              </h3>
              <p className="text-[#beb39d] mb-8 leading-relaxed">
                {t.identity.joinDesc}
              </p>
              <a
                href={localePath('/collection')}
                className="inline-flex items-center gap-2 bg-[#caa963] text-[#1e1b14] px-7 py-3.5 text-sm tracking-wider font-bold hover:bg-[#d4b975] transition-colors rounded-full"
              >
                {t.identity.joinCta}
                <span className="material-symbols-outlined text-lg!">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
