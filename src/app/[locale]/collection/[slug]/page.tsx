import { notFound } from 'next/navigation';
import CollectionDetail from '@/components/CollectionDetail';
import { getCollectionBySlug, getCollectionSlugs } from '@/lib/db-queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CollectionSlugPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const collection = await getCollectionBySlug(slug, locale);

  if (!collection) {
    notFound();
  }

  return (
    <div className="pt-16">
      <CollectionDetail collection={collection} />
    </div>
  );
}
