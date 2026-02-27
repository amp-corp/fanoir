'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import type { CollectionForDisplay } from '@/lib/db-queries';

const PER_PAGE = 2;

export default function CollectionBannerSlider({
  collections,
}: {
  collections: CollectionForDisplay[];
}) {
  const { localePath } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(collections.length / PER_PAGE);

  const scrollToPage = useCallback(
    (page: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const targetChild = el.children[page * PER_PAGE] as HTMLElement | undefined;
      if (!targetChild) return;
      el.scrollTo({ left: targetChild.offsetLeft, behavior: 'smooth' });
      setCurrentPage(page);
    },
    [],
  );

  // Auto-slide when there are multiple pages
  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => {
        const next = (prev + 1) % totalPages;
        scrollToPage(next);
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages, scrollToPage]);

  // Single page — static grid, no slider
  if (totalPages <= 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((banner, i) => (
          <BannerCard key={banner.slug} banner={banner} index={i} localePath={localePath} />
        ))}
      </div>
    );
  }

  // Multiple pages — scroll-snap slider with 2 per view
  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {collections.map((banner, i) => (
          <div key={banner.slug} className="snap-start shrink-0 w-[calc(50%-12px)]">
            <BannerCard banner={banner} index={i} localePath={localePath} />
          </div>
        ))}
      </div>
      {/* Dot navigation — per page */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className={`size-2 rounded-full transition-colors ${
              currentPage === i ? 'bg-[#d0b476]' : 'bg-[#e8e0d4]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function BannerCard({
  banner,
  index,
  localePath,
}: {
  banner: CollectionForDisplay;
  index: number;
  localePath: (path: string) => string;
}) {
  const labelStyle =
    index === 0
      ? 'bg-[#d0b476]/90 text-white'
      : 'bg-white/20 backdrop-blur-md text-white';

  return (
    <div className="group relative overflow-hidden rounded-xl bg-[#f5f0e8] aspect-video md:aspect-4/3 lg:aspect-16/7">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${banner.image}')` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-2">
        <span
          className={`${labelStyle} text-xs font-bold px-2 py-1 rounded w-fit uppercase tracking-wider`}
        >
          {banner.label}
        </span>
        <h3 className="text-white text-2xl md:text-3xl font-bold italic">
          {banner.title}
        </h3>
        <p className="text-gray-200 text-sm md:text-base max-w-md">
          {banner.desc}
        </p>
        <Link
          href={localePath(`/collection/${banner.slug}`)}
          className="mt-4 bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d0b476] hover:text-white transition-all w-fit"
        >
          {banner.cta}
        </Link>
      </div>
    </div>
  );
}
