'use client';

import { use } from 'react';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <ProductForm id={id} />
    </div>
  );
}
