import type { Metadata } from 'next';
import { Suspense } from 'react';
import Collection from '@/components/Collection';
import { getProducts, getCollections } from '@/lib/db-queries';
import { locales, type Locale } from '@/lib/i18n';

export const revalidate = 60;

const SITE_URL = 'https://fanoir.vercel.app';
const ogLocaleMap: Record<string, string> = { ko: 'ko_KR', en: 'en_US', 'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW', ja: 'ja_JP' };

const collectionMeta: Record<Locale, { title: string; description: string }> = {
  ko: {
    title: 'Collection — 컬렉션',
    description: 'FANOIR 전체 컬렉션을 만나보세요. 콘서트 시즌, 올블랙 에디션, 파스텔 드림 등 다양한 테마의 팬덤 굿즈.',
  },
  en: {
    title: 'Collection',
    description: 'Explore all FANOIR collections. Concert season, all-black edition, pastel dream and more themed fandom goods.',
  },
  'zh-CN': {
    title: 'Collection — 系列',
    description: '浏览FANOIR全部系列。演唱会季节、全黑版、梦幻粉彩等多种主题粉丝周边。',
  },
  'zh-TW': {
    title: 'Collection — 系列',
    description: '瀏覽FANOIR全部系列。演唱會季節、全黑版、夢幻粉彩等多種主題粉絲周邊。',
  },
  ja: {
    title: 'Collection — コレクション',
    description: 'FANOIRの全コレクションをご覧ください。コンサートシーズン、オールブラック、パステルドリームなどテーマ別ファンダムグッズ。',
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
        locales.map((l) => [ogLocaleMap[l]?.replace('_', '-') || l, `${SITE_URL}/${l}/collection`])
      ),
    },
  };
}

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
