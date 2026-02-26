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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isKo
        ? "FANOIR — 덕질하는 순간, 파누아와 함께 | 팬덤 굿즈 브랜드"
        : "FANOIR — Every fan moment, with FANOIR | K-Pop Fan Goods",
      template: "%s | FANOIR",
    },
    description: isKo
      ? "FANOIR(파누아)는 팬이 직접 만드는 케이팝 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 미니슬로건, 스크런치, 키링 등 핸드메이드 팬 굿즈."
      : "FANOIR is a K-pop fan goods brand made by fans, for fans. Handmade doll clothes, cheering items, mini slogans, scrunchies, keyrings and more.",
    keywords: isKo
      ? [
          "FANOIR", "파누아", "팬덤 굿즈", "케이팝 굿즈",
          "인형옷", "응원용품", "미니슬로건", "우치와커버", "스크런치", "키링",
          "아이돌 굿즈", "팬덤 브랜드", "세련된 굿즈",
        ]
      : [
          "FANOIR", "K-pop goods", "fandom merchandise",
          "doll clothes", "cheering items", "concert goods",
          "kpop fan goods", "premium fan merchandise",
        ],
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
      locale: isKo ? "ko_KR" : "en_US",
      alternateLocale: isKo ? "en_US" : "ko_KR",
      url: `${SITE_URL}/${locale}`,
      siteName: "FANOIR",
      title: isKo
        ? "FANOIR — 덕질하는 순간, 파누아와 함께"
        : "FANOIR — Every fan moment, with FANOIR",
      description: isKo
        ? "팬이 직접 만드는 팬덤 굿즈 브랜드 FANOIR. 인형옷, 응원용품, 미니슬로건, 스크런치, 키링 등 핸드메이드 팬 굿즈."
        : "K-pop fan goods brand made by fans. Handmade doll clothes, cheering items, mini slogans, scrunchies, keyrings and more.",
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
      title: isKo
        ? "FANOIR — 덕질하는 순간, 파누아와 함께"
        : "FANOIR — Every fan moment, with FANOIR",
      description: isKo
        ? "팬이 직접 만드는 팬덤 굿즈 브랜드 FANOIR. 콘서트도, 인형 꾸미기도, 덕질의 모든 장면을 더 특별하게."
        : "K-pop fan goods by fans, for fans. From concerts to doll styling — making every fan moment special.",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        "ko-KR": `${SITE_URL}/ko`,
        "en-US": `${SITE_URL}/en`,
      },
    },
    category: "shopping",
  };
}

function buildStructuredData(locale: Locale) {
  const isKo = locale === "ko";

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
        description: isKo
          ? "FANOIR(파누아)는 팬이 직접 만드는 케이팝 팬덤 굿즈 브랜드입니다."
          : "FANOIR is a K-pop fan goods brand made by fans, for fans.",
        slogan: isKo ? "덕질하는 순간, 파누아와 함께." : "Every fan moment, with FANOIR.",
        foundingDate: "2025",
        sameAs: ["https://instagram.com/fanoir.official"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@fanoir.com",
          contactType: "customer service",
          availableLanguage: ["Korean", "English"],
        },
        brand: { "@type": "Brand", name: "FANOIR", slogan: isKo ? "덕질하는 순간, 파누아와 함께." : "Every fan moment, with FANOIR." },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "FANOIR",
        description: isKo
          ? "팬이 직접 만드는 팬덤 굿즈 브랜드"
          : "K-pop fan goods brand made by fans",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: [locale === "ko" ? "ko-KR" : "en-US"],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${locale}/#webpage`,
        url: `${SITE_URL}/${locale}`,
        name: isKo ? "FANOIR — 덕질하는 순간, 파누아와 함께" : "FANOIR — Every fan moment, with FANOIR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: locale === "ko" ? "ko-KR" : "en-US",
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
