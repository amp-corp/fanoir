'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard/collections', label: 'Collections', icon: '📦' },
  { href: '/admin/dashboard/products', label: 'Products', icon: '🏷️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1e1b14] text-white flex flex-col">
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
    </aside>
  );
}
