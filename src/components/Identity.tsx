'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';
import { useSwipe } from '@/hooks/useSwipe';
import type { ProductForDisplay } from '@/lib/db-queries';

const GALLERY_SLIDE_INTERVAL = 4000;

export default function Identity({
  products,
  signatureImage1,
  signatureImage2,
}: {
  products: ProductForDisplay[];
  signatureImage1?: string;
  signatureImage2?: string;
}) {
  const { t, localePath } = useLang();
  const spotlight = products[0];
  const [gallerySlide, setGallerySlide] = useState(0);

  // Free-scroll row images
  const scrollImages = ['/brand/04.jpg', '/brand/05.jpg', '/brand/06.jpg'];

  // Left-column slider images
  const sliderImages = [signatureImage1, signatureImage2];

  const goToSlide = useCallback((i: number) => setGallerySlide(i), []);
  const slidePrev = useCallback(
    () => setGallerySlide((p) => (p - 1 + sliderImages.length) % sliderImages.length),
    [sliderImages.length],
  );
  const slideNext = useCallback(
    () => setGallerySlide((p) => (p + 1) % sliderImages.length),
    [sliderImages.length],
  );
  const swipe = useSwipe(slidePrev, slideNext);

  useEffect(() => {
    const timer = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % sliderImages.length);
    }, GALLERY_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <section id="identity">
      {/* sec-comment — Brand Story */}
      <div className="py-56 md:py-72">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#666666] text-base md:text-lg font-bold leading-[1.8] mb-3">
            {t.identity.storyLine1}
          </p>
          <p className="text-[#666666] text-sm md:text-base leading-[1.8] mb-3">
            {t.identity.storyLine2}
          </p>
          <p className="text-[#666666] text-sm md:text-base leading-[1.8] mb-3">
            {t.identity.storyLine3}
          </p>
        </div>
      </div>

      {/* sec-place — Visual Gallery */}
      <div>
        {/* Row 1: Horizontal free-scroll gallery */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-0">
            {scrollImages.map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-[80vw] md:w-[33.333vw] aspect-square relative"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: 2-column (left: image fade slider + dots, right: product CTA card) */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: fade slider */}
          <div
            className="relative aspect-square overflow-hidden cursor-grab active:cursor-grabbing select-none"
            {...swipe}
          >
            {sliderImages.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
                style={{ opacity: gallerySlide === i ? 1 : 0 }}
              >
                <Image
                  src={src || ''}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {sliderImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    gallerySlide === i ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: product CTA card */}
          <div className="relative aspect-square flex items-center justify-center bg-[#F5F5F0] overflow-hidden">
            <div className="relative z-10 flex flex-col items-start gap-4 px-10 md:px-14 max-w-md">
              <p className="text-[#3D3D3D] text-xl md:text-2xl font-bold leading-snug whitespace-pre-line">
                {t.identity.spotlightDesc}
              </p>
              <a
                href={localePath('/products')}
                className="inline-flex items-center gap-3 mt-2 text-sm font-medium text-[#222222] group"
              >
                <span>{t.identity.spotlightCta}</span>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#222222] group-hover:bg-[#222222] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-lg!">
                    arrow_forward
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
