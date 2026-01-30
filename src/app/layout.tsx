import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://fanoir.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FANOIR — Fandom, refined. | 세련된 팬덤 굿즈 브랜드",
    template: "%s | FANOIR",
  },
  description:
    "FANOIR(파누아)는 Fan + Noir, 세련되고 품격 있는 케이팝 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 스크런치, 키링 등 고퀄리티 팬 굿즈를 만듭니다. Fandom, refined.",
  keywords: [
    "FANOIR", "파누아", "팬덤 굿즈", "케이팝 굿즈", "K-pop goods",
    "인형옷", "응원용품", "미니슬로건", "우치와커버", "스크런치", "키링",
    "아이돌 굿즈", "팬덤 브랜드", "세련된 굿즈", "fandom merchandise",
    "kpop fan goods", "doll clothes", "cheering items", "concert goods",
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
    locale: "ko_KR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "FANOIR",
    title: "FANOIR — Fandom, refined.",
    description:
      "세련되고 품격 있는 팬덤 굿즈 브랜드 FANOIR. 인형옷, 응원용품, 스크런치, 키링 등 고퀄리티 케이팝 팬 굿즈.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FANOIR — Fandom, refined.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FANOIR — Fandom, refined.",
    description:
      "세련되고 품격 있는 팬덤 굿즈 브랜드 FANOIR. 덕질을 세련되게.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ko-KR": SITE_URL,
      "en-US": SITE_URL,
    },
  },
  category: "shopping",
  verification: {
    // google: "your-google-verification-code",
    // other: { "naver-site-verification": "your-naver-code" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "FANOIR",
                  alternateName: "파누아",
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/logo.png`,
                  },
                  description:
                    "FANOIR는 Fan + Noir, 세련되고 품격 있는 케이팝 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 패션 액세서리 등 고퀄리티 팬 굿즈를 제작합니다.",
                  slogan: "Fandom, refined. 덕질을 세련되게.",
                  foundingDate: "2025",
                  sameAs: [
                    "https://instagram.com/fanoir.official",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "contact@fanoir.com",
                    contactType: "customer service",
                    availableLanguage: ["Korean", "English"],
                  },
                  brand: {
                    "@type": "Brand",
                    name: "FANOIR",
                    slogan: "Fandom, refined.",
                  },
                  knowsAbout: [
                    "K-pop fandom goods",
                    "Doll clothes and accessories",
                    "Concert cheering items",
                    "Fan merchandise",
                    "케이팝 팬덤 굿즈",
                    "인형옷",
                    "응원용품",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "FANOIR",
                  description:
                    "세련되고 품격 있는 팬덤 굿즈 브랜드",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: ["ko-KR", "en-US"],
                },
                {
                  "@type": "WebPage",
                  "@id": `${SITE_URL}/#webpage`,
                  url: SITE_URL,
                  name: "FANOIR — Fandom, refined.",
                  isPartOf: { "@id": `${SITE_URL}/#website` },
                  about: { "@id": `${SITE_URL}/#organization` },
                  description:
                    "FANOIR(파누아)는 세련되고 품격 있는 케이팝 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 스크런치, 키링 등 고퀄리티 팬 굿즈.",
                  inLanguage: "ko-KR",
                },
                {
                  "@type": "ItemList",
                  name: "FANOIR 제품 라인업",
                  description: "FANOIR의 팬덤 굿즈 제품 카테고리",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "인형 관련",
                      description: "인형옷, 인형 액세서리 — 최애 인형을 더 특별하게. 섬세한 디테일과 고급 소재.",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "응원 용품",
                      description: "미니 슬로건, 우치와 커버 — 콘서트장에서 빛나는 세련된 응원 용품.",
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "패션/액세서리",
                      description: "스크런치, 키링 — 일상에서도 세련된 팬심을 담은 아이템.",
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: "확장 예정",
                      description: "포토카드 바인더, 콘서트 용품 등 새로운 카테고리.",
                    },
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "FANOIR(파누아)는 어떤 브랜드인가요?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "FANOIR는 Fan + Noir(프랑스어로 검정/세련됨)의 조합으로, 세련되고 품격 있는 케이팝 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 패션 액세서리 등 고퀄리티 팬 굿즈를 제작합니다.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "FANOIR에서는 어떤 제품을 판매하나요?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "인형옷과 인형 액세서리, 미니 슬로건과 우치와 커버 등 응원용품, 스크런치와 키링 등 패션 액세서리를 판매합니다. 포토카드 바인더, 콘서트 용품 등도 확장 예정입니다.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "FANOIR 제품의 특징은 무엇인가요?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "FANOIR는 '덕질을 세련되게'라는 미션 아래, 유치하지 않고 어른스럽고 세련된 디자인의 고퀄리티 굿즈를 만듭니다. 국내 제작, 품질 검수 완료 제품이며, 미니멀하고 깔끔한 디자인이 특징입니다.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is FANOIR?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "FANOIR is a refined K-pop fandom goods brand. The name combines 'Fan' and 'Noir' (French for black/sophistication). We create high-quality, elegant merchandise including doll clothes, cheering items, scrunchies, and keyrings — designed for fans who appreciate quality.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "FANOIR 문의는 어떻게 하나요?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "이메일 contact@fanoir.com 또는 인스타그램 @fanoir.official을 통해 1:1 문의가 가능합니다.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
