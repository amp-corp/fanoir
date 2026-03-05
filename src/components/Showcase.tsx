'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLang } from '@/contexts/LangContext';
import { useDotButton } from '@/hooks/useEmblaDots';

const FALLBACK_MOOD = ['/brand/09.jpg', '/brand/08.jpg'];

export default function Showcase({
  moodImages,
}: {
  moodImages?: string[];
}) {
  const { t, localePath } = useLang();

  const mood = (moodImages ?? []).filter(Boolean).length > 0
    ? moodImages!.filter(Boolean)
    : FALLBACK_MOOD;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const { selectedIndex, scrollSnaps, onDotClick } = useDotButton(emblaApi);

  return (
    <section>
      {/* sec-main-brand — Brand Philosophy */}
      <div className="py-56 md:py-72">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 text-center">
              <p className="text-[#3D3D3D] text-xl md:text-2xl font-bold leading-relaxed mb-6">
                {t.showcase.philosophyQuote}
              </p>
              <p className="text-[#666666] text-sm md:text-base leading-[1.8] mb-8">
                {t.showcase.philosophyDesc}
              </p>
              <a
                href={localePath('/products')}
                className="inline-block text-sm text-[#222222] font-medium border-b border-[#222222] pb-1 hover:opacity-70 transition-opacity"
              >
                {t.showcase.philosophyCta}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* sec-mood-banner — Full-width Embla slider */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {mood.map((src, i) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="100vw"
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
                  selectedIndex === i ? 'bg-[#222222]' : 'bg-[#222222]/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
