"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

const FILTERS = [
  "All Items",
  "Doll Clothes",
  "Accessories",
  "Collectibles",
  "Stationery",
] as const;

const collectionProducts = [
  {
    name: "Velvet Stage Outfit",
    price: "$45.00",
    category: "Doll Couture",
    image: "/collection/item-1.jpg",
    badge: "HOT",
    badgeColor: "bg-red-500",
  },
  {
    name: "Denim Airport Look",
    price: "$38.00",
    category: "Doll Couture",
    image: "/collection/item-2.jpg",
  },
  {
    name: "Concert Hoodie Set",
    price: "$50.00",
    category: "Apparel",
    image: "/collection/item-3.jpg",
  },
  {
    name: "Lightstick Cape",
    price: "$15.00",
    category: "Accessories",
    image: "/collection/item-4.jpg",
    badge: "NEW",
    badgeColor: "bg-[#d0b476]",
  },
  {
    name: "Pastel Cardigan",
    price: "$32.00",
    category: "Doll Couture",
    image: "/collection/item-5.jpg",
  },
  {
    name: "Mini Leather Boots",
    price: "$22.00",
    category: "Accessories",
    image: "/collection/item-6.jpg",
  },
  {
    name: "Beret Collection",
    price: "$18.00",
    category: "Accessories",
    image: "/collection/item-7.jpg",
  },
  {
    name: "School Uniform Set",
    price: "$42.00",
    category: "Doll Couture",
    image: "/collection/item-8.jpg",
  },
];

export default function Collection() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<string>("All Items");

  const filtered =
    activeFilter === "All Items"
      ? collectionProducts
      : collectionProducts.filter((p) => p.category === activeFilter);

  return (
    <section className="bg-[#1e1b14] min-h-screen">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-10">
        {/* Featured Collaborations */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F8F8F8]">
              {t.collection.title}
            </h2>
            <a
              href="#"
              className="text-sm font-medium text-[#d0b476] hover:text-[#d0b476]/80 flex items-center gap-1"
            >
              {t.collection.viewAll}
              <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Collab 1: FANOIR x JENNIE */}
            <div className="group relative overflow-hidden rounded-xl bg-[#2a2721] aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/7]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/collection/collab-1.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-2">
                <span className="bg-[#d0b476]/90 text-white text-xs font-bold px-2 py-1 rounded w-fit uppercase tracking-wider">
                  {t.collection.collab1Label}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold italic">
                  {t.collection.collab1Title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base max-w-md">
                  {t.collection.collab1Desc}
                </p>
                <button className="mt-4 bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d0b476] hover:text-white transition-all w-fit">
                  {t.collection.collab1Cta}
                </button>
              </div>
            </div>

            {/* Collab 2: THE LISA EDIT */}
            <div className="group relative overflow-hidden rounded-xl bg-[#2a2721] aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/7]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/collection/collab-2.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded w-fit uppercase tracking-wider">
                  {t.collection.collab2Label}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-bold italic">
                  {t.collection.collab2Title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base max-w-md">
                  {t.collection.collab2Desc}
                </p>
                <button className="mt-4 bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d0b476] hover:text-white transition-all w-fit">
                  {t.collection.collab2Cta}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="sticky top-[73px] z-40 bg-[#1e1b14]/95 backdrop-blur-sm py-4 border-b border-[#3a362e]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeFilter === filter
                      ? "bg-[#d0b476] text-white"
                      : "bg-[#2a2721] text-[#F8F8F8]/70 hover:bg-[#3a362e]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#2a2721] rounded-lg text-sm font-medium text-[#F8F8F8]/70">
                <span className="material-symbols-outlined !text-[18px]">sort</span>
                <span>{t.collection.sortLabel}</span>
                <span className="material-symbols-outlined !text-[18px]">expand_more</span>
              </button>
              <button className="flex md:hidden items-center justify-center p-2 bg-[#2a2721] rounded-lg">
                <span className="material-symbols-outlined !text-[20px]">filter_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filtered.map((product, i) => (
            <div key={i} className="group flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#2a2721]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                {/* Cart button */}
                <button className="absolute bottom-4 right-4 bg-[#2a2721] p-2 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#d0b476] hover:text-white text-[#F8F8F8]">
                  <span className="material-symbols-outlined !text-[20px]">add_shopping_cart</span>
                </button>
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-base truncate pr-2 text-[#F8F8F8]">
                    {product.name}
                  </h3>
                  <p className="font-bold text-sm text-[#F8F8F8]">{product.price}</p>
                </div>
                <p className="text-[#8a7b5c] text-xs mt-1">{product.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 pb-12">
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center size-10 rounded-lg text-[#8a7b5c] hover:bg-[#2a2721] disabled:opacity-50">
              <span className="material-symbols-outlined !text-[20px]">chevron_left</span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg bg-[#d0b476] text-white font-bold text-sm shadow-md shadow-[#d0b476]/30">
              1
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg text-[#F8F8F8] hover:bg-[#2a2721] font-medium text-sm transition-colors">
              2
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg text-[#F8F8F8] hover:bg-[#2a2721] font-medium text-sm transition-colors">
              3
            </button>
            <span className="flex items-center justify-center size-10 text-[#8a7b5c]">...</span>
            <button className="flex items-center justify-center size-10 rounded-lg text-[#F8F8F8] hover:bg-[#2a2721] font-medium text-sm transition-colors">
              8
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg text-[#F8F8F8] hover:bg-[#2a2721] hover:text-[#d0b476] transition-colors">
              <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
