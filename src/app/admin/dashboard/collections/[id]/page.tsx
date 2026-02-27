'use client';

import { use } from 'react';
import CollectionForm from '@/components/admin/CollectionForm';

export default function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Edit Collection</h1>
      <CollectionForm id={id} />
    </div>
  );
}
