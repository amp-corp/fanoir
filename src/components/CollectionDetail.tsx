'use client';

import Image from 'next/image';
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
    <section className="bg-[#FFFFFF] min-h-screen">
      {/* Hero Banner — 21:9 */}
      <div className="relative w-full aspect-[21/9] overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-12 flex flex-col gap-2">
          <span className="bg-[#222222]/90 text-white text-xs font-bold px-2 py-1 rounded w-fit uppercase tracking-wider">
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
        <nav className="text-sm text-[#888888] flex items-center gap-1">
          <Link
            href={localePath('/collection')}
            className="hover:text-[#222222]"
          >
            {t.collection.title}
          </Link>
          <span className="material-symbols-outlined text-[14px]!">
            chevron_right
          </span>
          <span className="text-[#3D3D3D]">{collection.title}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {collection.products.map((product) => {
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
                <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F5F5F5]">
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
                  {!product.comingSoon && (
                    <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#222222] hover:text-white text-[#3D3D3D]">
                      <span className="material-symbols-outlined text-[20px]!">
                        add_shopping_cart
                      </span>
                    </button>
                  )}
                  {product.badgeText && (
                    <div
                      className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          product.badgeColor?.match(/^bg-\[(.+)\]$/)?.[1] ||
                          '#222222',
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
      </div>
    </section>
  );
}
