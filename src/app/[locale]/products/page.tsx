import type { Metadata } from 'next';
import { Suspense } from 'react';
import Products from '@/components/Products';
import { getProducts, getCollections, getCategories } from '@/lib/db-queries';
import { locales, type Locale } from '@/lib/i18n';
import type { ProductForDisplay } from '@/lib/db-queries';

export const revalidate = 60;

const SITE_URL = 'https://fanoir.kr';
const ogLocaleMap: Record<string, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  ja: 'ja_JP',
};

const productsMeta: Record<Locale, { title: string; description: string }> = {
  ko: {
    title: '전체 상품',
    description:
      'FANOIR의 전체 상품을 만나보세요. 인형옷, 응원용품, 미니슬로건, 스크런치, 키링 등 팬이 직접 기획한 핸드메이드 케이팝 팬덤 굿즈.',
  },
  en: {
    title: 'All Products',
    description:
      'Browse all FANOIR products. Handmade K-pop fan goods including doll clothes, cheering items, mini slogans, scrunchies, keyrings and more.',
  },
  'zh-CN': {
    title: '全部商品',
    description:
      '浏览FANOIR全部商品。娃衣、应援用品、迷你横幅、发圈、钥匙扣等粉丝手工制作的K-pop周边。',
  },
  'zh-TW': {
    title: '全部商品',
    description:
      '瀏覽FANOIR全部商品。娃衣、應援用品、迷你橫幅、髮圈、鑰匙圈等粉絲手工製作的K-pop周邊。',
  },
  ja: {
    title: '全商品',
    description:
      'FANOIRの全商品をご覧ください。ぬい服、応援グッズ、ミニスローガン、シュシュ、キーリングなどファンによるハンドメイドK-popグッズ。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = productsMeta[locale as Locale] ?? productsMeta.ko;
  const url = `${SITE_URL}/${locale}/products`;

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
          `${SITE_URL}/${l}/products`,
        ]),
      ),
    },
  };
}

function buildProductsStructuredData(products: ProductForDisplay[], locale: string) {
  const meta = productsMeta[locale as Locale] ?? productsMeta.ko;
  const url = `${SITE_URL}/${locale}/products`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#productspage`,
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
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            image: p.image,
            brand: { '@type': 'Brand', name: 'FANOIR' },
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

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [products, collections, categories] = await Promise.all([
    getProducts(locale),
    getCollections(locale),
    getCategories(locale),
  ]);

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductsStructuredData(products, locale)),
        }}
      />
      <Suspense>
        <Products products={products} collections={collections} categories={categories} />
      </Suspense>
    </div>
  );
}
