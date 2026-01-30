"use client";

import { useLang } from "@/contexts/LangContext";

const placeholderIcons = [
  // Doll outfit
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-12 h-12"><circle cx="12" cy="6" r="3" /><path d="M7 10h10l-1 10H8L7 10z" /><path d="M9 10v-1a3 3 0 016 0v1" /></svg>,
  // Cheering - lightstick
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-12 h-12"><circle cx="12" cy="6" r="4" /><path d="M12 10v12" /><path d="M10 22h4" /><path d="M10 4l2-2 2 2" /></svg>,
  // Fashion - scrunchie/ring
  <svg key="f" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-12 h-12"><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="3" /><path d="M12 6c2 1 3 3 3 6s-1 5-3 6c-2-1-3-3-3-6s1-5 3-6z" /></svg>,
  // Upcoming - gift box
  <svg key="u" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-12 h-12"><rect x="3" y="10" width="18" height="11" rx="1" /><path d="M3 14h18" /><path d="M12 10v11" /><path d="M12 10c-2-2-4-4-2-5s4 1 2 5z" /><path d="M12 10c2-2 4-4 2-5s-4 1-2 5z" /></svg>,
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
              className="bg-white border border-[#1A1A1A]/5 group hover:border-[#C9A962]/30 transition-all hover:shadow-lg overflow-hidden"
            >
              {/* Placeholder image area */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#F0EDE8] to-[#E8E4DD] flex flex-col items-center justify-center">
                <div className="text-[#C9A962]/40 mb-3 group-hover:text-[#C9A962]/70 transition-colors">
                  {placeholderIcons[i]}
                </div>
                <p className="text-[#1A1A1A]/20 text-xs tracking-[0.2em] uppercase">
                  {t.products.comingSoonLabel}
                </p>
              </div>
              <div className="p-8">
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
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-[#4A4A4A] text-sm italic">
            {t.products.cta}
          </p>
        </div>
      </div>
    </section>
  );
}
