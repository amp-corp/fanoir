'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';
import { useSwipe } from '@/hooks/useSwipe';

const MOOD_SLIDE_INTERVAL = 5000;

export default function Showcase() {
  const { t, localePath } = useLang();
  const [moodSlide, setMoodSlide] = useState(0);

  const moodImages = ['/brand/09.jpg', '/brand/08.jpg'];

  const goToMoodSlide = useCallback((i: number) => setMoodSlide(i), []);
  const moodPrev = useCallback(
    () => setMoodSlide((p) => (p - 1 + moodImages.length) % moodImages.length),
    [moodImages.length],
  );
  const moodNext = useCallback(
    () => setMoodSlide((p) => (p + 1) % moodImages.length),
    [moodImages.length],
  );
  const swipe = useSwipe(moodPrev, moodNext);

  useEffect(() => {
    const timer = setInterval(() => {
      setMoodSlide((prev) => (prev + 1) % moodImages.length);
    }, MOOD_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [moodImages.length]);

  return (
    <section>
      {/* sec-main-brand — Brand Philosophy */}
      <div className="py-56 md:py-72">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Center: brand copy */}
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

      {/* sec-mood-banner — Full-width fade slider */}
      <div
        className="relative w-full aspect-[21/9] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        {...swipe}
      >
        {moodImages.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
            style={{ opacity: moodSlide === i ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        {moodImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {moodImages.map((_, i) => (
              <button
                key={i}
                onClick={() => goToMoodSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  moodSlide === i ? 'bg-[#222222]' : 'bg-[#222222]/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
