'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable, { Column } from '@/components/admin/DataTable';

type CollectionRow = {
  id: string;
  slug: string;
  image: string;
  visible: boolean;
  order: number;
  translations: Record<string, { title: string }>;
  _count: { products: number };
};

export default function CollectionsListPage() {
  const [data, setData] = useState<CollectionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderChanges, setOrderChanges] = useState<Record<string, number>>({});
  const [visibilityChanges, setVisibilityChanges] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const hasChanges =
    Object.keys(orderChanges).length > 0 ||
    Object.keys(visibilityChanges).length > 0;

  function fetchCollections() {
    return fetch('/api/admin/collections')
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }

  function refetchCollections() {
    setLoading(true);
    return fetchCollections();
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  function handleInputChange(id: string, originalOrder: number, value: string) {
    const val = parseInt(value, 10);
    if (isNaN(val) || val < 0) return;
    setOrderChanges((prev) => {
      if (val === originalOrder) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: val };
    });
  }

  async function handleBatchSave() {
    setSaving(true);
    try {
      const changedIds = new Set([
        ...Object.keys(orderChanges),
        ...Object.keys(visibilityChanges),
      ]);
      await Promise.all(
        Array.from(changedIds).map((id) => {
          const body: Record<string, number | boolean> = {};
          if (id in orderChanges) body.order = orderChanges[id];
          if (id in visibilityChanges) body.visible = visibilityChanges[id];
          return fetch(`/api/admin/collections/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
        }),
      );
      setOrderChanges({});
      setVisibilityChanges({});
      refetchCollections();
    } finally {
      setSaving(false);
    }
  }

  function handleToggleVisible(id: string, originalVisible: boolean) {
    const newVisible = !(visibilityChanges[id] ?? originalVisible);
    setVisibilityChanges((prev) => {
      if (newVisible === originalVisible) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newVisible };
    });
  }

  const columns: Column<CollectionRow>[] = [
    {
      key: 'order',
      label: 'Order',
      render: (item) => (
        <input
          type="number"
          min={0}
          defaultValue={item.order}
          disabled={saving}
          className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded text-center focus:outline-none focus:border-gray-400 disabled:opacity-50"
          onChange={(e) => handleInputChange(item.id, item.order, e.target.value)}
        />
      ),
    },
    {
      key: 'visible',
      label: '공개',
      render: (item) => {
        const visible = visibilityChanges[item.id] ?? item.visible;
        return (
          <button
            onClick={() => handleToggleVisible(item.id, item.visible)}
            disabled={saving}
            className={`w-9 h-5 rounded-full relative transition-colors disabled:opacity-50 ${
              visible ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                visible ? 'translate-x-4' : ''
              }`}
            />
          </button>
        );
      },
    },
    {
      key: 'slug',
      label: 'URL 경로',
      render: (item) => (
        <span className="font-mono text-xs text-gray-500">
          /collections/<span className="text-gray-900">{item.slug}</span>
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Title (KO)',
      render: (item) => item.translations?.ko?.title || '-',
    },
    {
      key: 'products',
      label: 'Products',
      render: (item) => item._count.products,
    },
  ];

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/admin/collections/${id}`, { method: 'DELETE' });
    refetchCollections();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Collections</h1>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleBatchSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? '저장 중...' : '적용하기'}
            </button>
          )}
          <Link
            href="/admin/dashboard/collections/new"
            className="px-4 py-2 bg-[#222222] text-white text-sm font-medium rounded-lg hover:bg-[#393939] transition-colors"
          >
            + New Collection
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          editPath={(id) => `/admin/dashboard/collections/${id}`}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
