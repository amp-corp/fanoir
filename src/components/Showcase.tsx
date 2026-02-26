'use client';

import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

const productImages = [
  { image: '/products/product-1.jpg', aspect: 'aspect-3/4' },
  { image: '/products/product-2.jpg' },
  { image: '/products/product-3.jpg', aspect: 'aspect-4/5' },
  { image: '/products/product-4.jpg', aspect: 'aspect-4/5' },
  { image: '/products/product-5.jpg', aspect: 'aspect-4/5', comingSoon: true },
];

export default function Showcase() {
  const { t, localePath } = useLang();
  const products = t.showcase.products;

  return (
    <section id="products" className="bg-[#FAF8F5]">
      {/* Header */}
      <div className="w-full px-4 md:px-8 lg:px-32 py-10 md:py-16 flex flex-col items-center text-center">
        <h2 className="text-[#caa963] text-sm font-bold tracking-widest uppercase mb-4">
          {t.showcase.label}
        </h2>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-3xl mb-6 text-[#1e1b14]">
          {t.showcase.title}
        </h1>
        <p className="text-[#6b6355] max-w-3xl leading-relaxed">
          {t.showcase.desc}
        </p>
      </div>

      {/* Editorial Grid */}
      <div className="w-full px-4 md:px-10 lg:px-20 pb-20 max-w-[1400px] mx-auto">
        {/* Row 1: Portrait + Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* Product 1: Large Portrait */}
          <div className="md:col-span-5 lg:col-span-4 group cursor-pointer">
            <div className="relative w-full aspect-3/4 overflow-hidden rounded-xl mb-4">
              <div className="absolute inset-0 bg-[#caa963]/0 group-hover:bg-[#caa963]/10 transition-colors duration-300 z-10" />
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${productImages[0].image}')` }}
              />
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-white bg-black/20 backdrop-blur-sm rounded-full p-2">
                  arrow_outward
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#1e1b14] group-hover:text-[#caa963] transition-colors">
                  {products[0].name}
                </h3>
                <span className="text-[#8a8070] font-medium">
                  {products[0].price}
                </span>
              </div>
              <p className="text-[#8a8070] text-sm">{products[0].desc}</p>
            </div>
          </div>

          {/* Product 2: Landscape Feature */}
          <div className="md:col-span-7 lg:col-span-8 group cursor-pointer flex flex-col h-full">
            <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-xl mb-4">
              <div className="absolute inset-0 bg-[#caa963]/0 group-hover:bg-[#caa963]/10 transition-colors duration-300 z-10" />
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${productImages[1].image}')` }}
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="bg-[#caa963] text-[#1e1b14] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t.showcase.bestseller}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#1e1b14] group-hover:text-[#caa963] transition-colors">
                  {products[1].name}
                </h3>
                <span className="text-[#8a8070] font-medium">
                  {products[1].price}
                </span>
              </div>
              <p className="text-[#8a8070] text-sm">{products[1].desc}</p>
            </div>
          </div>
        </div>

        {/* Row 2: Three Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {productImages.slice(2).map((meta, i) => {
            const product = products[i + 2];
            return (
              <div
                key={i}
                className={`group cursor-pointer${i === 2 ? ' sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div
                  className={`relative w-full ${
                    i === 2
                      ? 'aspect-4/5 sm:aspect-2/1 lg:aspect-4/5'
                      : 'aspect-4/5'
                  } overflow-hidden rounded-xl mb-4`}
                >
                  <div className="absolute inset-0 bg-[#caa963]/0 group-hover:bg-[#caa963]/10 transition-colors duration-300 z-10" />
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${meta.image}')` }}
                  />
                  {meta.comingSoon && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                        {t.showcase.comingSoon}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-[#1e1b14] group-hover:text-[#caa963] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#8a8070] text-sm">{product.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Signature Pieces Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-8 lg:p-12 border border-[#e8e0d4] shadow-sm">
          {/* Text content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#caa963]">
                <span className="material-symbols-outlined text-xl!">
                  diamond
                </span>
                <span className="text-sm font-bold tracking-widest uppercase">
                  {t.showcase.signatureLabel}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight text-[#1e1b14]">
                {t.showcase.signatureTitle}
              </h2>
              <p className="text-[#6b6355] text-base md:text-lg leading-relaxed max-w-md">
                {t.showcase.signatureDesc}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#f5f0e8] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#caa963] text-xl!">
                    verified
                  </span>
                </div>
                <div>
                  <h4 className="text-[#1e1b14] font-bold text-sm">
                    {t.showcase.feature1Title}
                  </h4>
                  <p className="text-[#8a8070] text-xs">
                    {t.showcase.feature1Desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#f5f0e8] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#caa963] text-xl!">
                    palette
                  </span>
                </div>
                <div>
                  <h4 className="text-[#1e1b14] font-bold text-sm">
                    {t.showcase.feature2Title}
                  </h4>
                  <p className="text-[#8a8070] text-xs">
                    {t.showcase.feature2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4">
              <Link
                href={localePath('/collection')}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#caa963] px-8 text-[#1e1b14] text-base font-bold transition-transform hover:scale-105 active:scale-95"
              >
                <span>{t.showcase.viewMore}</span>
                <span className="material-symbols-outlined ml-2 text-lg!">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Image grid */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="space-y-4 translate-y-8">
              <div className="w-full aspect-3/4 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/products/signature-1.jpg')",
                  }}
                />
              </div>
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#f5f0e8] flex items-center justify-center border border-[#e8e0d4]">
                <div className="text-center p-4">
                  <span className="block text-3xl font-black text-[#1e1b14] mb-1">
                    {t.showcase.karatValue}
                  </span>
                  <span className="text-xs text-[#8a8070] uppercase tracking-widest">
                    {t.showcase.karatLabel}
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
                    {t.showcase.premiumQuality}
                  </span>
                </div>
              </div>
              <div className="w-full aspect-3/4 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/products/signature-2.jpg')",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Elevate CTA Section */}
        <div className="mt-20 lg:mt-32">
          <div className="relative overflow-hidden rounded-2xl bg-[#1e1b14] px-6 py-20 text-center md:px-20 lg:py-24">
            {/* Background dot pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(#caa963 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-2xl">
                {t.showcase.elevateTitle}
              </h2>
              <p className="text-[#beb39d] text-lg max-w-xl">
                {t.showcase.elevateDesc}
              </p>
              <Link
                href={localePath('/collection')}
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
