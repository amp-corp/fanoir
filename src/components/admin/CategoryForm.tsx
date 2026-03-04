'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocaleTabs from './LocaleTabs';

const LOCALES = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja'] as const;

type CategoryTranslation = { name: string };

const emptyTranslations = (): Record<string, CategoryTranslation> =>
  Object.fromEntries(LOCALES.map((l) => [l, { name: '' }]));

export default function CategoryForm({ id }: { id?: string }) {
  const router = useRouter();
  const isEdit = !!id;

  const [key, setKey] = useState('');
  const [order, setOrder] = useState(0);
  const [translations, setTranslations] = useState<Record<string, CategoryTranslation>>(emptyTranslations());
  const [activeLocale, setActiveLocale] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    fetch(`/api/admin/categories/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setKey(data.key);
        setOrder(data.order);
        setTranslations(data.translations);
      })
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function updateTranslation(value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLocale]: { name: value },
    }));
  }

  async function handleAutoTranslate() {
    const source = translations[activeLocale];
    if (!source.name.trim()) {
      setTranslateError('현재 로케일에 번역할 텍스트를 입력하세요.');
      return;
    }

    setTranslating(true);
    setTranslateError('');

    const targetLocales = LOCALES.filter((l) => l !== activeLocale);

    try {
      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: source, sourceLocale: activeLocale, targetLocales }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Translation failed');
      }

      const { translations: result } = await res.json();
      setTranslations((prev) => {
        const next = { ...prev };
        for (const locale of targetLocales) {
          if (result[locale]) next[locale] = { ...prev[locale], ...result[locale] };
        }
        return next;
      });
    } catch (e) {
      setTranslateError(e instanceof Error ? e.message : 'Translation failed');
    } finally {
      setTranslating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body = { key, order, translations };
    const url = isEdit ? `/api/admin/categories/${id}` : '/api/admin/categories';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push('/admin/dashboard/categories');
    } else {
      alert('저장에 실패했습니다.');
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-400">Loading...</div>;
  }

  const t = translations[activeLocale] || { name: '' };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-8">
      {/* Basic fields */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-900">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Key (slug)</label>
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              placeholder="dolls"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            />
          </div>
        </div>
      </section>

      {/* Translations */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Translations</h2>
          <button
            type="button"
            onClick={handleAutoTranslate}
            disabled={translating}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B]/10 disabled:opacity-50 transition-colors"
          >
            {translating ? 'Translating...' : 'Auto Translate'}
          </button>
        </div>
        {translateError && (
          <p className="text-xs text-red-500">{translateError}</p>
        )}
        <LocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
          <input
            value={t.name}
            onChange={(e) => updateTranslation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            placeholder="인형"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#FF6B6B] text-white text-sm font-medium rounded-lg hover:bg-[#FF8585] disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard/categories')}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
