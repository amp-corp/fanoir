import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Category mapping: localized name → canonical key
const categoryMap: Record<string, string> = {
  // ko
  '인형': 'dolls',
  '응원용품': 'cheering',
  '패션소품': 'fashion',
  '키링/참': 'keyrings',
  // en
  'Dolls': 'dolls',
  'Cheering': 'cheering',
  'Fashion': 'fashion',
  'Keyrings & Charms': 'keyrings',
  // zh-CN
  '娃娃': 'dolls',
  '应援用品': 'cheering',
  '时尚配饰': 'fashion',
  '钥匙扣/吊饰': 'keyrings',
  // zh-TW
  '應援用品': 'cheering',
  '時尚配飾': 'fashion',
  '鑰匙圈/吊飾': 'keyrings',
  // ja
  'ぬいぐるみ': 'dolls',
  '応援グッズ': 'cheering',
  'ファッション小物': 'fashion',
  'キーリング/チャーム': 'keyrings',
};

const productImages = [
  { image: '/collection/item-1.jpg', badgeColor: 'bg-red-500' },
  { image: '/collection/item-2.jpg', badgeColor: null },
  { image: '/collection/item-3.jpg', badgeColor: null },
  { image: '/collection/item-4.jpg', badgeColor: 'bg-[#d0b476]' },
  { image: '/collection/item-5.jpg', badgeColor: null },
  { image: '/collection/item-6.jpg', badgeColor: null },
  { image: '/collection/item-7.jpg', badgeColor: null },
  { image: '/collection/item-8.jpg', badgeColor: null },
];

// Hardcoded product data per locale (from i18n.ts)
const productsPerLocale = {
  ko: [
    { name: '벨벳 원피스 세트', price: '₩45,000', category: '인형', badge: 'HOT' },
    { name: '데님 에어포트 룩', price: '₩38,000', category: '인형' },
    { name: '미니슬로건', price: '₩15,000', category: '응원용품', badge: 'NEW' },
    { name: '라이트스틱 스트랩', price: '₩18,000', category: '응원용품' },
    { name: '파스텔 가디건', price: '₩32,000', category: '인형' },
    { name: '벨벳 스크런치', price: '₩12,000', category: '패션소품' },
    { name: '우치와커버', price: '₩8,000', category: '응원용품' },
    { name: '아크릴 키링 세트', price: '₩10,000', category: '키링/참' },
  ],
  en: [
    { name: 'Velvet Dress Set', price: '$40.00', category: 'Dolls', badge: 'HOT' },
    { name: 'Denim Airport Look', price: '$33.00', category: 'Dolls' },
    { name: 'Mini Slogan Banner', price: '$12.00', category: 'Cheering', badge: 'NEW' },
    { name: 'Lightstick Strap', price: '$15.00', category: 'Cheering' },
    { name: 'Pastel Cardigan', price: '$28.00', category: 'Dolls' },
    { name: 'Velvet Scrunchie', price: '$10.00', category: 'Fashion' },
    { name: 'Uchiwa Fan Cover', price: '$7.00', category: 'Cheering' },
    { name: 'Acrylic Keyring Set', price: '$9.00', category: 'Keyrings & Charms' },
  ],
  'zh-CN': [
    { name: '丝绒连衣裙套装', price: '¥230', category: '娃娃', badge: 'HOT' },
    { name: '牛仔机场造型', price: '¥195', category: '娃娃' },
    { name: '迷你横幅', price: '¥75', category: '应援用品', badge: 'NEW' },
    { name: '荧光棒挂绳', price: '¥90', category: '应援用品' },
    { name: '柔色开衫', price: '¥165', category: '娃娃' },
    { name: '丝绒发圈', price: '¥60', category: '时尚配饰' },
    { name: '团扇保护套', price: '¥40', category: '应援用品' },
    { name: '亚克力钥匙扣套装', price: '¥50', category: '钥匙扣/吊饰' },
  ],
  'zh-TW': [
    { name: '絲絨洋裝套組', price: 'NT$1,350', category: '娃娃', badge: 'HOT' },
    { name: '丹寧機場造型', price: 'NT$1,140', category: '娃娃' },
    { name: '迷你橫幅', price: 'NT$450', category: '應援用品', badge: 'NEW' },
    { name: '螢光棒掛繩', price: 'NT$540', category: '應援用品' },
    { name: '粉彩開衫', price: 'NT$960', category: '娃娃' },
    { name: '絲絨髮圈', price: 'NT$360', category: '時尚配飾' },
    { name: '團扇保護套', price: 'NT$240', category: '應援用品' },
    { name: '壓克力鑰匙圈套組', price: 'NT$300', category: '鑰匙圈/吊飾' },
  ],
  ja: [
    { name: 'ベルベットワンピースセット', price: '¥5,500', category: 'ぬいぐるみ', badge: 'HOT' },
    { name: 'デニムエアポートルック', price: '¥4,600', category: 'ぬいぐるみ' },
    { name: 'ミニスローガン', price: '¥1,800', category: '応援グッズ', badge: 'NEW' },
    { name: 'ペンライトストラップ', price: '¥2,200', category: '応援グッズ' },
    { name: 'パステルカーディガン', price: '¥3,900', category: 'ぬいぐるみ' },
    { name: 'ベルベットシュシュ', price: '¥1,500', category: 'ファッション小物' },
    { name: 'うちわカバー', price: '¥1,000', category: '応援グッズ' },
    { name: 'アクリルキーリングセット', price: '¥1,200', category: 'キーリング/チャーム' },
  ],
};

