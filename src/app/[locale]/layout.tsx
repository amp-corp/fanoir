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
    title: "FANOIR — 덕질하는 순간, 파누아와 함께 | 팬덤 굿즈 브랜드",
    description: "FANOIR(파누아)는 팬이 직접 만드는 케이팝 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 미니슬로건, 스크런치, 키링 등 핸드메이드 팬 굿즈.",
    keywords: ["FANOIR", "파누아", "팬덤 굿즈", "케이팝 굿즈", "인형옷", "응원용품", "미니슬로건", "우치와커버", "스크런치", "키링", "아이돌 굿즈", "팬덤 브랜드", "세련된 굿즈"],
    ogLocale: "ko_KR",
    ogTitle: "FANOIR — 덕질하는 순간, 파누아와 함께",
    ogDesc: "팬이 직접 만드는 팬덤 굿즈 브랜드 FANOIR. 인형옷, 응원용품, 미니슬로건, 스크런치, 키링 등 핸드메이드 팬 굿즈.",
    twitterDesc: "팬이 직접 만드는 팬덤 굿즈 브랜드 FANOIR. 콘서트도, 인형 꾸미기도, 덕질의 모든 장면을 더 특별하게.",
  },
  en: {
    title: "FANOIR — Every fan moment, with FANOIR | K-Pop Fan Goods",
    description: "FANOIR is a K-pop fan goods brand made by fans, for fans. Handmade doll clothes, cheering items, mini slogans, scrunchies, keyrings and more.",
    keywords: ["FANOIR", "K-pop goods", "fandom merchandise", "doll clothes", "cheering items", "concert goods", "kpop fan goods", "premium fan merchandise"],
    ogLocale: "en_US",
    ogTitle: "FANOIR — Every fan moment, with FANOIR",
    ogDesc: "K-pop fan goods brand made by fans. Handmade doll clothes, cheering items, mini slogans, scrunchies, keyrings and more.",
    twitterDesc: "K-pop fan goods by fans, for fans. From concerts to doll styling — making every fan moment special.",
  },
  'zh-CN': {
    title: "FANOIR — 追星的每一刻，与FANOIR同行 | 粉丝周边品牌",
    description: "FANOIR是由粉丝打造的K-pop周边品牌。手工娃衣、应援用品、迷你横幅、发圈、钥匙扣等。",
    keywords: ["FANOIR", "K-pop周边", "粉丝应援", "娃衣", "应援用品", "演唱会周边", "追星周边", "手工周边"],
    ogLocale: "zh_CN",
    ogTitle: "FANOIR — 追星的每一刻，与FANOIR同行",
    ogDesc: "由粉丝打造的K-pop周边品牌FANOIR。手工娃衣、应援用品、迷你横幅、发圈、钥匙扣等。",
    twitterDesc: "粉丝为粉丝打造的K-pop周边。从演唱会到日常，让追星的每一刻更特别。",
  },
  'zh-TW': {
    title: "FANOIR — 追星的每一刻，與FANOIR同行 | 粉絲周邊品牌",
    description: "FANOIR是由粉絲打造的K-pop周邊品牌。手工娃衣、應援用品、迷你橫幅、髮圈、鑰匙圈等。",
    keywords: ["FANOIR", "K-pop周邊", "粉絲應援", "娃衣", "應援用品", "演唱會周邊", "追星周邊", "手工周邊"],
    ogLocale: "zh_TW",
    ogTitle: "FANOIR — 追星的每一刻，與FANOIR同行",
    ogDesc: "由粉絲打造的K-pop周邊品牌FANOIR。手工娃衣、應援用品、迷你橫幅、髮圈、鑰匙圈等。",
    twitterDesc: "粉絲為粉絲打造的K-pop周邊。從演唱會到日常，讓追星的每一刻更特別。",
  },
  ja: {
    title: "FANOIR — 推し活の瞬間、FANOIRと一緒に | K-Popファンダムグッズブランド",
    description: "FANOIRはファンが直接作るK-popファンダムグッズブランドです。ぬい服、応援グッズ、ミニスローガン、シュシュ、キーリングなどハンドメイドファングッズ。",
    keywords: ["FANOIR", "K-popグッズ", "ファンダムグッズ", "ぬい服", "応援グッズ", "コンサートグッズ", "推し活グッズ", "ハンドメイドグッズ"],
    ogLocale: "ja_JP",
    ogTitle: "FANOIR — 推し活の瞬間、FANOIRと一緒に",
    ogDesc: "ファンが直接作るK-popファンダムグッズブランドFANOIR。ぬい服、応援グッズ、ミニスローガン、シュシュ、キーリングなど。",
    twitterDesc: "ファンがファンのために作るK-popグッズ。コンサートも、ぬいデコも、推し活のすべてをもっと特別に。",
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
      apple: "/icon.svg",
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: alternateLocales,
      url: `${SITE_URL}/${locale}`,
      siteName: "FANOIR",
      title: meta.ogTitle,
      description: meta.ogDesc,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "FANOIR — Fan + Noir",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.twitterDesc,
      images: ["/og-image.png"],
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
        description: meta.description,
        slogan: meta.ogTitle,
        foundingDate: "2025",
        sameAs: ["https://instagram.com/fanoir.official"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@fanoir.com",
          contactType: "customer service",
          availableLanguage: ["Korean", "English", "Chinese"],
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
