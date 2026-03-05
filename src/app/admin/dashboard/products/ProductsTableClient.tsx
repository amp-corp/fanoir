'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import DataTable, { Column } from '@/components/admin/DataTable';

type CategoryRow = {
  id: string;
  key: string;
  translations: Record<string, { name: string }>;
};

type ProductRow = {
  id: string;
  image: string;
  badgeText: string | null;
  categoryId: string;
  category: CategoryRow;
  visible: boolean;
  order: number;
  translations: Record<string, { name: string; price: string }>;
};

export default function ProductsTableClient({
  data,
  categories,
}: {
  data: ProductRow[];
  categories: CategoryRow[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [orderChanges, setOrderChanges] = useState<Record<string, number>>({});
  const [categoryChanges, setCategoryChanges] = useState<Record<string, string>>({});
  const [visibilityChanges, setVisibilityChanges] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const hasChanges =
    Object.keys(orderChanges).length > 0 ||
    Object.keys(categoryChanges).length > 0 ||
    Object.keys(visibilityChanges).length > 0;

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

  function handleCategoryChange(id: string, originalCategoryId: string, value: string) {
    setCategoryChanges((prev) => {
      if (value === originalCategoryId) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: value };
    });
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

  async function handleBatchSave() {
    setSaving(true);
    try {
      // Collect all changed product IDs
      const changedIds = new Set([
        ...Object.keys(orderChanges),
        ...Object.keys(categoryChanges),
        ...Object.keys(visibilityChanges),
      ]);

      await Promise.all(
        Array.from(changedIds).map((id) => {
          const body: Record<string, unknown> = {};
          if (id in orderChanges) body.order = orderChanges[id];
          if (id in categoryChanges) body.categoryId = categoryChanges[id];
          if (id in visibilityChanges) body.visible = visibilityChanges[id];
          return fetch(`/api/admin/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
        }),
      );
      setOrderChanges({});
      setCategoryChanges({});
      setVisibilityChanges({});
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
      key: 'name',
      label: 'Name (KO)',
      render: (item) => item.translations?.ko?.name || '-',
    },
    {
      key: 'category',
      label: 'Category',
      render: (item) => (
        <select
          defaultValue={item.categoryId}
          disabled={saving}
          className="px-2 py-1 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 disabled:opacity-50"
          onChange={(e) => handleCategoryChange(item.id, item.categoryId, e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.translations?.ko?.name || c.key}
            </option>
          ))}
        </select>
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

  function handleCopy(id: string) {
    const product = data.find((p) => p.id === id);
    if (!product) return;

    startTransition(async () => {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: product.image,
          badgeText: product.badgeText,
          categoryId: product.categoryId,
          order: product.order,
          visible: product.visible,
          translations: product.translations,
        }),
      });
      router.refresh();
    });
  }

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
              {saving ? '저장 중...' : '적용하기'}
            </button>
          )}
          <Link
            href="/admin/dashboard/products/new"
            className="px-4 py-2 bg-[#222222] text-white text-sm font-medium rounded-lg hover:bg-[#393939] transition-colors"
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
          onCopy={handleCopy}
        />
      )}
    </div>
  );
}
