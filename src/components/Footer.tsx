"use client";

import { useLang } from "@/contexts/LangContext";
import Image from "next/image";

export default function Footer() {
  const { t, localePath } = useLang();

  return (
    <footer id="contact" className="bg-[#1e1b14] border-t border-[#40392b] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo centered */}
        <div className="flex justify-center mb-8">
          <a href={localePath("/")}>
            <Image
              src="/logo.png"
              alt="FANOIR"
              width={120}
              height={40}
              className="h-6 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href="#"
            className="text-sm text-[#6b6355] hover:text-[#beb39d] transition-colors"
          >
            {t.footer.privacy}
          </a>
          <a
            href="#"
            className="text-sm text-[#6b6355] hover:text-[#beb39d] transition-colors"
          >
            {t.footer.terms}
          </a>
          <a
            href="#"
            className="text-sm text-[#6b6355] hover:text-[#beb39d] transition-colors"
          >
            {t.footer.shipping}
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-5 mb-10">
          {/* Instagram */}
          <a
            href="https://instagram.com/fanoir.official"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b6355] hover:text-[#caa963] transition-colors"
            aria-label="Instagram"
          >
            <span className="material-symbols-outlined text-xl!">photo_camera</span>
          </a>
          {/* Twitter / X */}
          <a
            href="#"
            className="text-[#6b6355] hover:text-[#caa963] transition-colors"
            aria-label="Social"
          >
            <span className="material-symbols-outlined text-xl!">flutter_dash</span>
          </a>
          {/* Website */}
          <a
            href="#"
            className="text-[#6b6355] hover:text-[#caa963] transition-colors"
            aria-label="Website"
          >
            <span className="material-symbols-outlined text-xl!">public</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-[#6b6355] text-xs">
          &copy; 2025 FANOIR. {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
