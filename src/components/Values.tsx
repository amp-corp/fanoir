"use client";

import { useLang } from "@/contexts/LangContext";

const icons = [
  // Quality - diamond
  <svg key="q" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 3h12l4 7-10 11L2 10z" /><path d="M2 10h20" /></svg>,
  // Understanding - heart
  <svg key="u" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 21C12 21 3 13.5 3 8.5 3 5.42 5.42 3 8.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0117.5 3C20.58 3 23 5.42 23 8.5 23 13.5 12 21 12 21z" /></svg>,
  // Elegance - feather
  <svg key="e" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" /><path d="M16 8L2 22" /><path d="M17.5 15H9" /></svg>,
  // Trust - shield
  <svg key="t" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
];

export default function Values() {
  const { t } = useLang();

  const items = [
    { title: t.values.quality, desc: t.values.qualityDesc, detail: t.values.qualityDetail },
    { title: t.values.understanding, desc: t.values.understandingDesc, detail: t.values.understandingDetail },
    { title: t.values.elegance, desc: t.values.eleganceDesc, detail: t.values.eleganceDetail },
    { title: t.values.trust, desc: t.values.trustDesc, detail: t.values.trustDetail },
  ];

  return (
    <section id="values" className="bg-[#1A1A1A] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-4 uppercase">
            Core Values
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-[#F8F8F8] tracking-wider mb-6">
            {t.values.title}
          </h2>
          <div className="w-12 h-px bg-[#C9A962] mx-auto mb-6" />
          <p className="text-[#F8F8F8]/50 max-w-xl mx-auto leading-relaxed">
            {t.values.subtitle}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-[#C9A962]/10">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#1A1A1A] p-10 md:p-12 group hover:bg-[#1A1A1A]/80 transition-colors"
            >
              <div className="text-[#C9A962] mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                {icons[i]}
              </div>
              <h3 className="text-[#C9A962] tracking-[0.2em] text-sm mb-3 uppercase">
                {item.title}
              </h3>
              <p className="text-[#F8F8F8] text-lg font-light mb-3">
                {item.desc}
              </p>
              <p className="text-[#F8F8F8]/40 text-sm leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
