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
  // Take up to 6 products for the grid
  const gridProducts = products.slice(0, 6);

  // Signature images: use dedicated images if set, fallback to top 2 product images
  const sigImg1 = signatureImage1 || products[0]?.image;
  const sigImg2 = signatureImage2 || products[1]?.image;

  return (
    <section id="products" className="bg-[#FFFFFF]">
      {/* Header */}
      <div className="relative w-full px-4 md:px-8 lg:px-32 py-10 md:py-16 flex flex-col items-center text-center">
        <h2 className="text-[#FF6B6B] text-sm font-bold tracking-widest uppercase mb-4">
          {t.showcase.label}
        </h2>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-3xl mb-6 text-[#3D3D3D]">
          {t.showcase.title}
        </h1>
        <p className="text-[#666666] max-w-3xl leading-relaxed">
          {t.showcase.desc}
        </p>
        <div className="w-full px-4 md:px-10 lg:px-20 max-w-[1400px] mx-auto pt-14">
          <Link
            href={localePath('/products')}
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#FF6B6B] px-8 text-[#FF6B6B] text-base font-semibold transition-transform hover:scale-105 active:scale-95"
          >
            <span>{t.showcase.viewMore}</span>
          </Link>
        </div>
      </div>

      {/* 6-Product Square Grid: 2×3 mobile, 3×2 desktop */}
      <div className="w-full px-4 md:px-10 lg:px-20 pb-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {gridProducts.map((product) => {
            const isClickable = !product.comingSoon && !!product.link;
            const Wrapper = isClickable ? 'a' : 'div';
            const wrapperProps = isClickable
              ? {
                  href: product.link!,
                  target: '_blank' as const,
                  rel: 'noopener noreferrer',
                }
              : {};
            return (
              <Wrapper
                key={product.id}
                {...wrapperProps}
                className={`group block ${product.comingSoon ? 'cursor-not-allowed' : product.link ? 'cursor-pointer' : ''}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-[#FFF0F0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${product.comingSoon ? 'blur-md scale-105' : ''}`}
                  />
                  {product.comingSoon && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 rounded-xl">
                      <span className="text-white text-sm font-bold tracking-widest uppercase">
                        {t.showcase.comingSoon}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 transition-colors duration-300 z-10" />
                  {product.badgeText && (
                    <div
                      className="absolute top-3 left-3 z-20 text-white text-[10px] font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          product.badgeColor?.match(/^bg-\[(.+)\]$/)?.[1] ||
                          '#FF6B6B',
                      }}
                    >
                      {product.badgeText}
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base md:text-lg font-bold text-[#3D3D3D] group-hover:text-[#FF6B6B] transition-colors truncate pr-2">
                      {product.name}
                    </h3>
                    <span className="text-[#888888] font-medium text-sm shrink-0">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-[#888888] text-xs">
                    {product.categoryName}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* Signature Pieces Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-8 lg:p-12 border border-[#FFE0E0] shadow-sm">
          {/* Text content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#FF6B6B]">
                <span className="material-symbols-outlined text-xl!">
                  diamond
                </span>
                <span className="text-sm font-bold tracking-widest uppercase">
                  {t.showcase.signatureLabel}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight text-[#3D3D3D]">
                {t.showcase.signatureTitle}
              </h2>
              <p className="text-[#666666] text-base md:text-lg leading-relaxed max-w-md">
                {t.showcase.signatureDesc}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#FFF0F0] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#FF6B6B] text-xl!">
                    verified
                  </span>
                </div>
                <div>
                  <h4 className="text-[#3D3D3D] font-bold text-sm">
                    {t.showcase.feature1Title}
                  </h4>
                  <p className="text-[#888888] text-xs">
                    {t.showcase.feature1Desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#FFF0F0] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#FF6B6B] text-xl!">
                    palette
                  </span>
                </div>
                <div>
                  <h4 className="text-[#3D3D3D] font-bold text-sm">
                    {t.showcase.feature2Title}
                  </h4>
                  <p className="text-[#888888] text-xs">
                    {t.showcase.feature2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4">
              <Link
                href={localePath('/products')}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF6B6B] px-8 text-white text-base font-bold transition-transform hover:scale-105 active:scale-95"
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
                  <div className="absolute inset-0  transition-colors duration-500" />
                </div>
              )}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#FFF0F0] flex items-center justify-center border border-[#FFE0E0]">
                <div className="text-center p-4">
                  <span className="block text-3xl font-black text-[#FF6B6B] mb-1">
                    {t.showcase.karatValue}
                  </span>
                  <span className="text-xs text-[#FF6B6B] uppercase tracking-widest">
                    {t.showcase.karatLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#FF6B6B]/10 flex items-center justify-center border border-[#FF6B6B]/20">
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-4xl text-[#FF6B6B] mb-2">
                    auto_awesome
                  </span>
                  <span className="block text-xs text-[#FF6B6B] font-bold uppercase tracking-widest">
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
                  <div className="absolute inset-0  transition-colors duration-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
