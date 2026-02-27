import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">New Product</h1>
      <ProductForm />
    </div>
  );
}
