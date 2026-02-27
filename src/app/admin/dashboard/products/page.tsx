import { prisma } from '@/lib/db';
import ProductsTableClient from './ProductsTableClient';

export default async function ProductsListPage() {
  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
  });

  return <ProductsTableClient data={products} />;
}
