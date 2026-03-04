'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useLang } from '@/contexts/LangContext';
import CollectionBannerSlider from './CollectionBannerSlider';
import type { ProductForDisplay, CollectionForDisplay, CategoryForDisplay } from '@/lib/db-queries';

const SORT_KEYS = ['newest', 'price-asc', 'price-desc'] as const;
type SortKey = (typeof SORT_KEYS)[number];

const PAGE_SIZE = 8;

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, '')) || 0;
}

export default function Products({
  products,
  collections,
  categories,
}: {
  products: ProductForDisplay[];
  collections: CollectionForDisplay[];
  categories: CategoryForDisplay[];
}) {
  const { t, localePath } = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = (searchParams.get('sort') as SortKey) || 'newest';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const allLabel = t.product.filters.all;
  const filterTabs = useMemo(() => [
    { key: 'all', name: allLabel },
    ...categories,
  ], [categories, allLabel]);
  const sortOptions = t.product.sortOptions;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === undefined) params.delete(key);
      else params.set(key, value);
    }
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  // Filter by canonical category key
  const filtered = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter((p) => p.category === activeFilter);
  }, [products, activeFilter]);

  // Sort
  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === 'price-asc')
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sort === 'price-desc')
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return list;
  }, [filtered, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleSort(key: SortKey) {
    setSortOpen(false);
    updateParams({ sort: key === 'newest' ? null : key, page: null });
  }

  function handlePage(p: number) {
    updateParams({ page: p <= 1 ? null : String(p) });
  }

  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  return (
    <section className="bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-12 py-24 flex flex-col gap-10">
        {/* Featured Collaborations */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
              {t.product.title}
            </h2>
            <Link
              href={localePath('/collection')}
              className="text-sm font-medium text-[#FF6B6B] hover:text-[#FF6B6B]/80 flex items-center gap-1"
            >
              {t.collection.viewMore}
              <span className="material-symbols-outlined text-[16px]!">
                arrow_forward
              </span>
            </Link>
          </div>

          <CollectionBannerSlider collections={collections} />
        </div>

        {/* Filter & Sort Bar */}
        <div className="sticky top-[73px] z-40 bg-[#FFFFFF]/95 backdrop-blur-md py-4 border-b border-[#FFE0E0]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveFilter(tab.key);
                    updateParams({ page: null });
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeFilter === tab.key
                      ? 'bg-[#FF6B6B] text-white'
                      : 'bg-[#FFF0F0] text-[#666666] hover:bg-[#FFE0E0]'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative flex items-center gap-3" ref={sortRef}>
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFF0F0] rounded-lg text-sm font-medium text-[#666666]"
              >
                <span className="material-symbols-outlined text-[18px]!">
                  sort
                </span>
                <span>
                  {t.product.sortPrefix}: {sortOptions[sort]}
                </span>
                <span className="material-symbols-outlined text-[18px]!">
                  {sortOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {sortOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-[#FFE0E0] py-1 min-w-[180px] z-50">
                  {SORT_KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleSort(key)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sort === key
                          ? 'bg-[#FFF0F0] text-[#FF6B6B] font-semibold'
                          : 'text-[#666666] hover:bg-[#FFFFFF]'
                      }`}
                    >
                      {sortOptions[key]}
                    </button>
                  ))}
                </div>
              )}

              <button className="flex md:hidden items-center justify-center p-2 bg-[#FFF0F0] rounded-lg text-[#666666]">
                <span className="material-symbols-outlined text-[20px]!">
                  filter_list
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {paged.map((product) => {
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
                className={`group flex flex-col gap-3 ${product.comingSoon ? 'cursor-not-allowed' : product.link ? 'cursor-pointer' : ''}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-[#FFF0F0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${product.comingSoon ? 'blur-md scale-105' : ''}`}
                  />
                  {product.comingSoon && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 rounded-xl">
                      <span className="text-white text-sm font-bold tracking-widest uppercase">
                        {t.showcase.comingSoon}
                      </span>
                    </div>
                  )}
                  {product.badgeText && (
                    <div
                      className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded"
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
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-base truncate pr-2 text-[#3D3D3D]">
                      {product.name}
                    </h3>
                    <p className="font-bold text-sm text-[#3D3D3D]">
                      {product.price}
                    </p>
                  </div>
                  <p className="text-[#888888] text-xs mt-1">
                    {product.categoryName}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 pb-12">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePage(currentPage - 1)}
              className="flex items-center justify-center size-10 rounded-lg text-[#888888] hover:bg-[#FFF0F0] disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]!">
                chevron_left
              </span>
            </button>

            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span
                  key={`dots-${i}`}
                  className="flex items-center justify-center size-10 text-[#888888]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePage(p)}
                  className={`flex items-center justify-center size-10 rounded-lg font-medium text-sm transition-colors ${
                    currentPage === p
                      ? 'bg-[#FF6B6B] text-white font-bold shadow-md shadow-[#FF6B6B]/30'
                      : 'text-[#3D3D3D] hover:bg-[#FFF0F0]'
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => handlePage(currentPage + 1)}
              className="flex items-center justify-center size-10 rounded-lg text-[#3D3D3D] hover:bg-[#FFF0F0] hover:text-[#FF6B6B] disabled:opacity-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]!">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
