'use client';

import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLang } from '@/contexts/LangContext';
import { useDotButton } from '@/hooks/useEmblaDots';
import type { CollectionForDisplay } from '@/lib/db-queries';

export default function CollectionBannerSlider({
  collections,
}: {
  collections: CollectionForDisplay[];
}) {
  const { t, localePath } = useLang();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: collections.length > 2,
      align: 'start',
      slidesToScroll: 'auto',
    },
    collections.length > 2
      ? [Autoplay({ delay: 4000, stopOnInteraction: false })]
      : [],
  );
  const { selectedIndex, scrollSnaps, onDotClick } = useDotButton(emblaApi);

  // 2 or fewer — static grid, no slider
  if (collections.length <= 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {collections.map((banner, i) => (
          <BannerCard
            key={banner.slug}
            banner={banner}
            index={i}
            localePath={localePath}
            ctaText={t.collection.to}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 md:gap-6">
          {collections.map((banner, i) => (
            <div
              key={banner.slug}
              className="flex-[0_0_85%] md:flex-[0_0_calc(50%-12px)]"
            >
              <BannerCard
                banner={banner}
                index={i}
                localePath={localePath}
                ctaText={t.collection.to}
              />
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className={`size-2 rounded-full transition-colors ${
                selectedIndex === i ? 'bg-[#222222]' : 'bg-[#E0E0E0]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BannerCard({
  banner,
  localePath,
  ctaText,
}: {
  banner: CollectionForDisplay;
  index: number;
  localePath: (path: string) => string;
  ctaText: string;
}) {
  const labelStyle = 'bg-white/20 backdrop-blur-md text-white';

  return (
    <div className="group relative overflow-hidden rounded-xl bg-[#F5F5F5] aspect-[16/9] md:aspect-[21/9] pointer-events-none [&_a]:pointer-events-auto">
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        sizes="(max-width: 768px) 85vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 md:p-8 flex flex-col gap-1.5 md:gap-2">
        <span
          className={`${labelStyle} text-[10px] md:text-xs font-bold px-2 py-1 rounded w-fit uppercase tracking-wider`}
        >
          {banner.label}
        </span>
        <h3 className="text-white text-lg md:text-2xl lg:text-3xl font-bold italic">
          {banner.title}
        </h3>
        <p className="text-gray-200 text-xs md:text-sm lg:text-base max-w-md line-clamp-2">
          {banner.desc}
        </p>
        <Link
          href={localePath(`/collection/${banner.slug}`)}
          className="mt-2 md:mt-4 bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-[#222222] hover:text-white transition-all w-fit"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
