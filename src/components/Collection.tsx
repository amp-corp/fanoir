'use client';

import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useLang } from '@/contexts/LangContext';
import type { CollectionForDisplay } from '@/lib/db-queries';

const PAGE_SIZE = 6;

export default function Collection({
  collections,
}: {
  collections: CollectionForDisplay[];
}) {
  const { t, localePath } = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const totalPages = Math.max(1, Math.ceil(collections.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = collections.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handlePage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) params.delete('page');
    else params.set('page', String(p));
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
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
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-12 lg:py-24 flex flex-col gap-10 py-16">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#3D3D3D]">
            {t.collection.title}
          </h1>
          <p className="text-[#888888] text-sm md:text-base mt-2">
            {t.collection.desc}
          </p>
        </div>

        {/* Collection Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paged.map((collab) => (
            <Link
              key={collab.slug}
              href={localePath(`/collection/${collab.slug}`)}
              className="group relative overflow-hidden rounded-xl bg-[#F5F5F5] aspect-video md:aspect-4/3 lg:aspect-16/7"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${collab.image}')` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded w-fit uppercase tracking-wider">
                  {collab.label}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-bold italic">
                  {collab.title}
                </h3>
                <p className="text-gray-200 text-sm max-w-sm">{collab.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 pb-12">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePage(currentPage - 1)}
              className="flex items-center justify-center size-10 rounded-lg text-[#888888] hover:bg-[#F5F5F5] disabled:opacity-50"
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
                      ? 'bg-[#222222] text-white font-bold shadow-md shadow-[#222222]/30'
                      : 'text-[#3D3D3D] hover:bg-[#F5F5F5]'
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => handlePage(currentPage + 1)}
              className="flex items-center justify-center size-10 rounded-lg text-[#3D3D3D] hover:bg-[#F5F5F5] hover:text-[#222222] disabled:opacity-50 transition-colors"
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
