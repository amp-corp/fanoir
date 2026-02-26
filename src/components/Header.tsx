'use client';

import { useLang } from '@/contexts/LangContext';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const { locale, t, switchLocale, localePath } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: localePath('/#identity'), label: t.nav.identity },
    { href: localePath('/#products'), label: t.nav.products },
    { href: localePath('/collection'), label: t.nav.collection },
    { href: localePath('/#contact'), label: t.nav.contact },
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 py-4 md:px-10 lg:px-40 fixed top-0 w-full z-50 backdrop-blur-md bg-[#1e1b14]/90">
      {/* Logo */}
      <a href={localePath('/')} className="flex items-center">
        <Image
          src="/logo.png"
          alt="FANOIR"
          width={120}
          height={40}
          className="h-5 w-auto"
          priority
        />
      </a>

      {/* Desktop nav - centered */}
      <nav className="hidden md:flex flex-1 justify-center gap-12">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-slate-300 hover:text-[#caa963] transition-colors text-sm font-medium leading-normal tracking-wide"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center rounded-full size-10 text-white hover:text-[#caa963] transition-colors"
          aria-label="Search"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        {/* Language toggle */}
        <button
          onClick={switchLocale}
          className="hidden md:flex items-center justify-center rounded-full size-10 text-slate-400 hover:text-[#caa963] transition-colors text-xs font-bold tracking-wider"
        >
          {locale === 'ko' ? 'EN' : 'KO'}
        </button>
        {/* Mobile menu */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center rounded-full size-10 text-white hover:text-[#caa963] transition-colors"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">
            {open ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <nav className="absolute top-full left-0 right-0 bg-[#1e1b14] border-t border-white/10 px-6 py-6 flex flex-col gap-5 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-[#caa963] transition-colors text-sm font-medium tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={switchLocale}
            className="text-slate-400 hover:text-[#caa963] transition-colors text-xs font-bold tracking-wider w-fit"
          >
            {locale === 'ko' ? 'EN' : 'KO'}
          </button>
        </nav>
      )}
    </header>
  );
}
