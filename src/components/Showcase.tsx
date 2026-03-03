'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import type { ProductForDisplay } from '@/lib/db-queries';

export default function Showcase({
  products,
  signatureImage1,
  signatureImage2,
}: {
  products: ProductForDisplay[];
  signatureImage1?: string;
  signatureImage2?: string;
}) {
  const { t, localePath } = useLang();
  const filters = t.collection.filters;

  // Take up to 6 products for the grid
  const gridProducts = products.slice(0, 6);

  // Signature images: use dedicated images if set, fallback to top 2 product images
  const sigImg1 = signatureImage1 || products[0]?.image;
  const sigImg2 = signatureImage2 || products[1]?.image;

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

      {/* 6-Product Square Grid: 2×3 mobile, 3×2 desktop */}
      <div className="w-full px-4 md:px-10 lg:px-20 pb-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {gridProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f5f0e8]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#caa963]/0 group-hover:bg-[#caa963]/10 transition-colors duration-300 z-10" />
                {product.badgeText && (
                  <div
                    className="absolute top-3 left-3 z-20 text-white text-[10px] font-bold px-2 py-1 rounded"
                    style={{ backgroundColor: product.badgeColor?.match(/^bg-\[(.+)\]$/)?.[1] || '#d0b476' }}
                  >
                    {product.badgeText}
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-base md:text-lg font-bold text-[#1e1b14] group-hover:text-[#caa963] transition-colors truncate pr-2">
                    {product.name}
                  </h3>
                  <span className="text-[#8a8070] font-medium text-sm shrink-0">
                    {product.price}
                  </span>
                </div>
                <p className="text-[#8a8070] text-xs">
                  {filters[product.category as keyof typeof filters] || product.category}
                </p>
              </div>
            </div>
          ))}
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
              {sigImg1 && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={sigImg1}
                    alt="Signature"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
              )}
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
              {sigImg2 && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={sigImg2}
                    alt="Signature"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
              )}
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
