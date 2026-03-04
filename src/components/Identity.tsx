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
    <section id="identity" className="bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-[#222222] uppercase mb-4">
            {t.identity.label}
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-[#3D3D3D] tracking-tight mb-6 leading-tight">
            {t.identity.title}
          </h2>
          <p className="text-[#666666] leading-relaxed">{t.identity.desc}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative bg-white border border-[#E0E0E0] rounded-2xl p-8 hover:border-[#222222]/40 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Decorative hover circle */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#222222]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] ring-1 ring-[#222222]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#222222] text-xl!">
                    {card.icon}
                  </span>
                </div>
              </div>

              {/* Gold separator */}
              <div className="w-8 h-0.5 bg-linear-to-r from-[#222222] to-transparent mb-5" />

              <h3 className="relative z-10 text-[#3D3D3D] text-lg font-semibold mb-3 tracking-wide">
                {card.title}
              </h3>
              <p className="relative z-10 text-[#888888] text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Join CTA - Image background card */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" />
          <div className="absolute inset-0 bg-linear-to-r from-[#222222] via-[#444444] to-[#555555]" />

          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-white text-base!">
                  diamond
                </span>
                <span className="text-xs tracking-[0.3em] text-white/90 uppercase">
                  {t.identity.noirMovement}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                {t.identity.joinTitle}
              </h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                {t.identity.joinDesc}
              </p>
              <a
                href={localePath('/products')}
                className="inline-flex items-center gap-2 bg-white text-[#222222] px-7 py-3.5 text-sm tracking-wider font-bold hover:bg-[#F5F5F5] transition-colors rounded-full"
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
