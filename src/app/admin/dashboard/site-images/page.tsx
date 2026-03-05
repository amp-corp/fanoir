'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { IMAGE_SPECS, formatBytes } from '@/lib/image-specs';

type Data = {
  heroSlides: [string, string][];
  identityGallery: string[];
  identitySlider: string[];
  showcaseMood: string[];
};

const EMPTY: Data = {
  heroSlides: [],
  identityGallery: [],
  identitySlider: [],
  showcaseMood: [],
};

function swap<T>(arr: T[], a: number, b: number): T[] {
  const next = [...arr];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

export default function SiteImagesPage() {
  const [data, setData] = useState<Data>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : EMPTY))
      .then((d) => setData({ ...EMPTY, ...d }))
      .catch(() => setData(EMPTY))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const d = await res.json();
        setData({ ...EMPTY, ...d });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert('저장에 실패했습니다.');
      }
    } finally {
      setSaving(false);
    }
  }

  // --- Hero helpers ---
  function addHeroSlide() {
    setData((p) => ({ ...p, heroSlides: [...p.heroSlides, ['', '']] }));
    setSaved(false);
  }
  function removeHeroSlide(idx: number) {
    setData((p) => ({ ...p, heroSlides: p.heroSlides.filter((_, i) => i !== idx) }));
    setSaved(false);
  }
  function moveHeroSlide(idx: number, dir: -1 | 1) {
    setData((p) => ({ ...p, heroSlides: swap(p.heroSlides, idx, idx + dir) }));
    setSaved(false);
  }
  function updateHeroImage(slideIdx: number, side: 0 | 1, url: string) {
    setData((p) => {
      const slides = [...p.heroSlides];
      const pair: [string, string] = [...slides[slideIdx]];
      pair[side] = url;
      slides[slideIdx] = pair;
      return { ...p, heroSlides: slides };
    });
    setSaved(false);
  }

  // --- Generic list helpers ---
  type ListField = 'identityGallery' | 'identitySlider' | 'showcaseMood';

  function addToList(field: ListField) {
    setData((p) => ({ ...p, [field]: [...p[field], ''] }));
    setSaved(false);
  }
  function removeFromList(field: ListField, idx: number) {
    setData((p) => ({ ...p, [field]: p[field].filter((_, i) => i !== idx) }));
    setSaved(false);
  }
  function moveInList(field: ListField, idx: number, dir: -1 | 1) {
    setData((p) => ({ ...p, [field]: swap(p[field], idx, idx + dir) }));
    setSaved(false);
  }
  function updateInList(field: ListField, idx: number, url: string) {
    setData((p) => {
      const arr = [...p[field]];
      arr[idx] = url;
      return { ...p, [field]: arr };
    });
    setSaved(false);
  }

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>;

  const specInfo = (variant: 'product' | 'banner') => {
    const s = IMAGE_SPECS[variant];
    return `비율 ${s.ratioLabel} · 권장 ${s.width}x${s.height}px · 최대 ${formatBytes(s.maxUploadSize)}`;
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Images</h1>
          <p className="text-sm text-gray-500 mt-1">
            메인 페이지에서 사용되는 모든 이미지를 관리합니다.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#222222] text-white text-sm font-medium rounded-lg hover:bg-[#393939] disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <div className="flex flex-col gap-12">
        {/* ── Hero Slides ── */}
        <Section
          title="Hero 슬라이드"
          desc="메인 상단 캐러셀. 슬라이드당 2장(좌/우)이 반드시 필요합니다."
          onAdd={addHeroSlide}
          addLabel="슬라이드 추가"
        >
          {data.heroSlides.map((pair, si) => (
            <div key={si} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    슬라이드 {si + 1}
                  </h3>
                  <OrderButtons
                    index={si}
                    total={data.heroSlides.length}
                    onMove={(dir) => moveHeroSlide(si, dir)}
                  />
                </div>
                <button
                  onClick={() => removeHeroSlide(si)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
              <p className="text-xs text-red-500 mb-3">{specInfo('product')}</p>
              <div className="grid grid-cols-2 gap-4">
                {(['좌측', '우측'] as const).map((label, side) => (
                  <div key={side}>
                    <p className="text-xs text-gray-500 mb-2">{label}</p>
                    <ImageUpload
                      value={pair[side as 0 | 1] || ''}
                      onChange={(url) => updateHeroImage(si, side as 0 | 1, url)}
                      variant="product"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ── Identity Gallery ── */}
        <Section
          title="Identity — 갤러리"
          desc="브랜드 스토리 아래 가로 스크롤 영역. 정방형 이미지."
          onAdd={() => addToList('identityGallery')}
          addLabel="이미지 추가"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.identityGallery.map((src, i) => (
              <ImageSlot
                key={i}
                index={i}
                total={data.identityGallery.length}
                label={`갤러리 ${i + 1}`}
                value={src}
                variant="product"
                onChange={(url) => updateInList('identityGallery', i, url)}
                onRemove={() => removeFromList('identityGallery', i)}
                onMove={(dir) => moveInList('identityGallery', i, dir)}
              />
            ))}
          </div>
        </Section>

        {/* ── Identity Slider ── */}
        <Section
          title="Identity — 슬라이더"
          desc="갤러리 아래 좌측 자동 스와이프 영역. 정방형 이미지."
          onAdd={() => addToList('identitySlider')}
          addLabel="이미지 추가"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.identitySlider.map((src, i) => (
              <ImageSlot
                key={i}
                index={i}
                total={data.identitySlider.length}
                label={`슬라이더 ${i + 1}`}
                value={src}
                variant="product"
                onChange={(url) => updateInList('identitySlider', i, url)}
                onRemove={() => removeFromList('identitySlider', i)}
                onMove={(dir) => moveInList('identitySlider', i, dir)}
              />
            ))}
          </div>
        </Section>

        {/* ── Showcase Mood ── */}
        <Section
          title="Showcase — 무드 배너"
          desc="페이지 최하단 풀 와이드 배너 슬라이더. 와이드 비율 이미지."
          onAdd={() => addToList('showcaseMood')}
          addLabel="이미지 추가"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.showcaseMood.map((src, i) => (
              <ImageSlot
                key={i}
                index={i}
                total={data.showcaseMood.length}
                label={`무드 배너 ${i + 1}`}
                value={src}
                variant="banner"
                onChange={(url) => updateInList('showcaseMood', i, url)}
                onRemove={() => removeFromList('showcaseMood', i)}
                onMove={(dir) => moveInList('showcaseMood', i, dir)}
              />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

// ── Reusable components ──

function OrderButtons({
  index,
  total,
  onMove,
}: {
  index: number;
  total: number;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <span className="inline-flex gap-0.5">
      <button
        onClick={() => onMove(-1)}
        disabled={index === 0}
        className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors text-xs"
        title="위로"
      >
        ▲
      </button>
      <button
        onClick={() => onMove(1)}
        disabled={index === total - 1}
        className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors text-xs"
        title="아래로"
      >
        ▼
      </button>
    </span>
  );
}

function Section({
  title,
  desc,
  onAdd,
  addLabel,
  children,
}: {
  title: string;
  desc: string;
  onAdd: () => void;
  addLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + {addLabel}
        </button>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function ImageSlot({
  index,
  total,
  label,
  value,
  variant,
  onChange,
  onRemove,
  onMove,
}: {
  index: number;
  total: number;
  label: string;
  value: string;
  variant: 'product' | 'banner';
  onChange: (url: string) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const s = IMAGE_SPECS[variant];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
          <OrderButtons index={index} total={total} onMove={onMove} />
        </div>
        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700"
        >
          삭제
        </button>
      </div>
      <p className="text-xs text-red-500">
        비율 {s.ratioLabel} · 권장 {s.width}x{s.height}px · 최대 {formatBytes(s.maxUploadSize)}
      </p>
      <ImageUpload value={value} onChange={onChange} variant={variant} />
    </div>
  );
}
