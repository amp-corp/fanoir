'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLang } from '@/contexts/LangContext';
import { useDotButton } from '@/hooks/useEmblaDots';

export default function Identity({
  signatureImage1,
  signatureImage2,
}: {
  products?: unknown;
  signatureImage1?: string;
  signatureImage2?: string;
}) {
  const { t, localePath } = useLang();

  const sliderImages = [signatureImage1, signatureImage2].filter(Boolean);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const { selectedIndex, scrollSnaps, onDotClick } = useDotButton(emblaApi);

  const scrollImages = ['/brand/04.jpg', '/brand/05.jpg', '/brand/06.jpg'];

  return (
    <section id="identity">
      {/* sec-comment — Brand Story */}
      <div className="py-40 md:py-72">
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

        {/* Row 2: 2-column (left: Embla slider, right: product CTA card) */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Embla slider */}
          <div className="relative aspect-square overflow-hidden">
            {sliderImages.length > 0 && (
              <>
                <div ref={emblaRef} className="absolute inset-0">
                  <div className="flex h-full">
                    {sliderImages.map((src, i) => (
                      <div
                        key={i}
                        className="relative flex-[0_0_100%] min-w-0 h-full select-none"
                      >
                        <Image
                          src={src!}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {scrollSnaps.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {scrollSnaps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => onDotClick(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          selectedIndex === i ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right: product CTA card */}
          <div className="relative aspect-square flex items-center justify-center bg-[#F5F5F0] overflow-hidden">
            <div className="relative z-10 flex flex-col items-start gap-4 px-8 md:px-14 max-w-md">
              <p className="text-[#3D3D3D] text-lg md:text-2xl font-bold leading-snug whitespace-pre-line">
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
