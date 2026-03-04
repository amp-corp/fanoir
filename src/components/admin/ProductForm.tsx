'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocaleTabs from './LocaleTabs';
import ImageUpload from './ImageUpload';
import { IMAGE_SPECS, formatBytes } from '@/lib/image-specs';

const LOCALES = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja'] as const;

type CategoryOption = { id: string; key: string; translations: Record<string, { name: string }> };

type ProductTranslation = { name: string; price: string };

function formatKRW(value: string): string {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  return `₩${Number(num).toLocaleString('ko-KR')}`;
}

function parseRawPrice(formatted: string): string {
  return formatted.replace(/[^\d]/g, '');
}

const BADGE_PRESETS = [
  { label: 'None', hex: '' },
  { label: 'Coral', hex: '#FF6B6B' },
  { label: 'Red', hex: '#ef4444' },
  { label: 'Blue', hex: '#3b82f6' },
  { label: 'Black', hex: '#3D3D3D' },
  { label: 'Green', hex: '#22c55e' },
] as const;

function hexFromBadgeColor(badgeColor: string): string {
  const match = badgeColor.match(/^bg-\[([#\w]+)\]$/);
  return match ? match[1] : '';
}

const emptyTranslations = (): Record<string, ProductTranslation> =>
  Object.fromEntries(LOCALES.map((l) => [l, { name: '', price: '' }]));

export default function ProductForm({ id }: { id?: string }) {
  const router = useRouter();
  const isEdit = !!id;

  const [image, setImage] = useState('');
  const [badgeText, setBadgeText] = useState('');
  const [badgeColor, setBadgeColor] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [comingSoon, setComingSoon] = useState(false);
  const [comingSoonUntil, setComingSoonUntil] = useState('');
  const [link, setLink] = useState('');
  const [order, setOrder] = useState(0);
  const [translations, setTranslations] =
    useState<Record<string, ProductTranslation>>(emptyTranslations());
  const [activeLocale, setActiveLocale] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState('');
  const [rawPrice, setRawPrice] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetches: Promise<void>[] = [
      fetch('/api/admin/categories')
        .then((r) => r.json())
        .then((data) => {
          setCategories(data);
          if (!isEdit && data.length > 0) setCategoryId(data[0].id);
        }),
    ];

    if (isEdit) {
      fetches.push(
        fetch(`/api/admin/products/${id}`)
          .then((r) => r.json())
          .then((data) => {
            setImage(data.image);
            setBadgeText(data.badgeText || '');
            setBadgeColor(data.badgeColor || '');
            setCategoryId(data.categoryId);
            setComingSoon(data.comingSoon ?? false);
            setComingSoonUntil(
              data.comingSoonUntil
                ? new Date(data.comingSoonUntil).toISOString().slice(0, 16)
                : '',
            );
            setLink(data.link || '');
            setOrder(data.order);
            setTranslations(data.translations);
            const txs = data.translations as
              | Record<string, ProductTranslation>
              | undefined;
            const anyPrice =
              txs?.ko?.price ||
              Object.values(txs || {}).find((t) => t.price)?.price ||
              '';
            setRawPrice(parseRawPrice(anyPrice));
          }),
      );
    }

    Promise.all(fetches).finally(() => setLoading(false));
  }, [id, isEdit]);

  function updateTranslation(field: keyof ProductTranslation, value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLocale]: { ...prev[activeLocale], [field]: value },
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
    const textsToTranslate = { name: source.name };

    try {
      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: textsToTranslate,
          sourceLocale: activeLocale,
          targetLocales,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Translation failed');
      }

      const { translations: result } = await res.json();
      setTranslations((prev) => {
        const next = { ...prev };
        for (const locale of targetLocales) {
          if (result[locale])
            next[locale] = { ...prev[locale], ...result[locale] };
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

    const formattedPrice = formatKRW(rawPrice);
    const finalTranslations = Object.fromEntries(
      LOCALES.map((l) => [l, { ...translations[l], price: formattedPrice }]),
    );
    const body = {
      image,
      badgeText,
      badgeColor,
      categoryId,
      comingSoon,
      comingSoonUntil: comingSoonUntil || null,
      link: link.trim() || null,
      order,
      translations: finalTranslations,
    };
    const url = isEdit ? `/api/admin/products/${id}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push('/admin/dashboard/products');
    } else {
      alert('저장에 실패했습니다.');
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-400">Loading...</div>;
  }

  const t = translations[activeLocale] || { name: '', price: '' };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-8">
      {/* Basic fields */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-900">Basic Info</h2>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Image
          </label>
          <p className="text-xs text-red-500 mb-1">
            비율 {IMAGE_SPECS.product.ratioLabel} · 권장{' '}
            {IMAGE_SPECS.product.width}x{IMAGE_SPECS.product.height}px · 최대{' '}
            {formatBytes(IMAGE_SPECS.product.maxUploadSize)}
          </p>
          <ImageUpload value={image} onChange={setImage} variant="product" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.translations?.ko?.name || c.key}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Badge Text
            </label>
            <input
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              placeholder="HOT, NEW, etc."
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Product Link (URL)
          </label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://shop.duckzill.com/goods/goods_view.php?goodsNo=상품번호"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={comingSoon}
            onChange={(e) => setComingSoon(e.target.checked)}
            className="accent-[#FF6B6B]"
          />
          <span className="text-sm font-medium text-gray-700">Coming Soon</span>
        </label>
        {comingSoon && (
          <div className="ml-6">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Auto-release date (optional)
            </label>
            <input
              type="datetime-local"
              value={comingSoonUntil}
              onChange={(e) => setComingSoonUntil(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            />
            <p className="text-xs text-gray-400 mt-1">
              Set a date to automatically release this product. Leave empty for
              manual control.
            </p>
          </div>
        )}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Badge Color
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {BADGE_PRESETS.map((preset) => {
              const isSelected =
                preset.hex === ''
                  ? badgeColor === ''
                  : badgeColor === `bg-[${preset.hex}]`;
              return (
                <button
                  key={preset.label}
                  type="button"
                  title={preset.label}
                  onClick={() =>
                    setBadgeColor(preset.hex ? `bg-[${preset.hex}]` : '')
                  }
                  className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'border-[#FF6B6B] scale-110'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={
                    preset.hex ? { backgroundColor: preset.hex } : undefined
                  }
                >
                  {!preset.hex && (
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                      &#x2205;
                    </span>
                  )}
                  {isSelected && preset.hex && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
                      &#10003;
                    </span>
                  )}
                </button>
              );
            })}
            {(() => {
              const currentHex = hexFromBadgeColor(badgeColor);
              const isCustom =
                currentHex && !BADGE_PRESETS.some((p) => p.hex === currentHex);
              return (
                <>
                  {isCustom && (
                    <button
                      type="button"
                      title={currentHex}
                      className="relative w-8 h-8 rounded-full border-2 border-[#FF6B6B] scale-110 transition-all"
                      style={{ backgroundColor: currentHex }}
                      onClick={() => {
                        /* already selected */
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
                        &#10003;
                      </span>
                    </button>
                  )}
                  <label
                    className="relative w-8 h-8 rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer overflow-hidden transition-all"
                    title="Custom color"
                  >
                    <input
                      type="color"
                      value={currentHex || '#FF6B6B'}
                      onChange={(e) => setBadgeColor(`bg-[${e.target.value}]`)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                      +
                    </span>
                  </label>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Price */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-900">Price</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            inputMode="numeric"
            value={rawPrice}
            onChange={(e) => setRawPrice(e.target.value.replace(/\D/g, ''))}
            placeholder="45000"
            className="w-48 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
          />
          {rawPrice && (
            <span className="text-sm text-gray-500">{formatKRW(rawPrice)}</span>
          )}
        </div>
        <p className="text-xs text-gray-400">
          숫자만 입력하면 모든 로케일에 ₩ 포맷으로 저장됩니다.
        </p>
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
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Name
          </label>
          <input
            value={t.name}
            onChange={(e) => updateTranslation('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
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
          onClick={() => router.push('/admin/dashboard/products')}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
