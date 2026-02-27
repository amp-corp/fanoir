'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useLang } from '@/contexts/LangContext';
import CollectionBannerSlider from './CollectionBannerSlider';
import type { ProductForDisplay, CollectionForDisplay } from '@/lib/db-queries';

const FILTER_KEYS = [
  'all',
  'dolls',
  'cheering',
  'fashion',
  'keyrings',
] as const;

const SORT_KEYS = ['newest', 'price-asc', 'price-desc'] as const;
type SortKey = (typeof SORT_KEYS)[number];

const PAGE_SIZE = 8;

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, '')) || 0;
}

export default function Collection({
  products,
  collections,
}: {
  products: ProductForDisplay[];
  collections: CollectionForDisplay[];
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

  const filters = t.collection.filters;
  const sortOptions = t.collection.sortOptions;

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
    <section className="bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-12 py-24 flex flex-col gap-10">
        {/* Featured Collaborations */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1e1b14]">
              {t.collection.title}
            </h2>
            <Link
              href={localePath('/collection/all')}
              className="text-sm font-medium text-[#d0b476] hover:text-[#d0b476]/80 flex items-center gap-1"
            >
              {t.collection.viewAll}
              <span className="material-symbols-outlined text-[16px]!">
                arrow_forward
              </span>
            </Link>
          </div>

          <CollectionBannerSlider collections={collections} />
        </div>

        {/* Filter & Sort Bar */}
        <div className="sticky top-[73px] z-40 bg-[#FAF8F5]/95 backdrop-blur-sm py-4 border-b border-[#e8e0d4]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              {FILTER_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveFilter(key);
                    updateParams({ page: null });
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeFilter === key
                      ? 'bg-[#d0b476] text-white'
                      : 'bg-[#f5f0e8] text-[#6b6355] hover:bg-[#e8e0d4]'
                  }`}
                >
                  {filters[key]}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative flex items-center gap-3" ref={sortRef}>
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-[#f5f0e8] rounded-lg text-sm font-medium text-[#6b6355]"
              >
                <span className="material-symbols-outlined text-[18px]!">
                  sort
                </span>
                <span>
                  {t.collection.sortPrefix}: {sortOptions[sort]}
                </span>
                <span className="material-symbols-outlined text-[18px]!">
                  {sortOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {sortOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-[#e8e0d4] py-1 min-w-[180px] z-50">
                  {SORT_KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleSort(key)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sort === key
                          ? 'bg-[#f5f0e8] text-[#d0b476] font-semibold'
                          : 'text-[#6b6355] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {sortOptions[key]}
                    </button>
                  ))}
                </div>
              )}

              <button className="flex md:hidden items-center justify-center p-2 bg-[#f5f0e8] rounded-lg text-[#6b6355]">
                <span className="material-symbols-outlined text-[20px]!">
                  filter_list
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {paged.map((product) => (
            <div key={product.id} className="group flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f5f0e8]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                {product.badgeText && (
                  <div
                    className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded"
                    style={{ backgroundColor: product.badgeColor?.match(/^bg-\[(.+)\]$/)?.[1] || '#d0b476' }}
                  >
                    {product.badgeText}
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-base truncate pr-2 text-[#1e1b14]">
                    {product.name}
                  </h3>
                  <p className="font-bold text-sm text-[#1e1b14]">
                    {product.price}
                  </p>
                </div>
                <p className="text-[#8a7b5c] text-xs mt-1">
                  {filters[product.category as keyof typeof filters] ||
                    product.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 pb-12">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePage(currentPage - 1)}
              className="flex items-center justify-center size-10 rounded-lg text-[#8a7b5c] hover:bg-[#f5f0e8] disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]!">
                chevron_left
              </span>
            </button>

            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span
                  key={`dots-${i}`}
                  className="flex items-center justify-center size-10 text-[#8a7b5c]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePage(p)}
                  className={`flex items-center justify-center size-10 rounded-lg font-medium text-sm transition-colors ${
                    currentPage === p
                      ? 'bg-[#d0b476] text-white font-bold shadow-md shadow-[#d0b476]/30'
                      : 'text-[#1e1b14] hover:bg-[#f5f0e8]'
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => handlePage(currentPage + 1)}
              className="flex items-center justify-center size-10 rounded-lg text-[#1e1b14] hover:bg-[#f5f0e8] hover:text-[#d0b476] disabled:opacity-50 transition-colors"
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
