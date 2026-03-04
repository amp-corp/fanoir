'use client';

import { use } from 'react';
import CategoryForm from '@/components/admin/CategoryForm';

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Edit Category</h1>
      <CategoryForm id={id} />
    </div>
  );
}
