'use client';

import { useLang } from '@/contexts/LangContext';

export default function TermsPage() {
  const { t } = useLang();
  const { title, lastUpdated, sections } = t.termsPage;

  return (
    <div className="min-h-screen py-18 px-6">
      <div className="max-w-3xl mx-auto py-24">
        <h1 className="text-3xl font-bold text-[#3D3D3D] mb-2">{title}</h1>
        <p className="text-sm text-[#666666] mb-12">{lastUpdated}</p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-[#3D3D3D] mb-3">
                {section.title}
              </h2>
              <p className="text-sm text-[#999999] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
