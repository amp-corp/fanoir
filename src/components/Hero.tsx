'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLang } from '@/contexts/LangContext';
import { useDotButton } from '@/hooks/useEmblaDots';

const FALLBACK_PAIRS: [string, string][] = [
  ['/brand/00.jpg', '/brand/011.png'],
  ['/brand/01.jpg', '/brand/02.jpg'],
  ['/brand/03.jpg', '/brand/07.jpg'],
];

export default function Hero({
  imagePairs,
}: {
  imagePairs?: [string, string][];
}) {
  const { t } = useLang();

  // Use DB images if available, otherwise fallback to hardcoded
  const pairs: [string, string][] =
    (imagePairs ?? []).filter(([a, b]) => a && b).length > 0
      ? (imagePairs!.filter(([a, b]) => a && b) as [string, string][])
      : FALLBACK_PAIRS;

  const DESKTOP_SLIDES = pairs.map((pair) => pair);
  const MOBILE_SLIDES = pairs.flat().map((src) => [src]);

  // Determine mobile after mount only — avoids hydration mismatch
  const [state, setState] = useState({ mobile: false, mounted: false });

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = () => setState({ mobile: mql.matches, mounted: true });
    handler(); // sync initial value
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const { mobile: isMobile, mounted } = state;

  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  return (
    <section className="relative w-full pt-16 overflow-hidden">
      {mounted ? (
        <HeroCarousel
          slides={slides}
          isMobile={isMobile}
          heroTitle={t.hero.title}
          heroSubtitle={t.hero.subtitle}
        />
      ) : (
        // SSR / pre-mount: show first slide statically to avoid layout shift
        <div className="relative w-full aspect-square md:aspect-21/7">
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            {pairs[0].map((src, j) => (
              <div
                key={j}
                className="relative w-full h-full overflow-hidden md:block hidden first:block"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-end justify-start p-8 md:p-14">
            <div>
              <h1
                className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
              >
                {t.hero.title}
              </h1>
              <p
                className="text-white text-sm md:text-base lg:text-lg font-medium mt-2"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
              >
                {t.hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function HeroCarousel({
  slides,
  isMobile,
  heroTitle,
  heroSubtitle,
}: {
  slides: string[][];
  isMobile: boolean;
  heroTitle: string;
  heroSubtitle: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const { selectedIndex, scrollSnaps, onDotClick } = useDotButton(emblaApi);

  // Force Embla to reinit when slide structure changes (mobile <-> desktop)
  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, isMobile]);

  return (
    <>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((images, i) => (
            <div
              key={`${isMobile ? 'm' : 'd'}-${i}`}
              className="relative w-full aspect-square md:aspect-21/7 flex-[0_0_100%] min-w-0"
            >
              <div
                className={`grid h-full ${
                  images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {images.map((src, j) => (
                  <div
                    key={j}
                    className="relative w-full h-full overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      priority={i === 0 && j === 0}
                      sizes={images.length === 2 ? '50vw' : '100vw'}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {i === 0 && (
                <div className="absolute inset-0 flex items-end justify-start p-8 md:p-14">
                  <div>
                    <h1
                      className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                    >
                      {heroTitle}
                    </h1>
                    <p
                      className="text-white text-sm md:text-base lg:text-lg font-medium mt-2"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                    >
                      {heroSubtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              selectedIndex === i ? 'bg-[#222222]' : 'bg-[#222222]/30'
            }`}
          />
        ))}
      </div>
    </>
  );
}
