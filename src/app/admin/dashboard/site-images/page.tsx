'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { IMAGE_SPECS, formatBytes, type ImageVariant } from '@/lib/image-specs';

type SlotConfig = {
  key: string;
  label: string;
  desc: string;
  variant: ImageVariant;
};

const SLOTS: SlotConfig[] = [
  {
    key: 'hero_image',
    label: 'Hero 배경 이미지',
    desc: '메인 페이지 상단 Hero 섹션 배경. 어두운 오버레이 위에 텍스트가 올라가므로, 디테일보다 분위기 중심 이미지가 적합합니다.',
    variant: 'banner',
  },
  {
    key: 'signature_image_1',
    label: 'Signature 이미지 1',
    desc: 'Showcase Signature 섹션 좌측 상단 정방형 이미지.',
    variant: 'product',
  },
  {
    key: 'signature_image_2',
    label: 'Signature 이미지 2',
    desc: 'Showcase Signature 섹션 우측 하단 정방형 이미지.',
    variant: 'product',
  },
];

export default function SiteImagesPage() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => {
        if (!r.ok) return { hero_image: '', signature_image_1: '', signature_image_2: '' };
        return r.json();
      })
      .then((data) => setImages(data))
      .catch(() => setImages({ hero_image: '', signature_image_1: '', signature_image_2: '' }))
      .finally(() => setLoading(false));
  }, []);

  function updateImage(key: string, url: string) {
    setImages((prev) => ({ ...prev, [key]: url }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(images),
      });

      if (res.ok) {
        const data = await res.json();
        setImages(data);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert('저장에 실패했습니다.');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Images</h1>
          <p className="text-sm text-gray-500 mt-1">
            메인 페이지에서 사용되는 이미지를 관리합니다.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#FF6B6B] text-white text-sm font-medium rounded-lg hover:bg-[#FF8585] disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {SLOTS.map((slot) => (
          <section
            key={slot.key}
            className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3"
          >
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{slot.label}</h2>
              <p className="text-xs text-gray-500 mt-1">{slot.desc}</p>
              <p className="text-xs text-red-500 mt-1">
                비율 {IMAGE_SPECS[slot.variant].ratioLabel} · 권장 {IMAGE_SPECS[slot.variant].width}x{IMAGE_SPECS[slot.variant].height}px · 최대 {formatBytes(IMAGE_SPECS[slot.variant].maxUploadSize)}
              </p>
            </div>
            <ImageUpload
              value={images[slot.key] || ''}
              onChange={(url) => updateImage(slot.key, url)}
              variant={slot.variant}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
