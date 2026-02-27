import { Suspense } from 'react';
import Collection from '@/components/Collection';
import { getProducts, getCollections } from '@/lib/db-queries';

export const revalidate = 60;

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [products, collections] = await Promise.all([
    getProducts(locale),
    getCollections(locale),
  ]);

  return (
    <div className="pt-16">
      <Suspense>
        <Collection products={products} collections={collections} />
      </Suspense>
    </div>
  );
}
