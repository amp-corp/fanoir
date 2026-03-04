import { prisma } from '@/lib/db';
import ProductsTableClient from './ProductsTableClient';

export default async function ProductsListPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { order: 'asc' },
      include: { category: true },
    }),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
    }),
  ]);

  return <ProductsTableClient data={products as any} categories={categories as any} />;
}
