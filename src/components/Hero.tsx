'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';
import { useSwipe } from '@/hooks/useSwipe';

const SLIDE_INTERVAL = 5000;

const MQ = '(max-width: 767px)';
function subscribeMQ(cb: () => void) {
  const mql = window.matchMedia(MQ);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
}
function getSnapshotMQ() {
  return window.matchMedia(MQ).matches;
}
function getServerSnapshotMQ() {
  return false;
}

// Raw image pairs (desktop shows 2 per slide, mobile shows 1 per slide)
const IMAGE_PAIRS: [string, string][] = [
  ['/brand/00.jpg', '/brand/10.jpg'],
  ['/brand/01.jpg', '/brand/02.jpg'],
  ['/brand/03.jpg', '/brand/07.jpg'],
];

const DESKTOP_SLIDES = IMAGE_PAIRS.map((pair) => pair);
const MOBILE_SLIDES = IMAGE_PAIRS.flat().map((src) => [src]);

export default function Hero() {
  const { t } = useLang();
  const isMobile = useSyncExternalStore(subscribeMQ, getSnapshotMQ, getServerSnapshotMQ);
  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  const [current, setCurrent] = useState(0);
  const safeIndex = current >= slides.length ? 0 : current;

  const goTo = useCallback((index: number) => setCurrent(index), []);
  const goPrev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    [slides.length],
  );
  const goNext = useCallback(
    () => setCurrent((p) => (p + 1) % slides.length),
    [slides.length],
  );
  const swipe = useSwipe(goPrev, goNext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full pt-16 overflow-hidden">
      <div
        className="relative w-full aspect-[3/4] md:aspect-[16/7] cursor-grab active:cursor-grabbing select-none"
        {...swipe}
      >
        {slides.map((images, i) => (
          <div
            key={`${isMobile ? 'm' : 'd'}-${i}`}
            className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
            style={{ opacity: safeIndex === i ? 1 : 0 }}
          >
            <div
              className={`grid h-full ${
                images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {images.map((src, j) => (
                <div key={j} className="relative w-full h-full overflow-hidden">
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
            )}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              safeIndex === i ? 'bg-[#222222]' : 'bg-[#222222]/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
