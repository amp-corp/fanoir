import Hero from "@/components/Hero";
import Identity from "@/components/Identity";
import Showcase from "@/components/Showcase";
import { getProducts, getSiteImages } from "@/lib/db-queries";
import type { ProductForDisplay } from "@/lib/db-queries";
import type { Locale } from "@/lib/i18n";

export const revalidate = 60;

const SITE_URL = "https://fanoir.vercel.app";

const faqMap: Record<Locale, { q: string; a: string }[]> = {
  ko: [
    { q: "FANOIR(파누아)는 어떤 브랜드인가요?", a: "FANOIR(파누아)는 팬이 직접 만드는 K-pop 팬덤 굿즈 브랜드입니다. 인형옷, 응원용품, 미니슬로건, 스크런치, 키링 등 핸드메이드 아이템을 제작합니다." },
    { q: "어떤 상품을 판매하나요?", a: "인형옷(돌 클로즈), 응원봉 꾸미기 용품, 미니슬로건, 우치와 커버, 스크런치, 키링 등 다양한 팬덤 굿즈를 판매합니다." },
    { q: "해외 배송이 가능한가요?", a: "네, FANOIR는 해외 배송을 지원합니다. 한국어, 영어, 중국어(간체/번체), 일본어 5개 언어로 서비스를 제공합니다." },
  ],
  en: [
    { q: "What is FANOIR?", a: "FANOIR is a K-pop fandom goods brand made by fans, for fans. We create handmade doll clothes, cheering items, mini slogans, scrunchies, keyrings and more." },
    { q: "What products does FANOIR sell?", a: "We sell doll clothes, lightstick accessories, mini slogans, uchiwa covers, scrunchies, keyrings, and various fan merchandise for K-pop fans." },
    { q: "Does FANOIR ship internationally?", a: "Yes, FANOIR supports international shipping. Our website is available in Korean, English, Chinese (Simplified/Traditional), and Japanese." },
  ],
  'zh-CN': [
    { q: "FANOIR是什么品牌？", a: "FANOIR是由粉丝为粉丝打造的K-pop周边品牌。我们制作手工娃衣、应援用品、迷你横幅、发圈、钥匙扣等。" },
    { q: "FANOIR卖什么产品？", a: "我们销售娃衣、应援棒配饰、迷你横幅、团扇套、发圈、钥匙扣等各种K-pop粉丝周边。" },
    { q: "FANOIR支持国际配送吗？", a: "是的，FANOIR支持国际配送。网站提供韩语、英语、中文（简体/繁体）和日语服务。" },
  ],
  'zh-TW': [
    { q: "FANOIR是什麼品牌？", a: "FANOIR是由粉絲為粉絲打造的K-pop周邊品牌。我們製作手工娃衣、應援用品、迷你橫幅、髮圈、鑰匙圈等。" },
    { q: "FANOIR賣什麼產品？", a: "我們銷售娃衣、應援棒配飾、迷你橫幅、團扇套、髮圈、鑰匙圈等各種K-pop粉絲周邊。" },
    { q: "FANOIR支持國際配送嗎？", a: "是的，FANOIR支持國際配送。網站提供韓語、英語、中文（簡體/繁體）和日語服務。" },
  ],
  ja: [
    { q: "FANOIRとはどんなブランドですか？", a: "FANOIRはファンがファンのために作るK-popファンダムグッズブランドです。ぬい服、応援グッズ、ミニスローガン、シュシュ、キーリングなどを制作しています。" },
    { q: "どんな商品を販売していますか？", a: "ぬい服、ペンライトデコ用品、ミニスローガン、うちわカバー、シュシュ、キーリングなど様々なファンダムグッズを販売しています。" },
    { q: "海外配送は可能ですか？", a: "はい、FANOIRは海外配送に対応しています。韓国語、英語、中国語（簡体/繁体）、日本語の5言語でサービスを提供しています。" },
  ],
};

function buildHomeStructuredData(products: ProductForDisplay[], locale: string) {
  const faqs = faqMap[locale as Locale] ?? faqMap.ko;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'FANOIR Products',
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
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [products, siteImages] = await Promise.all([
    getProducts(locale),
    getSiteImages(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHomeStructuredData(products, locale)),
        }}
      />
      <Hero heroImage={siteImages.hero_image} />
      <Identity />
      <Showcase
        products={products}
        signatureImage1={siteImages.signature_image_1}
        signatureImage2={siteImages.signature_image_2}
      />
    </>
  );
}
