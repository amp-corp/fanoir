'use client';

const LOCALES = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja'] as const;
const LOCALE_LABELS: Record<string, string> = {
  ko: '한국어',
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ja: '日本語',
};

export default function LocaleTabs({
  activeLocale,
  onChange,
}: {
  activeLocale: string;
  onChange: (locale: string) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeLocale === locale
              ? 'border-[#d0b476] text-[#d0b476]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {LOCALE_LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
