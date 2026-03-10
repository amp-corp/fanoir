'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard/collections', label: 'Collections', icon: '📦' },
  { href: '/admin/dashboard/categories', label: 'Categories', icon: '📂' },
  { href: '/admin/dashboard/products', label: 'Products', icon: '🏷️' },
  { href: '/admin/dashboard/site-images', label: 'Site Images', icon: '🎨' },
  { href: '/admin/dashboard/image-guide', label: 'Image Guide', icon: '🖼️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-white/10">
        <h1 className="text-lg font-bold">FANOIR</h1>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <span>🌐</span>
          View Site
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile: hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#565656] text-white p-2 rounded-lg"
        aria-label="Open menu"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile: overlay + drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-64 bg-[#565656] text-white flex flex-col z-50">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop: fixed sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#565656] text-white flex-col">
        {sidebarContent}
      </aside>
    </>
  );
}
