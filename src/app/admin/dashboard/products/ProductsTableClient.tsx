'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import DataTable, { Column } from '@/components/admin/DataTable';

type ProductRow = {
  id: string;
  image: string;
  badgeText: string | null;
  category: string;
  order: number;
  translations: Record<string, { name: string; price: string }>;
};

export default function ProductsTableClient({ data }: { data: ProductRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [orderChanges, setOrderChanges] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  const hasChanges = Object.keys(orderChanges).length > 0;

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
          fetch(`/api/admin/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order }),
          }),
        ),
      );
      setOrderChanges({});
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const columns: Column<ProductRow>[] = [
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
      key: 'name',
      label: 'Name (KO)',
      render: (item) => item.translations?.ko?.name || '-',
    },
    {
      key: 'category',
      label: 'Category',
      render: (item) => (
        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
          {item.category}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Price (KO)',
      render: (item) => item.translations?.ko?.price || '-',
    },
    {
      key: 'badge',
      label: 'Badge',
      render: (item) => item.badgeText || '-',
    },
  ];

  function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    startTransition(async () => {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
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
            href="/admin/dashboard/products/new"
            className="px-4 py-2 bg-[#1e1b14] text-white text-sm font-medium rounded-lg hover:bg-[#1e1b14]/90 transition-colors"
          >
            + New Product
          </Link>
        </div>
      </div>

      {isPending ? (
        <div className="text-sm text-gray-400">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          editPath={(id) => `/admin/dashboard/products/${id}`}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
