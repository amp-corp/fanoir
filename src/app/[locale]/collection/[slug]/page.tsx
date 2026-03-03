import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionDetail from '@/components/CollectionDetail';
import { getCollectionBySlug, getCollectionSlugs } from '@/lib/db-queries';
import { locales, type Locale } from '@/lib/i18n';

export const revalidate = 60;

const SITE_URL = 'https://fanoir.vercel.app';
const ogLocaleMap: Record<string, string> = { ko: 'ko_KR', en: 'en_US', 'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW', ja: 'ja_JP' };

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const collection = await getCollectionBySlug(slug, locale);
  if (!collection) return {};

  const title = `${collection.title} | FANOIR`;
  const description = collection.desc;
  const url = `${SITE_URL}/${locale}/collection/${slug}`;
  const ogLocale = ogLocaleMap[locale] || 'ko_KR';

  return {
    title: collection.title,
    description,
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url,
      siteName: 'FANOIR',
      title,
      description,
      images: [{ url: collection.image, width: 1200, height: 630, alt: collection.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [collection.image],
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [ogLocaleMap[l]?.replace('_', '-') || l, `${SITE_URL}/${l}/collection/${slug}`])
      ),
    },
  };
}

function buildCollectionStructuredData(
  collection: NonNullable<Awaited<ReturnType<typeof getCollectionBySlug>>>,
  locale: string,
) {
  const url = `${SITE_URL}/${locale}/collection/${collection.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collectionpage`,
        url,
        name: collection.title,
        description: collection.desc,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        image: collection.image,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'FANOIR', item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Collection', item: `${SITE_URL}/${locale}/collection` },
          { '@type': 'ListItem', position: 3, name: collection.title, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        name: collection.title,
        numberOfItems: collection.products.length,
        itemListElement: collection.products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            image: p.image,
            offers: {
              '@type': 'Offer',
              price: p.price.replace(/[^0-9]/g, ''),
              priceCurrency: 'KRW',
              availability: p.comingSoon
                ? 'https://schema.org/PreOrder'
                : 'https://schema.org/InStock',
            },
          },
        })),
      },
    ],
  };
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCollectionStructuredData(collection, locale)),
        }}
      />
      <CollectionDetail collection={collection} />
    </div>
  );
}
