"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

const products = [
  {
    name: "Haute Couture Doll Fit",
    price: "$85",
    desc: "Hand-stitched velvet & lace ensemble",
    image: "/products/product-1.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    name: "Silk Lightstick Strap",
    price: "$45",
    desc: "Gold hardware finish with adjustable charm",
    image: "/products/product-2.jpg",
    badge: "Bestseller",
  },
  {
    name: "Midnight Velvet Scrunchie",
    price: "",
    desc: "Pure mulberry silk, gentle on hair",
    image: "/products/product-3.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Obsidian Pendant",
    price: "",
    desc: "Subtle fandom insignia, 14k gold plated",
    image: "/products/product-4.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Noir Palette",
    price: "",
    desc: "Essential shades for concert looks",
    image: "/products/product-5.jpg",
    aspect: "aspect-[4/5]",
    comingSoon: true,
  },
];

export default function Showcase() {
  const { t } = useLang();

  return (
    <section id="products" className="bg-[#1e1b14]">
      {/* Header */}
      <div className="w-full px-4 md:px-10 lg:px-40 py-12 md:py-20 flex flex-col items-center text-center">
        <h2 className="text-[#caa963] text-sm font-bold tracking-widest uppercase mb-4">
          {t.showcase.label}
        </h2>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl mb-6 text-[#F8F8F8]">
          {t.showcase.title}
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          {t.showcase.desc}
        </p>
      </div>

      {/* Editorial Grid */}
      <div className="w-full px-4 md:px-10 lg:px-20 pb-20 max-w-[1400px] mx-auto">
        {/* Row 1: Portrait + Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* Product 1: Large Portrait */}
          <div className="md:col-span-5 lg:col-span-4 group cursor-pointer">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl mb-4">
              <div className="absolute inset-0 bg-[#caa963]/0 group-hover:bg-[#caa963]/10 transition-colors duration-300 z-10" />
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${products[0].image}')` }}
              />
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-white bg-black/20 backdrop-blur-sm rounded-full p-2">
                  arrow_outward
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#F8F8F8] group-hover:text-[#caa963] transition-colors">
                  {products[0].name}
                </h3>
                <span className="text-slate-400 font-medium">{products[0].price}</span>
              </div>
              <p className="text-slate-400 text-sm">{products[0].desc}</p>
            </div>
          </div>

          {/* Product 2: Landscape Feature */}
          <div className="md:col-span-7 lg:col-span-8 group cursor-pointer flex flex-col h-full">
            <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-xl mb-4">
              <div className="absolute inset-0 bg-[#caa963]/0 group-hover:bg-[#caa963]/10 transition-colors duration-300 z-10" />
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${products[1].image}')` }}
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="bg-[#caa963] text-[#1e1b14] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Bestseller
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#F8F8F8] group-hover:text-[#caa963] transition-colors">
                  {products[1].name}
                </h3>
                <span className="text-slate-400 font-medium">{products[1].price}</span>
              </div>
              <p className="text-slate-400 text-sm">{products[1].desc}</p>
            </div>
          </div>
        </div>

        {/* Row 2: Three Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {products.slice(2).map((product, i) => (
            <div
              key={i}
              className={`group cursor-pointer${i === 2 ? " sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div
                className={`relative w-full ${
                  i === 2
                    ? "aspect-[4/5] sm:aspect-[2/1] lg:aspect-[4/5]"
                    : "aspect-[4/5]"
                } overflow-hidden rounded-xl mb-4`}
              >
                <div className="absolute inset-0 bg-[#caa963]/0 group-hover:bg-[#caa963]/10 transition-colors duration-300 z-10" />
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                {product.comingSoon && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-[#F8F8F8] group-hover:text-[#caa963] transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Pieces Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-900/50 rounded-2xl p-8 lg:p-12 border border-white/5">
          {/* Text content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#caa963]">
                <span className="material-symbols-outlined !text-xl">diamond</span>
                <span className="text-sm font-bold tracking-widest uppercase">
                  {t.showcase.signatureLabel}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight text-white">
                {t.showcase.signatureTitle}
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
                {t.showcase.signatureDesc}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#caa963] !text-xl">verified</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.showcase.feature1Title}</h4>
                  <p className="text-slate-500 text-xs">{t.showcase.feature1Desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#caa963] !text-xl">palette</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.showcase.feature2Title}</h4>
                  <p className="text-slate-500 text-xs">{t.showcase.feature2Desc}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4">
              <Link
                href="/collection"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#caa963] px-8 text-[#1e1b14] text-base font-bold transition-transform hover:scale-105 active:scale-95"
              >
                <span>{t.showcase.viewMore}</span>
                <span className="material-symbols-outlined ml-2 !text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Image grid */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="space-y-4 translate-y-8">
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('/products/signature-1.jpg')" }}
                />
              </div>
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center border border-white/5">
                <div className="text-center p-4">
                  <span className="block text-3xl font-black text-white mb-1">24</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest">
                    Karat Gold Plating
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#caa963]/10 flex items-center justify-center border border-[#caa963]/20">
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-4xl text-[#caa963] mb-2">
                    auto_awesome
                  </span>
                  <span className="block text-xs text-[#caa963] font-bold uppercase tracking-widest">
                    Premium Quality
                  </span>
                </div>
              </div>
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('/products/signature-2.jpg')" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Elevate CTA Section */}
        <div className="mt-20 lg:mt-32">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-900 px-6 py-20 text-center md:px-20 lg:py-24">
            {/* Background dot pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#caa963 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-2xl">
                {t.showcase.elevateTitle}
              </h2>
              <p className="text-slate-400 text-lg max-w-xl">
                {t.showcase.elevateDesc}
              </p>
              <Link
                href="/collection"
                className="mt-4 flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg bg-[#caa963] px-8 text-[#1e1b14] text-base font-bold transition-all hover:bg-white hover:text-black"
              >
                {t.showcase.shopNow}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
