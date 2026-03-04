'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable, { Column } from '@/components/admin/DataTable';

type CategoryRow = {
  id: string;
  key: string;
  order: number;
  translations: Record<string, { name: string }>;
  _count: { products: number };
};

export default function CategoriesListPage() {
  const [data, setData] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderChanges, setOrderChanges] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  const hasChanges = Object.keys(orderChanges).length > 0;

  function fetchCategories() {
    return fetch('/api/admin/categories')
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }

  function refetchCategories() {
    setLoading(true);
    return fetchCategories();
  }

  useEffect(() => {
    fetchCategories();
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
      await Promise.all(
        Object.entries(orderChanges).map(([id, order]) =>
          fetch(`/api/admin/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order }),
          }),
        ),
      );
      setOrderChanges({});
      refetchCategories();
    } finally {
      setSaving(false);
    }
  }

  const columns: Column<CategoryRow>[] = [
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
      key: 'key',
      label: 'Key',
      render: (item) => (
        <span className="font-mono text-xs text-gray-900">{item.key}</span>
      ),
    },
    {
      key: 'name',
      label: 'Name (KO)',
      render: (item) => item.translations?.ko?.name || '-',
    },
    {
      key: 'products',
      label: 'Products',
      render: (item) => item._count.products,
    },
  ];

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || '삭제에 실패했습니다.');
      return;
    }
    refetchCategories();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleBatchSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? '저장 중...' : '순서 변경하기'}
            </button>
          )}
          <Link
            href="/admin/dashboard/categories/new"
            className="px-4 py-2 bg-[#FF6B6B] text-white text-sm font-medium rounded-lg hover:bg-[#FF8585] transition-colors"
          >
            + New Category
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          editPath={(id) => `/admin/dashboard/categories/${id}`}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
