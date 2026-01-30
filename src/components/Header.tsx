"use client";

import { useLang } from "@/contexts/LangContext";
import { useState } from "react";

export default function Header() {
  const { locale, t, toggle } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t.nav.brand },
    { href: "#values", label: t.nav.values },
    { href: "#products", label: t.nav.products },
    { href: "#story", label: t.nav.story },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#C9A962]/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl tracking-[0.3em] font-light text-[#C9A962]">
          FANOIR
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#F8F8F8]/70 hover:text-[#C9A962] transition-colors tracking-wider"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="text-xs border border-[#C9A962]/40 px-3 py-1 text-[#C9A962] hover:bg-[#C9A962]/10 transition-colors tracking-wider"
          >
            {locale === "ko" ? "EN" : "KO"}
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#F8F8F8]"
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-[#1A1A1A] border-t border-[#C9A962]/20 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[#F8F8F8]/70 hover:text-[#C9A962] transition-colors tracking-wider"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="text-xs border border-[#C9A962]/40 px-3 py-1 text-[#C9A962] w-fit"
          >
            {locale === "ko" ? "EN" : "KO"}
          </button>
        </nav>
      )}
    </header>
  );
}
