import CollectionForm from '@/components/admin/CollectionForm';

export default function NewCollectionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">New Collection</h1>
      <CollectionForm />
    </div>
  );
}
