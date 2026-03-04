'use client';

import { useLang } from '@/contexts/LangContext';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { locales, localeLabels, type Locale } from '@/lib/i18n';

export default function Header() {
  const { locale, t, switchLocale, localePath } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const links = [
    { href: localePath('/#identity'), label: t.nav.identity },
    { href: localePath('/products'), label: t.nav.products },
    { href: localePath('/collection'), label: t.nav.collection },
    // { href: localePath('/#contact'), label: t.nav.contact },
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-100 px-4 py-4 md:px-10 lg:px-40 fixed top-0 w-full z-50 backdrop-blur-md bg-white/95">
      {/* Logo */}
      <a href={localePath('/')} className="flex items-center">
        <Image
          src="/logo.png"
          alt="FANOIR"
          width={120}
          height={40}
          className="h-5 w-auto"
          style={{
            filter: 'brightness(0)',
          }}
          priority
        />
      </a>

      {/* Desktop nav - centered */}
      <nav className="hidden md:flex flex-1 justify-center gap-12">
        {links.map((l) => {
          const isActive = !l.href.includes('#') && pathname.startsWith(l.href);
          return (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors text-sm font-medium leading-normal tracking-wide ${
                isActive
                  ? 'text-[#222222]'
                  : 'text-[#3D3D3D] hover:text-[#222222]'
              }`}
            >
              {l.label}
            </a>
          );
        })}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-4">
        {/* <button
          className="flex items-center justify-center rounded-full size-10 text-[#3D3D3D] hover:text-[#222222] transition-colors"
          aria-label="Search"
        >
          <span className="material-symbols-outlined">search</span>
        </button> */}
        {/* Language dropdown */}
        <div ref={langRef} className="relative hidden md:block">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center justify-start rounded-full size-10 text-[#3D3D3D] hover:text-[#222222] transition-colors text-xs font-bold tracking-wider"
          >
            {localeLabels[locale]}
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-lg py-1 min-w-[48px] shadow-lg">
              {locales
                .filter((l) => l !== locale)
                .map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      switchLocale(l);
                      setLangOpen(false);
                    }}
                    className="block w-full px-3 py-1.5 text-xs font-bold text-[#3D3D3D] hover:text-[#222222] transition-colors tracking-wider text-center"
                  >
                    {localeLabels[l]}
                  </button>
                ))}
            </div>
          )}
        </div>
        {/* Mobile menu */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center rounded-full size-10 text-[#3D3D3D] hover:text-[#222222] transition-colors"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">
            {open ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <nav className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5 md:hidden shadow-lg">
          {links.map((l) => {
            const isActive = !l.href.includes('#') && pathname.startsWith(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`transition-colors text-sm font-medium tracking-wide ${
                  isActive
                    ? 'text-[#222222]'
                    : 'text-[#3D3D3D] hover:text-[#222222]'
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <div className="flex gap-3">
            {locales
              .filter((l) => l !== locale)
              .map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    switchLocale(l);
                    setOpen(false);
                  }}
                  className="text-[#3D3D3D] hover:text-[#222222] transition-colors text-xs font-bold tracking-wider"
                >
                  {localeLabels[l]}
                </button>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}
