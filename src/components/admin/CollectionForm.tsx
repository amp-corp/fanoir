'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocaleTabs from './LocaleTabs';
import ImageUpload from './ImageUpload';

const LOCALES = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja'] as const;

type CollectionTranslation = { label: string; title: string; desc: string };
type Product = { id: string; translations: Record<string, { name: string; price: string }> };

const emptyTranslations = (): Record<string, CollectionTranslation> =>
  Object.fromEntries(LOCALES.map((l) => [l, { label: '', title: '', desc: '' }]));

export default function CollectionForm({ id }: { id?: string }) {
  const router = useRouter();
  const isEdit = !!id;

  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [order, setOrder] = useState(0);
  const [translations, setTranslations] = useState<Record<string, CollectionTranslation>>(emptyTranslations());
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeLocale, setActiveLocale] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetches: Promise<void>[] = [
      fetch('/api/admin/products')
        .then((r) => r.json())
        .then((data) => setAllProducts(data)),
    ];

    if (isEdit) {
      fetches.push(
        fetch(`/api/admin/collections/${id}`)
          .then((r) => r.json())
          .then((data) => {
            setSlug(data.slug);
            setImage(data.image);
            setOrder(data.order);
            setTranslations(data.translations);
            setSelectedProducts(
              data.products
                .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                .map((cp: { productId: string }) => cp.productId)
            );
          }),
      );
    }

    Promise.all(fetches).finally(() => setLoading(false));
  }, [id, isEdit]);

  function updateTranslation(field: keyof CollectionTranslation, value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLocale]: { ...prev[activeLocale], [field]: value },
    }));
  }

  function toggleProduct(productId: string) {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }

  async function handleAutoTranslate() {
    const source = translations[activeLocale];
    if (!Object.values(source).some((v) => v.trim())) {
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

    const body = { slug, image, order, translations, productIds: selectedProducts };
    const url = isEdit ? `/api/admin/collections/${id}` : '/api/admin/collections';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push('/admin/dashboard/collections');
    } else {
      alert('저장에 실패했습니다.');
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-400">Loading...</div>;
  }

  const t = translations[activeLocale] || { label: '', title: '', desc: '' };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-8">
      {/* Basic fields */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-900">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">URL 경로</label>
            <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#d0b476]">
              <span className="pl-3 pr-1 py-2 text-sm text-gray-400 select-none whitespace-nowrap">/collections/</span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 px-1 py-2 text-sm focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d0b476]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Image</label>
          <ImageUpload value={image} onChange={setImage} />
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
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d0b476] text-[#d0b476] hover:bg-[#d0b476]/10 disabled:opacity-50 transition-colors"
          >
            {translating ? 'Translating...' : 'Auto Translate'}
          </button>
        </div>
        {translateError && (
          <p className="text-xs text-red-500">{translateError}</p>
        )}
        <LocaleTabs activeLocale={activeLocale} onChange={setActiveLocale} />
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
          <input
            value={t.label}
            onChange={(e) => updateTranslation('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d0b476]"
            placeholder="NEW DROP"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
          <input
            value={t.title}
            onChange={(e) => updateTranslation('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d0b476]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
          <textarea
            value={t.desc}
            onChange={(e) => updateTranslation('desc', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d0b476] resize-none"
          />
        </div>
      </section>

      {/* Product selection */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-900">Products ({selectedProducts.length} selected)</h2>
        <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
          {allProducts.map((product) => {
            const name = (product.translations as Record<string, { name: string }>)?.ko?.name || product.id;
            return (
              <label
                key={product.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleProduct(product.id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{name}</span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#1e1b14] text-white text-sm font-medium rounded-lg hover:bg-[#1e1b14]/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard/collections')}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
