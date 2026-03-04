import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Noto_Sans } from "next/font/google";
import { locales, type Locale } from "@/lib/i18n";
import ClientLayout from "@/components/ClientLayout";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto" });

const SITE_URL = "https://fanoir.vercel.app";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const metaMap: Record<Locale, {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  ogTitle: string;
  ogDesc: string;
  twitterDesc: string;
}> = {
  ko: {
    title: "FANOIR — 응원하는 모든 순간, 파누아와 함께 | 케이팝 팬덤 굿즈",
    description: "FANOIR(파누아)는 팬이 직접 기획하는 케이팝 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 미니슬로건, 스크런치, 키링 등 핸드메이드 팬 굿즈.",
    keywords: ["FANOIR", "파누아", "팬덤 굿즈", "케이팝 굿즈", "인형옷", "응원용품", "미니슬로건", "우치와커버", "스크런치", "키링", "아이돌 굿즈", "콘서트 굿즈", "응원봉 꾸미기", "핸드메이드 굿즈"],
    ogLocale: "ko_KR",
    ogTitle: "FANOIR — 응원하는 모든 순간, 파누아와 함께",
    ogDesc: "좋아하는 마음, 가장 예쁘게. 인형옷부터 응원용품, 키링까지 — 팬이 직접 기획한 핸드메이드 케이팝 굿즈 브랜드.",
    twitterDesc: "응원하는 모든 순간, 파누아와 함께. 인형옷, 응원용품, 키링 — 콘서트장에서 직접 써본 것들만 모았어요.",

  },
  en: {
    title: "FANOIR — Every moment you cheer, with FANOIR | K-Pop Fan Goods",
    description: "FANOIR is a K-pop fan goods brand made by fans. Handmade doll clothes, cheering items, mini slogans, scrunchies, keyrings and more — tested at real concerts.",
    keywords: ["FANOIR", "K-pop goods", "fandom merchandise", "doll clothes", "cheering items", "concert goods", "kpop fan goods", "lightstick accessories", "idol merchandise", "handmade fan goods"],
    ogLocale: "en_US",
    ogTitle: "FANOIR — Every moment you cheer, with FANOIR",
    ogDesc: "Your love, beautifully made. Handmade doll clothes, cheering items, keyrings — K-pop fan goods by fans, for fans.",
    twitterDesc: "Every moment you cheer, with FANOIR. Doll clothes, cheering items, keyrings — we brought them to concerts and only kept what works.",

  },
  'zh-CN': {
    title: "FANOIR — 应援的每个瞬间，与FANOIR一起 | K-pop粉丝周边",
    description: "FANOIR是由粉丝打造的K-pop周边品牌。手工娃衣、应援用品、迷你横幅、发圈、钥匙扣等，演唱会实测好物。",
    keywords: ["FANOIR", "K-pop周边", "粉丝应援", "娃衣", "应援用品", "演唱会周边", "追星周边", "手工周边", "应援棒配饰", "粉丝手工"],
    ogLocale: "zh_CN",
    ogTitle: "FANOIR — 应援的每个瞬间，与FANOIR一起",
    ogDesc: "喜欢的心情，最好看地呈现。娃衣、应援用品、钥匙扣等粉丝手工制作的K-pop周边品牌。",
    twitterDesc: "应援的每个瞬间，与FANOIR一起。娃衣、应援用品、钥匙扣——带去演唱会用过的好东西。",

  },
  'zh-TW': {
    title: "FANOIR — 應援的每個瞬間，與FANOIR一起 | K-pop粉絲周邊",
    description: "FANOIR是由粉絲打造的K-pop周邊品牌。手工娃衣、應援用品、迷你橫幅、髮圈、鑰匙圈等，演唱會實測好物。",
    keywords: ["FANOIR", "K-pop周邊", "粉絲應援", "娃衣", "應援用品", "演唱會周邊", "追星周邊", "手工周邊", "應援棒配飾", "粉絲手工"],
    ogLocale: "zh_TW",
    ogTitle: "FANOIR — 應援的每個瞬間，與FANOIR一起",
    ogDesc: "喜歡的心情，最好看地呈現。娃衣、應援用品、鑰匙圈等粉絲手工製作的K-pop周邊品牌。",
    twitterDesc: "應援的每個瞬間，與FANOIR一起。娃衣、應援用品、鑰匙圈——帶去演唱會用過的好東西。",

  },
  ja: {
    title: "FANOIR — 応援するすべての瞬間、FANOIRと一緒に | K-popファングッズ",
    description: "FANOIRはファンが直接企画するK-popファンダムグッズブランドです。ぬい服、応援グッズ、ミニスローガン、シュシュ、キーリングなどハンドメイドファングッズ。",
    keywords: ["FANOIR", "K-popグッズ", "ファンダムグッズ", "ぬい服", "応援グッズ", "コンサートグッズ", "推し活グッズ", "ハンドメイドグッズ", "ペンラデコ", "アイドルグッズ"],
    ogLocale: "ja_JP",
    ogTitle: "FANOIR — 応援するすべての瞬間、FANOIRと一緒に",
    ogDesc: "好きな気持ち、いちばんかわいく。ぬい服、応援グッズ、キーリングなどファンによるハンドメイドK-popグッズブランド。",
    twitterDesc: "応援するすべての瞬間、FANOIRと一緒に。ぬい服、応援グッズ、キーリング——ライブで使ってよかったものだけ。",

  },
};

const ogLocaleMap: Record<Locale, string> = { ko: "ko_KR", en: "en_US", 'zh-CN': "zh_CN", 'zh-TW': "zh_TW", ja: "ja_JP" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaMap[locale as Locale] ?? metaMap.ko;
  const alternateLocales = locales.filter((l) => l !== locale).map((l) => ogLocaleMap[l]);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: "%s | FANOIR",
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "FANOIR" }],
    creator: "FANOIR",
    publisher: "FANOIR",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: alternateLocales,
      url: `${SITE_URL}/${locale}`,
      siteName: "FANOIR",
      title: meta.ogTitle,
      description: meta.ogDesc,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.twitterDesc,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [ogLocaleMap[l].replace("_", "-"), `${SITE_URL}/${l}`])
      ),
    },
    category: "shopping",
  };
}

function buildStructuredData(locale: Locale) {
  const meta = metaMap[locale] ?? metaMap.ko;
  const langTag = ogLocaleMap[locale]?.replace("_", "-") ?? "ko-KR";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "FANOIR",
        alternateName: "파누아",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        image: `${SITE_URL}/hero-bg.jpg`,
        description: meta.description,
        slogan: meta.ogTitle,
        foundingDate: "2025",
        sameAs: ["https://instagram.com/fanoir.official"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@fanoir.com",
          contactType: "customer service",
          availableLanguage: ["Korean", "English", "Chinese", "Japanese"],
        },
        brand: { "@type": "Brand", name: "FANOIR", slogan: meta.ogTitle },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "FANOIR",
        description: meta.ogDesc,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: [langTag],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${locale}/#webpage`,
        url: `${SITE_URL}/${locale}`,
        name: meta.ogTitle,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: langTag,
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData(locale as Locale)),
          }}
        />
      </head>
      <body className={`${manrope.variable} ${notoSans.variable}`}>
        <ClientLayout locale={locale as Locale}>{children}</ClientLayout>
      </body>
    </html>
  );
}
