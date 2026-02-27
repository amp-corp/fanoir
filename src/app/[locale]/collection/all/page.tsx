import { Suspense } from 'react';
import CollectionAll from '@/components/CollectionAll';
import { getCollections } from '@/lib/db-queries';

export const revalidate = 60;

export default async function CollectionAllPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const collections = await getCollections(locale);

  return (
    <div className="pt-16">
      <Suspense>
        <CollectionAll collections={collections} />
      </Suspense>
    </div>
  );
}