const collabsPerLocale = {
  ko: [
    { slug: 'concert-season', label: 'NEW DROP', title: '콘서트 시즌 컬렉션', desc: '올해 콘서트 시즌을 위해 준비한 응원용품 & 인형 옷 특별 라인업.', cta: '컬렉션 보기' },
    { slug: 'all-black-edition', label: 'LIMITED EDITION', title: '올블랙 에디션', desc: '블랙 톤으로 통일한 한정판 시리즈. 슬로건, 스트랩, 스크런치까지.', cta: '컬렉션 보기' },
    { slug: 'pastel-dream', label: 'SEASONAL', title: '파스텔 드림', desc: '봄 시즌 한정 파스텔 톤 컬렉션. 가디건, 스크런치, 원피스까지.', cta: '컬렉션 보기' },
    { slug: 'summer-breeze', label: 'SUMMER', title: '썸머 브리즈', desc: '시원한 여름 컬렉션. 가벼운 소재와 산뜻한 컬러.', cta: '컬렉션 보기' },
    { slug: 'velvet-rose', label: 'PREMIUM', title: '벨벳 로즈', desc: '고급스러운 벨벳 소재의 프리미엄 라인.', cta: '컬렉션 보기' },
    { slug: 'midnight-glow', label: 'EXCLUSIVE', title: '미드나잇 글로우', desc: '야광 포인트가 돋보이는 콘서트 필수 컬렉션.', cta: '컬렉션 보기' },
    { slug: 'cherry-blossom', label: 'SPRING', title: '체리블라썸', desc: '벚꽃 시즌 한정 핑크 톤 시리즈.', cta: '컬렉션 보기' },
    { slug: 'golden-hour', label: 'COLLAB', title: '골든아워', desc: '골드 포인트로 완성한 특별 콜라보 컬렉션.', cta: '컬렉션 보기' },
  ],
  en: [
    { slug: 'concert-season', label: 'NEW DROP', title: 'Concert Season Collection', desc: 'Cheering items & doll outfits specially prepared for this concert season.', cta: 'Shop Collection' },
    { slug: 'all-black-edition', label: 'LIMITED EDITION', title: 'All Black Edition', desc: 'A limited series unified in black. Slogans, straps, scrunchies and more.', cta: 'Shop Collection' },
    { slug: 'pastel-dream', label: 'SEASONAL', title: 'Pastel Dream', desc: 'Spring-limited pastel tone collection. Cardigans, scrunchies, dresses and more.', cta: 'Shop Collection' },
    { slug: 'summer-breeze', label: 'SUMMER', title: 'Summer Breeze', desc: 'Cool summer collection. Light fabrics and fresh colors.', cta: 'Shop Collection' },
    { slug: 'velvet-rose', label: 'PREMIUM', title: 'Velvet Rose', desc: 'Premium line in luxurious velvet.', cta: 'Shop Collection' },
    { slug: 'midnight-glow', label: 'EXCLUSIVE', title: 'Midnight Glow', desc: 'Concert-essential collection with glow-in-the-dark accents.', cta: 'Shop Collection' },
    { slug: 'cherry-blossom', label: 'SPRING', title: 'Cherry Blossom', desc: 'Spring-limited pink tone series.', cta: 'Shop Collection' },
    { slug: 'golden-hour', label: 'COLLAB', title: 'Golden Hour', desc: 'Special collab collection finished with gold accents.', cta: 'Shop Collection' },
  ],
  'zh-CN': [
    { slug: 'concert-season', label: 'NEW DROP', title: '演唱会季系列', desc: '为今年演唱会季准备的应援用品和娃衣特别系列。', cta: '查看系列' },
    { slug: 'all-black-edition', label: 'LIMITED EDITION', title: '全黑系列', desc: '以黑色统一的限定系列。横幅、挂绳、发圈一应俱全。', cta: '查看系列' },
    { slug: 'pastel-dream', label: 'SEASONAL', title: '粉彩梦幻', desc: '春季限定粉彩色调系列。开衫、发圈、连衣裙一应俱全。', cta: '查看系列' },
    { slug: 'summer-breeze', label: 'SUMMER', title: '夏日微风', desc: '清凉夏日系列。轻盈面料与清新配色。', cta: '查看系列' },
    { slug: 'velvet-rose', label: 'PREMIUM', title: '丝绒玫瑰', desc: '奢华丝绒材质高端线。', cta: '查看系列' },
    { slug: 'midnight-glow', label: 'EXCLUSIVE', title: '午夜星光', desc: '带有夜光亮点的演唱会必备系列。', cta: '查看系列' },
    { slug: 'cherry-blossom', label: 'SPRING', title: '樱花季', desc: '春季限定粉色系列。', cta: '查看系列' },
    { slug: 'golden-hour', label: 'COLLAB', title: '黄金时刻', desc: '金色点缀的特别联名系列。', cta: '查看系列' },
  ],
  'zh-TW': [
    { slug: 'concert-season', label: 'NEW DROP', title: '演唱會季系列', desc: '為今年演唱會季準備的應援用品和娃衣特別系列。', cta: '查看系列' },
    { slug: 'all-black-edition', label: 'LIMITED EDITION', title: '全黑系列', desc: '以黑色統一的限定系列。橫幅、掛繩、髮圈一應俱全。', cta: '查看系列' },
    { slug: 'pastel-dream', label: 'SEASONAL', title: '粉彩夢幻', desc: '春季限定粉彩色調系列。開衫、髮圈、洋裝一應俱全。', cta: '查看系列' },
    { slug: 'summer-breeze', label: 'SUMMER', title: '夏日微風', desc: '清涼夏日系列。輕盈面料與清新配色。', cta: '查看系列' },
    { slug: 'velvet-rose', label: 'PREMIUM', title: '絲絨玫瑰', desc: '奢華絲絨材質高端線。', cta: '查看系列' },
    { slug: 'midnight-glow', label: 'EXCLUSIVE', title: '午夜星光', desc: '帶有夜光亮點的演唱會必備系列。', cta: '查看系列' },
    { slug: 'cherry-blossom', label: 'SPRING', title: '櫻花季', desc: '春季限定粉色系列。', cta: '查看系列' },
    { slug: 'golden-hour', label: 'COLLAB', title: '黃金時刻', desc: '金色點綴的特別聯名系列。', cta: '查看系列' },
  ],
  ja: [
    { slug: 'concert-season', label: 'NEW DROP', title: 'コンサートシーズンコレクション', desc: '今年のコンサートシーズンのために準備した応援グッズ＆ぬい服スペシャルラインナップ。', cta: 'コレクションを見る' },
    { slug: 'all-black-edition', label: 'LIMITED EDITION', title: 'オールブラックエディション', desc: 'ブラックトーンで統一した限定シリーズ。スローガン、ストラップ、シュシュまで。', cta: 'コレクションを見る' },
    { slug: 'pastel-dream', label: 'SEASONAL', title: 'パステルドリーム', desc: '春シーズン限定パステルトーンコレクション。カーディガン、シュシュ、ワンピースまで。', cta: 'コレクションを見る' },
    { slug: 'summer-breeze', label: 'SUMMER', title: 'サマーブリーズ', desc: '涼しげな夏コレクション。軽やかな素材と爽やかなカラー。', cta: 'コレクションを見る' },
    { slug: 'velvet-rose', label: 'PREMIUM', title: 'ベルベットローズ', desc: '上質なベルベット素材のプレミアムライン。', cta: 'コレクションを見る' },
    { slug: 'midnight-glow', label: 'EXCLUSIVE', title: 'ミッドナイトグロウ', desc: '蓄光ポイントが光るコンサート必須コレクション。', cta: 'コレクションを見る' },
    { slug: 'cherry-blossom', label: 'SPRING', title: 'チェリーブロッサム', desc: '桜シーズン限定ピンクトーンシリーズ。', cta: 'コレクションを見る' },
    { slug: 'golden-hour', label: 'COLLAB', title: 'ゴールデンアワー', desc: 'ゴールドポイントで仕上げた特別コラボコレクション。', cta: 'コレクションを見る' },
  ],
};

