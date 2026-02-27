'use client';

import { useLang } from '@/contexts/LangContext';

export default function TermsPage() {
  const { t } = useLang();
  const { title, lastUpdated, sections } = t.termsPage;

  return (
    <div className="min-h-screen py-18 px-6">
      <div className="max-w-3xl mx-auto py-24">
        <h1 className="text-3xl font-bold text-[#1e1b14] mb-2">{title}</h1>
        <p className="text-sm text-[#6b6355] mb-12">{lastUpdated}</p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-[#1e1b14] mb-3">
                {section.title}
              </h2>
              <p className="text-sm text-[#9a9080] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
