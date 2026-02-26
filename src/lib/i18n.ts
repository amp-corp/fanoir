export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ko';

export const translations = {
  ko: {
    nav: {
      identity: '브랜드',
      products: '상품',
      collection: 'Collection',
      contact: '문의',
    },
    hero: {
      label: 'FOR YOUR FANDOM',
      title: '덕질하는 순간,',
      titleAccent: '파누아와 함께.',
      subtitle: '당신이 최애를 응원하는 모든 순간에 파누아가 함께합니다.',
      cta1: '상품 보기',
      cta2: '브랜드 소개',
      scroll: 'Scroll',
    },
    identity: {
      label: 'ABOUT FANOIR',
      title: '팬이니까, 더 잘 만들고 싶었어요',
      desc: '귀여운 인형, 최애 인형에 입힐 옷, 매일 쓰는 스크런치까지. 팬인 우리가 직접 쓰고 싶은 것만 만듭니다.',
      meaningTitle: 'Fan + Noir',
      meaningDesc:
        "Fan(팬)과 Noir(프랑스어로 '검정')를 합친 이름이에요. 좋아하는 마음을 담되, 감각적으로 표현하고 싶다는 뜻을 담았어요.",
      roleTitle: '우리가 하는 일',
      roleDesc:
        '귀여운 인형에 어울리는 옷 하나하나에 정성을 담고, 콘서트장에서 빛나는 응원 소품을 만듭니다.',
      visionTitle: '우리가 바라는 것',
      visionDesc:
        '덕질의 모든 순간이 나답게 빛나는 것. 응원도, 꾸미기도, 일상도 — 좋아하는 마음이 더 예뻐지는 경험을 만들고 싶어요.',
      noirMovement: 'NEXT WITH FANOIR',
      joinTitle: '다음 콘서트, 파누아와 함께 준비해볼까요?',
      joinDesc: '신상품 소식과 콜라보 상품을 가장 먼저 만나보세요.',
      joinCta: '상품 둘러보기',
    },
    showcase: {
      label: '대표 상품',
      title: '대표 상품',
      desc: '직접 만들고, 직접 써보고, 자신 있는 것만 내놓습니다. 콘서트장에서도, 인형 앞에서도, 일상에서도.',
      products: [
        {
          name: '인형 원피스 세트',
          price: '₩45,000',
          desc: '20cm 인형용 · 벨벳 소재 · 레이스 디테일',
        },
        {
          name: '라이트스틱 스트랩',
          price: '₩18,000',
          desc: '조절 가능 · 골드 참 장식 · 콘서트 필수템',
        },
        {
          name: '미니슬로건',
          price: '₩15,000',
          desc: '양면 인쇄 · 멤버 컬러 맞춤 · 총공용',
        },
        {
          name: '벨벳 스크런치',
          price: '₩12,000',
          desc: '순수 벨벳 소재 · 모발 손상 없는 착용감',
        },
        {
          name: '우치와커버',
          price: '₩8,000',
          desc: '투명 보호 커버 · 표준 사이즈 호환',
        },
      ],
      bestseller: 'Bestseller',
      comingSoon: 'Coming Soon',
      karatValue: '100%',
      karatLabel: '직접 기획',
      premiumQuality: '소량 한정 제작',
      signatureLabel: 'OUR PROCESS',
      signatureTitle: '하나하나, 꼼꼼하게 기획합니다',
      signatureDesc:
        '소재 선별부터 디자인, 품질 확인까지 모든 과정을 직접 챙깁니다. 대량생산이 아니라 소량으로 정성껏, 하나를 내놓아도 제대로.',
      feature1Title: '멤버 컬러 맞춤 제작',
      feature1Desc: '최애 컬러에 딱 맞는 배색과 디테일',
      feature2Title: '검증된 소재',
      feature2Desc: '직접 확인하고 자신 있는 소재만 선별',
      elevateTitle: '내 최애, 제일 예쁘게',
      elevateDesc:
        '콘서트 준비부터 인형 꾸미기까지, 덕질의 모든 순간을 파누아와 함께.',
      viewMore: '전체 상품 보기',
      shopNow: '상품 보러 가기',
    },
    collection: {
      title: '컬렉션',
      viewAll: '전체 보기',
      filters: {
        all: '전체',
        dolls: '인형',
        cheering: '응원용품',
        fashion: '패션소품',
        keyrings: '키링/참',
      },
      products: [
        {
          name: '벨벳 원피스 세트',
          price: '₩45,000',
          category: '인형',
          badge: 'HOT',
        },
        {
          name: '데님 에어포트 룩',
          price: '₩38,000',
          category: '인형',
        },
        {
          name: '미니슬로건',
          price: '₩15,000',
          category: '응원용품',
          badge: 'NEW',
        },
        {
          name: '라이트스틱 스트랩',
          price: '₩18,000',
          category: '응원용품',
        },
        {
          name: '파스텔 가디건',
          price: '₩32,000',
          category: '인형',
        },
        {
          name: '벨벳 스크런치',
          price: '₩12,000',
          category: '패션소품',
        },
        {
          name: '우치와커버',
          price: '₩8,000',
          category: '응원용품',
        },
        {
          name: '아크릴 키링 세트',
          price: '₩10,000',
          category: '키링/참',
        },
      ],
      collab1Label: 'NEW DROP',
      collab1Title: '콘서트 시즌 컬렉션',
      collab1Desc:
        '올해 콘서트 시즌을 위해 준비한 응원용품 & 인형 옷 특별 라인업.',
      collab1Cta: '컬렉션 보기',
      collab2Label: 'LIMITED EDITION',
      collab2Title: '올블랙 에디션',
      collab2Desc:
        '블랙 톤으로 통일한 한정판 시리즈. 슬로건, 스트랩, 스크런치까지.',
      collab2Cta: '컬렉션 보기',
      sortLabel: '정렬: 최신순',
    },
    footer: {
      privacy: '개인정보처리방침',
      terms: '이용약관',
      shipping: '배송 안내',
      copyright: 'All rights reserved.',
    },
  },
  en: {
    nav: {
      identity: 'About',
      products: 'Products',
      collection: 'Collection',
      contact: 'Contact',
    },
    hero: {
      label: 'FOR YOUR FANDOM',
      title: 'Every fan moment,',
      titleAccent: 'with FANOIR.',
      subtitle: 'At the concert. With your dolls. In everyday life.',
      desc: 'FANOIR is there for every moment you cheer for your bias. From concerts to doll styling to daily life — making every fan moment a little more special.',
      cta1: 'Shop Products',
      cta2: 'About Us',
      scroll: 'Scroll',
    },
    identity: {
      label: 'ABOUT FANOIR',
      title: "We're fans too — that's why we care",
      desc: "Concert slogans to carry, outfits for your favorite dolls, scrunchies for every day. We only make things we'd want to use ourselves.",
      meaningTitle: 'Fan + Noir',
      meaningDesc:
        "Our name combines Fan and Noir (French for 'black'). It means expressing your passion with a refined, distinctive touch.",
      roleTitle: 'What We Do',
      roleDesc:
        'We put care into every outfit for your adorable dolls and craft cheering items that shine at concerts.',
      visionTitle: 'What We Believe',
      visionDesc:
        'Every moment of fandom should feel like you. Cheering, styling, daily life — we want your passion to look as beautiful as it feels.',
      noirMovement: 'NEXT WITH FANOIR',
      joinTitle: 'Ready to prep for the next concert with FANOIR?',
      joinDesc: 'Be the first to hear about new releases and limited drops.',
      joinCta: 'Browse Products',
    },
    showcase: {
      label: 'PRODUCTS',
      title: 'Our Picks',
      desc: 'Handmade, tested, and confidently presented. For the concert, for your dolls, for everyday life.',
      products: [
        {
          name: 'Doll Dress Set',
          price: '$40',
          desc: 'For 20cm dolls · Velvet fabric · Lace details',
        },
        {
          name: 'Lightstick Strap',
          price: '$15',
          desc: 'Adjustable · Gold charm · Concert essential',
        },
        {
          name: 'Mini Slogan Banner',
          price: '$12',
          desc: 'Double-sided print · Member color matching',
        },
        {
          name: 'Velvet Scrunchie',
          price: '$10',
          desc: 'Pure velvet · Gentle on hair',
        },
        {
          name: 'Uchiwa Fan Cover',
          price: '$7',
          desc: 'Clear protective cover · Standard size compatible',
        },
      ],
      bestseller: 'Bestseller',
      comingSoon: 'Coming Soon',
      karatValue: '100%',
      karatLabel: 'Curated',
      premiumQuality: 'Small Batch',
      signatureLabel: 'OUR PROCESS',
      signatureTitle: 'Carefully planned, one by one',
      signatureDesc:
        'From material selection to design to quality checks — we oversee every step. Not mass-produced. Small batches, prepared with care.',
      feature1Title: 'Member Color Matching',
      feature1Desc: 'Colors and details matched to your bias',
      feature2Title: 'Tested Materials',
      feature2Desc: 'We personally select only materials we trust',
      elevateTitle: 'Make your bias look the best',
      elevateDesc:
        'From concert prep to doll styling — every fan moment, with FANOIR.',
      viewMore: 'View All Products',
      shopNow: 'Shop Now',
    },
    collection: {
      title: 'Collection',
      viewAll: 'View All',
      filters: {
        all: 'All',
        dolls: 'Dolls',
        cheering: 'Cheering',
        fashion: 'Fashion',
        keyrings: 'Keyrings & Charms',
      },
      products: [
        {
          name: 'Velvet Dress Set',
          price: '$40.00',
          category: 'Dolls',
          badge: 'HOT',
        },
        {
          name: 'Denim Airport Look',
          price: '$33.00',
          category: 'Dolls',
        },
        {
          name: 'Mini Slogan Banner',
          price: '$12.00',
          category: 'Cheering',
          badge: 'NEW',
        },
        {
          name: 'Lightstick Strap',
          price: '$15.00',
          category: 'Cheering',
        },
        {
          name: 'Pastel Cardigan',
          price: '$28.00',
          category: 'Dolls',
        },
        {
          name: 'Velvet Scrunchie',
          price: '$10.00',
          category: 'Fashion',
        },
        {
          name: 'Uchiwa Fan Cover',
          price: '$7.00',
          category: 'Cheering',
        },
        {
          name: 'Acrylic Keyring Set',
          price: '$9.00',
          category: 'Keyrings & Charms',
        },
      ],
      collab1Label: 'NEW DROP',
      collab1Title: 'Concert Season Collection',
      collab1Desc:
        'Cheering items & doll outfits specially prepared for this concert season.',
      collab1Cta: 'Shop Collection',
      collab2Label: 'LIMITED EDITION',
      collab2Title: 'All Black Edition',
      collab2Desc:
        'A limited series unified in black. Slogans, straps, scrunchies and more.',
      collab2Cta: 'Shop Collection',
      sortLabel: 'Sort by: Newest',
    },
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      shipping: 'Shipping Info',
      copyright: 'All rights reserved.',
    },
  },
} as const;
