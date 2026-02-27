'use client';

import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import type { CollectionDetailForDisplay } from '@/lib/db-queries';

export default function CollectionDetail({
  collection,
}: {
  collection: CollectionDetailForDisplay;
}) {
  const { t, localePath } = useLang();

  return (
    <section className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full aspect-video md:aspect-21/9 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${collection.image}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-12 flex flex-col gap-2">
          <span className="bg-[#d0b476]/90 text-white text-xs font-bold px-2 py-1 rounded w-fit uppercase tracking-wider">
            {collection.label}
          </span>
          <h1 className="text-white text-3xl md:text-5xl font-bold italic">
            {collection.title}
          </h1>
          <p className="text-gray-200 text-sm md:text-lg max-w-xl">
            {collection.desc}
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-12 py-12 flex flex-col gap-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#8a7b5c] flex items-center gap-1">
          <Link href={localePath('/collection')} className="hover:text-[#d0b476]">
            {t.collection.title}
          </Link>
          <span className="material-symbols-outlined text-[14px]!">chevron_right</span>
          <span className="text-[#1e1b14]">{collection.title}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {collection.products.map((product) => (
            <div key={product.id} className="group flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f5f0e8]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#d0b476] hover:text-white text-[#1e1b14]">
                  <span className="material-symbols-outlined text-[20px]!">
                    add_shopping_cart
                  </span>
                </button>
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
                  {t.collection.filters[product.category as keyof typeof t.collection.filters] || product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
