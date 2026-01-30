"use client";

import { useLang } from "@/contexts/LangContext";

const productIcons = [
  // Doll - teddy
  <svg key="d" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4" /><path d="M8 8a4 4 0 004 4 4 4 0 004-4" /><circle cx="9" cy="7" r="0.5" fill="currentColor" /><circle cx="15" cy="7" r="0.5" fill="currentColor" /><path d="M8 12v4a4 4 0 008 0v-4" /><circle cx="8" cy="5" r="2" /><circle cx="16" cy="5" r="2" /></svg>,
  // Cheering - star
  <svg key="c" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  // Fashion - sparkle
  <svg key="f" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" /><circle cx="12" cy="12" r="2" /></svg>,
  // Upcoming - arrow
  <svg key="u" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 5v14M5 12l7-7 7 7" /></svg>,
];

export default function Products() {
  const { t } = useLang();

  const items = [
    { title: t.products.dolls, desc: t.products.dollsDesc, detail: t.products.dollsDetail },
    { title: t.products.cheering, desc: t.products.cheeringDesc, detail: t.products.cheeringDetail },
    { title: t.products.fashion, desc: t.products.fashionDesc, detail: t.products.fashionDetail },
    { title: t.products.upcoming, desc: t.products.upcomingDesc, detail: t.products.upcomingDetail },
  ];

  return (
    <section id="products" className="bg-[#F8F8F8] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] text-[#C9A962] mb-4 uppercase">
            Product Lineup
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-wider mb-6">
            {t.products.title}
          </h2>
          <div className="w-12 h-px bg-[#C9A962] mx-auto mb-6" />
          <p className="text-[#4A4A4A] max-w-xl mx-auto leading-relaxed">
            {t.products.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#1A1A1A]/5 p-10 group hover:border-[#C9A962]/30 transition-all hover:shadow-lg"
            >
              <div className="text-[#C9A962] mb-5 opacity-60 group-hover:opacity-100 transition-opacity">
                {productIcons[i]}
              </div>
              <h3 className="text-[#1A1A1A] text-lg tracking-wider mb-2 font-medium">
                {item.title}
              </h3>
              <p className="text-[#C9A962] text-sm tracking-wide mb-3">
                {item.desc}
              </p>
              <p className="text-[#4A4A4A] text-sm leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[#4A4A4A] text-sm italic">
            {t.products.cta}
          </p>
        </div>
      </div>
    </section>
  );
}
