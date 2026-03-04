import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">New Category</h1>
      <CategoryForm />
    </div>
  );
}
