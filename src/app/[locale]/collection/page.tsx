import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCollections } from '@/lib/db-queries';
import type { CollectionForDisplay } from '@/lib/db-queries';
import Collection from '@/components/Collection';
import { locales, type Locale } from '@/lib/i18n';

export const revalidate = 60;

const SITE_URL = 'https://fanoir.kr';
const ogLocaleMap: Record<string, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  ja: 'ja_JP',
};

const collectionMeta: Record<Locale, { title: string; description: string }> = {
  ko: {
    title: '컬렉션',
    description:
      'FANOIR 전체 컬렉션을 만나보세요. 콘서트 시즌, 올블랙 에디션, 파스텔 드림 등 다양한 테마의 케이팝 팬덤 굿즈 컬렉션.',
  },
  en: {
    title: 'Collections',
    description:
      'Explore all FANOIR collections. Concert season, all-black edition, pastel dream and more themed K-pop fandom goods.',
  },
  'zh-CN': {
    title: '系列',
    description:
      '浏览FANOIR全部系列。演唱会季节、全黑版、梦幻粉彩等多种主题K-pop粉丝周边系列。',
  },
  'zh-TW': {
    title: '系列',
    description:
      '瀏覽FANOIR全部系列。演唱會季節、全黑版、夢幻粉彩等多種主題K-pop粉絲周邊系列。',
  },
  ja: {
    title: 'コレクション',
    description:
      'FANOIRの全コレクションをご覧ください。コンサートシーズン、オールブラック、パステルドリームなどテーマ別K-popファンダムグッズ。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = collectionMeta[locale as Locale] ?? collectionMeta.ko;
  const url = `${SITE_URL}/${locale}/collection`;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: 'website',
      locale: ogLocaleMap[locale] || 'ko_KR',
      url,
      siteName: 'FANOIR',
      title: `${meta.title} | FANOIR`,
      description: meta.description,
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [
          ogLocaleMap[l]?.replace('_', '-') || l,
          `${SITE_URL}/${l}/collection`,
        ]),
      ),
    },
  };
}

function buildCollectionListStructuredData(
  collections: CollectionForDisplay[],
  locale: string,
) {
  const meta = collectionMeta[locale as Locale] ?? collectionMeta.ko;
  const url = `${SITE_URL}/${locale}/collection`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collectionlist`,
        url,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'FANOIR', item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: meta.title, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        name: meta.title,
        numberOfItems: collections.length,
        itemListElement: collections.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CollectionPage',
            name: c.title,
            description: c.desc,
            image: c.image,
            url: `${SITE_URL}/${locale}/collection/${c.slug}`,
          },
        })),
      },
    ],
  };
}

export default async function CollectionAllPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const collections = await getCollections(locale);

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCollectionListStructuredData(collections, locale)),
        }}
      />
      <Suspense>
        <Collection collections={collections} />
      </Suspense>
    </div>
  );
}