const collectionMeta = [
  { slug: 'concert-season', image: '/collection/collab-1.jpg', productIndices: [0, 2, 3, 6] },
  { slug: 'all-black-edition', image: '/collection/collab-2.jpg', productIndices: [1, 4, 5, 7] },
  { slug: 'pastel-dream', image: '/collection/collab-1.jpg', productIndices: [0, 4, 5] },
  { slug: 'summer-breeze', image: '/collection/collab-2.jpg', productIndices: [1, 2, 6] },
  { slug: 'velvet-rose', image: '/collection/collab-1.jpg', productIndices: [0, 3, 5, 7] },
  { slug: 'midnight-glow', image: '/collection/collab-2.jpg', productIndices: [2, 4, 6] },
  { slug: 'cherry-blossom', image: '/collection/collab-1.jpg', productIndices: [1, 3, 7] },
  { slug: 'golden-hour', image: '/collection/collab-2.jpg', productIndices: [0, 5, 6, 7] },
];

const locales = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja'] as const;

async function main() {
  console.log('Seeding database...');

  // Create products
  const productIds: string[] = [];
  for (let i = 0; i < 8; i++) {
    const koProduct = productsPerLocale.ko[i];
    const category = categoryMap[koProduct.category] || koProduct.category;

    const translations: Record<string, { name: string; price: string }> = {};
    for (const locale of locales) {
      const p = productsPerLocale[locale][i];
      translations[locale] = { name: p.name, price: p.price };
    }

    const product = await prisma.product.upsert({
      where: { id: `product-${i}` },
      update: {
        image: productImages[i].image,
        badgeText: koProduct.badge || null,
        badgeColor: productImages[i].badgeColor,
        category,
        order: i,
        translations,
      },
      create: {
        id: `product-${i}`,
        image: productImages[i].image,
        badgeText: koProduct.badge || null,
        badgeColor: productImages[i].badgeColor,
        category,
        order: i,
        translations,
      },
    });
    productIds.push(product.id);
    console.log(`  Product: ${translations.ko.name}`);
  }

  // Create collections
  for (let i = 0; i < collectionMeta.length; i++) {
    const meta = collectionMeta[i];

    const translations: Record<string, { label: string; title: string; desc: string; cta: string }> = {};
    for (const locale of locales) {
      const c = collabsPerLocale[locale][i];
      translations[locale] = { label: c.label, title: c.title, desc: c.desc, cta: c.cta };
    }

    // Delete existing collection products to avoid conflicts
    await prisma.collectionProduct.deleteMany({
      where: { collectionId: `collection-${i}` },
    });

    await prisma.collection.upsert({
      where: { id: `collection-${i}` },
      update: {
        slug: meta.slug,
        image: meta.image,
        order: i,
        translations,
      },
      create: {
        id: `collection-${i}`,
        slug: meta.slug,
        image: meta.image,
        order: i,
        translations,
      },
    });

    // Create collection-product joins
    for (let j = 0; j < meta.productIndices.length; j++) {
      const productIdx = meta.productIndices[j];
      await prisma.collectionProduct.create({
        data: {
          collectionId: `collection-${i}`,
          productId: productIds[productIdx],
          order: j,
        },
      });
    }

    console.log(`  Collection: ${meta.slug} (${meta.productIndices.length} products)`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
