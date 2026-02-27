export const locales = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ko';

export const localeLabels: Record<Locale, string> = {
  ko: 'KO(한국어)',
  en: 'EN(English)',
  'zh-CN': 'CN(简体)',
  'zh-TW': 'CN(繁體)',
  ja: 'JA(日本語)',
};

export const translations = {
  ko: {
    nav: {
      identity: '브랜드',
      products: '상품',
      collection: '컬렉션',
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
      premiumQuality: '팬의 마음으로 직접 제작',
      signatureLabel: 'OUR PROCESS',
      signatureTitle: '하나하나, 꼼꼼하게 기획합니다',
      signatureDesc:
        '소재 선별부터 디자인, 품질 확인까지 모든 과정을 직접 챙깁니다.',
      feature1Title: '멤버별 컬러 매칭',
      feature1Desc: '최애 컬러에 딱 맞는 배색과 디테일',
      feature2Title: '검증된 소재',
      feature2Desc: '직접 확인하고 자신 있는 소재만 선별',
      elevateTitle: '좋아하는 마음, 제일 예쁘게',
      elevateDesc: '덕질의 모든 순간을 파누아와 함께.',
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
      viewAllTitle: '모든 컬렉션',
      sortPrefix: '정렬',
      sortOptions: {
        newest: '최신순',
        'price-asc': '가격 낮은순',
        'price-desc': '가격 높은순',
      },
    },
    termsPage: {
      title: '이용약관',
      lastUpdated: '최종 수정일: 2025년 1월 1일',
      sections: [
        {
          title: '제1조 (목적)',
          content:
            '본 약관은 FANOIR(이하 "회사")가 운영하는 웹사이트에서 제공하는 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.',
        },
        {
          title: '제2조 (정의)',
          content:
            '• "서비스"란 회사가 운영하는 웹사이트를 통해 제공하는 브랜드 소개, 상품 정보 안내 및 관련 콘텐츠를 말합니다.\n• "이용자"란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.',
        },
        {
          title: '제3조 (약관의 효력)',
          content:
            '본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력이 발생합니다.',
        },
        {
          title: '제4조 (서비스 이용)',
          content:
            '• 서비스 이용 시간은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.\n• 회사는 시스템 점검, 교체 및 고장, 통신 두절 등의 사유가 발생한 경우 서비스 제공을 일시적으로 중단할 수 있습니다.',
        },
        {
          title: '제5조 (지적재산권)',
          content:
            '• 웹사이트에 게시된 모든 콘텐츠(텍스트, 이미지, 디자인, 로고 등)의 저작권은 회사에 귀속됩니다.\n• 이용자는 회사의 사전 서면 동의 없이 콘텐츠를 복제, 배포, 전송, 수정하거나 상업적으로 이용할 수 없습니다.',
        },
        {
          title: '제6조 (면책사항)',
          content:
            '• 회사는 천재지변, 전쟁 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.\n• 회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.\n• 웹사이트에 게시된 상품 정보는 참고용이며, 실제 판매 조건은 별도의 판매 채널에서 확인하시기 바랍니다.',
        },
        {
          title: '제7조 (분쟁 해결)',
          content:
            '• 회사와 이용자 간에 발생한 분쟁은 상호 협의하여 해결합니다.\n• 협의가 이루어지지 않을 경우, 관할 법원에 소를 제기할 수 있습니다.\n• 본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.',
        },
      ],
    },
    footer: {
      terms: '이용약관',
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
      premiumQuality: 'Made by fans, for fans',
      signatureLabel: 'OUR PROCESS',
      signatureTitle: 'Carefully planned, one by one',
      signatureDesc:
        'From material selection to design to quality checks — we oversee every step.',
      feature1Title: 'Member Color Matching',
      feature1Desc: 'Colors and details matched to your bias',
      feature2Title: 'Verified Materials',
      feature2Desc: `Only materials we've tested and trust`,
      elevateTitle: 'Your love, beautifully made',
      elevateDesc: 'Every fan moment, with FANOIR.',
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
      viewAllTitle: 'All Collections',
      sortPrefix: 'Sort by',
      sortOptions: {
        newest: 'Newest',
        'price-asc': 'Price: Low to High',
        'price-desc': 'Price: High to Low',
      },
    },
    termsPage: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: January 1, 2025',
      sections: [
        {
          title: 'Article 1 (Purpose)',
          content:
            'These terms and conditions regulate the conditions and procedures for using the services provided through the website operated by FANOIR ("Company").',
        },
        {
          title: 'Article 2 (Definitions)',
          content:
            '• "Service" refers to the brand introduction, product information, and related content provided through the website operated by the Company.\n• "User" refers to any person who agrees to these terms and uses the Service.',
        },
        {
          title: 'Article 3 (Effectiveness of Terms)',
          content:
            'These terms become effective when posted on the service screen or notified to users through other means. The Company may modify the terms if necessary, and the modified terms become effective after being announced.',
        },
        {
          title: 'Article 4 (Service Usage)',
          content:
            '• The Service is available 24 hours a day, year-round, unless there are special business or technical issues.\n• The Company may temporarily suspend the Service due to system maintenance, replacement, malfunction, or communication disruption.',
        },
        {
          title: 'Article 5 (Intellectual Property)',
          content:
            '• All content posted on the website (text, images, designs, logos, etc.) is the intellectual property of the Company.\n• Users may not reproduce, distribute, transmit, modify, or commercially use any content without prior written consent from the Company.',
        },
        {
          title: 'Article 6 (Disclaimers)',
          content:
            '• The Company is not liable when unable to provide services due to force majeure events such as natural disasters or war.\n• The Company is not responsible for service disruptions caused by the user.\n• Product information displayed on the website is for reference purposes only. Actual sales terms should be confirmed through separate sales channels.',
        },
        {
          title: 'Article 7 (Dispute Resolution)',
          content:
            '• Disputes between the Company and users shall be resolved through mutual consultation.\n• If consultation fails, either party may file a lawsuit with the competent court.\n• Matters not specified in these terms shall be governed by relevant laws and customs.',
        },
      ],
    },
    footer: {
      terms: 'Terms of Service',
      copyright: 'All rights reserved.',
    },
  },
  'zh-CN': {
    nav: {
      identity: '品牌',
      products: '商品',
      collection: '系列',
      contact: '联系',
    },
    hero: {
      label: 'FOR YOUR FANDOM',
      title: '追星的每一刻，',
      titleAccent: '与FANOIR同行。',
      subtitle: '在你为偶像应援的每一个瞬间，FANOIR都与你同在。',
      cta1: '浏览商品',
      cta2: '品牌介绍',
      scroll: 'Scroll',
    },
    identity: {
      label: 'ABOUT FANOIR',
      title: '因为是粉丝，所以想做得更好',
      desc: '可爱的娃衣、每天都能用的发圈……只做我们自己也想用的东西。',
      meaningTitle: 'Fan + Noir',
      meaningDesc:
        '名字由Fan（粉丝）和Noir（法语「黑色」）组合而成。寓意用精致的方式表达对偶像的热爱。',
      roleTitle: '我们做什么',
      roleDesc:
        '用心为可爱的娃娃制作每一件衣服，打造在演唱会上闪耀的应援周边。',
      visionTitle: '我们的愿景',
      visionDesc:
        '追星的每一刻都能闪闪发光。应援、装扮、日常——让喜欢的心情变得更美好。',
      noirMovement: 'NEXT WITH FANOIR',
      joinTitle: '下一场演唱会，和FANOIR一起准备吧？',
      joinDesc: '第一时间获取新品和联名商品资讯。',
      joinCta: '浏览商品',
    },
    showcase: {
      label: '代表商品',
      title: '代表商品',
      desc: '亲手制作、亲自试用，只推出有信心的产品。在演唱会、在娃娃面前、在日常中。',
      products: [
        {
          name: '娃衣连衣裙套装',
          price: '¥230',
          desc: '20cm娃娃用 · 丝绒面料 · 蕾丝细节',
        },
        {
          name: '荧光棒挂绳',
          price: '¥90',
          desc: '可调节 · 金色吊饰 · 演唱会必备',
        },
        {
          name: '迷你横幅',
          price: '¥75',
          desc: '双面印刷 · 成员色定制 · 团体应援',
        },
        {
          name: '丝绒发圈',
          price: '¥60',
          desc: '纯丝绒材质 · 不伤发质',
        },
        {
          name: '团扇保护套',
          price: '¥40',
          desc: '透明保护套 · 标准尺寸兼容',
        },
      ],
      bestseller: 'Bestseller',
      comingSoon: 'Coming Soon',
      karatValue: '100%',
      karatLabel: '自主策划',
      premiumQuality: '粉丝心意，亲手制作',
      signatureLabel: 'OUR PROCESS',
      signatureTitle: '一件一件，精心策划',
      signatureDesc: '从材料甄选到设计、品质确认，每个环节都亲自把关。',
      feature1Title: '成员色配色',
      feature1Desc: '与偶像色完美匹配的配色和细节',
      feature2Title: '验证材料',
      feature2Desc: '只选用亲自验证过的放心材料',
      elevateTitle: '喜欢的心情，最美的呈现',
      elevateDesc: '追星的每一刻，与FANOIR同行。',
      viewMore: '查看全部商品',
      shopNow: '立即购买',
    },
    collection: {
      title: '系列',
      viewAll: '查看全部',
      filters: {
        all: '全部',
        dolls: '娃娃',
        cheering: '应援用品',
        fashion: '时尚配饰',
        keyrings: '钥匙扣/吊饰',
      },
      viewAllTitle: '所有系列',
      sortPrefix: '排序',
      sortOptions: {
        newest: '最新',
        'price-asc': '价格从低到高',
        'price-desc': '价格从高到低',
      },
    },
    termsPage: {
      title: '使用条款',
      lastUpdated: '最后更新：2025年1月1日',
      sections: [
        {
          title: '第一条（目的）',
          content:
            '本条款旨在规定通过FANOIR（以下简称"公司"）运营的网站所提供服务的使用条件及程序。',
        },
        {
          title: '第二条（定义）',
          content:
            '• "服务"是指公司通过其运营的网站提供的品牌介绍、商品信息及相关内容。\n• "用户"是指同意本条款并使用服务的人。',
        },
        {
          title: '第三条（条款效力）',
          content:
            '本条款在服务页面公示或以其他方式通知用户后生效。公司可根据需要修改条款，修改后的条款在公告后生效。',
        },
        {
          title: '第四条（服务使用）',
          content:
            '• 除业务或技术上的特殊原因外，服务原则上全年无休、每日24小时提供。\n• 因系统维护、更换、故障或通信中断等原因，公司可暂时中断服务。',
        },
        {
          title: '第五条（知识产权）',
          content:
            '• 网站上发布的所有内容（文字、图片、设计、标志等）的著作权归公司所有。\n• 未经公司事先书面同意，用户不得复制、分发、传输、修改或商业使用任何内容。',
        },
        {
          title: '第六条（免责声明）',
          content:
            '• 因自然灾害、战争等不可抗力导致无法提供服务时，公司不承担责任。\n• 因用户自身原因造成的服务使用障碍，公司不承担责任。\n• 网站上展示的商品信息仅供参考，实际销售条件请通过其他销售渠道确认。',
        },
        {
          title: '第七条（争议解决）',
          content:
            '• 公司与用户之间的争议应通过协商解决。\n• 协商未果时，任何一方均可向管辖法院提起诉讼。\n• 本条款未规定的事项，依照相关法律法规及商业惯例处理。',
        },
      ],
    },
    footer: {
      terms: '使用条款',
      copyright: 'All rights reserved.',
    },
  },
  'zh-TW': {
    nav: {
      identity: '品牌',
      products: '商品',
      collection: '系列',
      contact: '聯繫',
    },
    hero: {
      label: 'FOR YOUR FANDOM',
      title: '追星的每一刻，',
      titleAccent: '與FANOIR同行。',
      subtitle: '在你為偶像應援的每一個瞬間，FANOIR都與你同在。',
      cta1: '瀏覽商品',
      cta2: '品牌介紹',
      scroll: 'Scroll',
    },
    identity: {
      label: 'ABOUT FANOIR',
      title: '因為是粉絲，所以想做得更好',
      desc: '可愛的娃衣、每天都能用的髮圈……只做我們自己也想用的東西。',
      meaningTitle: 'Fan + Noir',
      meaningDesc:
        '名字由Fan（粉絲）和Noir（法語「黑色」）組合而成。寓意用精緻的方式表達對偶像的熱愛。',
      roleTitle: '我們做什麼',
      roleDesc:
        '用心為可愛的娃娃製作每一件衣服，打造在演唱會上閃耀的應援周邊。',
      visionTitle: '我們的願景',
      visionDesc:
        '追星的每一刻都能閃閃發光。應援、裝扮、日常——讓喜歡的心情變得更美好。',
      noirMovement: 'NEXT WITH FANOIR',
      joinTitle: '下一場演唱會，和FANOIR一起準備吧？',
      joinDesc: '第一時間獲取新品和聯名商品資訊。',
      joinCta: '瀏覽商品',
    },
    showcase: {
      label: '代表商品',
      title: '代表商品',
      desc: '親手製作、親自試用，只推出有信心的產品。在演唱會、在娃娃面前、在日常中。',
      products: [
        {
          name: '娃衣洋裝套組',
          price: 'NT$1,350',
          desc: '20cm娃娃用 · 絲絨布料 · 蕾絲細節',
        },
        {
          name: '螢光棒掛繩',
          price: 'NT$540',
          desc: '可調節 · 金色吊飾 · 演唱會必備',
        },
        {
          name: '迷你橫幅',
          price: 'NT$450',
          desc: '雙面印刷 · 成員色訂製 · 團體應援',
        },
        {
          name: '絲絨髮圈',
          price: 'NT$360',
          desc: '純絲絨材質 · 不傷髮質',
        },
        {
          name: '團扇保護套',
          price: 'NT$240',
          desc: '透明保護套 · 標準尺寸相容',
        },
      ],
      bestseller: 'Bestseller',
      comingSoon: 'Coming Soon',
      karatValue: '100%',
      karatLabel: '自主企劃',
      premiumQuality: '粉絲心意，親手製作',
      signatureLabel: 'OUR PROCESS',
      signatureTitle: '一件一件，精心企劃',
      signatureDesc: '從材料甄選到設計、品質確認，每個環節都親自把關。',
      feature1Title: '成員色配色',
      feature1Desc: '與偶像色完美匹配的配色和細節',
      feature2Title: '驗證材料',
      feature2Desc: '只選用親自驗證過的放心材料',
      elevateTitle: '喜歡的心情，最美的呈現',
      elevateDesc: '追星的每一刻，與FANOIR同行。',
      viewMore: '查看全部商品',
      shopNow: '立即購買',
    },
    collection: {
      title: '系列',
      viewAll: '查看全部',
      filters: {
        all: '全部',
        dolls: '娃娃',
        cheering: '應援用品',
        fashion: '時尚配飾',
        keyrings: '鑰匙圈/吊飾',
      },
      viewAllTitle: '所有系列',
      sortPrefix: '排序',
      sortOptions: {
        newest: '最新',
        'price-asc': '價格從低到高',
        'price-desc': '價格從高到低',
      },
    },
    termsPage: {
      title: '使用條款',
      lastUpdated: '最後更新：2025年1月1日',
      sections: [
        {
          title: '第一條（目的）',
          content:
            '本條款旨在規定透過FANOIR（以下簡稱「公司」）營運的網站所提供服務的使用條件及程序。',
        },
        {
          title: '第二條（定義）',
          content:
            '• 「服務」是指公司透過其營運的網站提供的品牌介紹、商品資訊及相關內容。\n• 「用戶」是指同意本條款並使用服務的人。',
        },
        {
          title: '第三條（條款效力）',
          content:
            '本條款在服務頁面公示或以其他方式通知用戶後生效。公司可根據需要修改條款，修改後的條款在公告後生效。',
        },
        {
          title: '第四條（服務使用）',
          content:
            '• 除業務或技術上的特殊原因外，服務原則上全年無休、每日24小時提供。\n• 因系統維護、更換、故障或通訊中斷等原因，公司可暫時中斷服務。',
        },
        {
          title: '第五條（智慧財產權）',
          content:
            '• 網站上發布的所有內容（文字、圖片、設計、標誌等）的著作權歸公司所有。\n• 未經公司事先書面同意，用戶不得複製、分發、傳輸、修改或商業使用任何內容。',
        },
        {
          title: '第六條（免責聲明）',
          content:
            '• 因自然災害、戰爭等不可抗力導致無法提供服務時，公司不承擔責任。\n• 因用戶自身原因造成的服務使用障礙，公司不承擔責任。\n• 網站上展示的商品資訊僅供參考，實際銷售條件請透過其他銷售管道確認。',
        },
        {
          title: '第七條（爭議解決）',
          content:
            '• 公司與用戶之間的爭議應透過協商解決。\n• 協商未果時，任何一方均可向管轄法院提起訴訟。\n• 本條款未規定的事項，依照相關法律法規及商業慣例處理。',
        },
      ],
    },
    footer: {
      terms: '使用條款',
      copyright: 'All rights reserved.',
    },
  },
  ja: {
    nav: {
      identity: 'ブランド',
      products: '商品',
      collection: 'コレクション',
      contact: 'お問い合わせ',
    },
    hero: {
      label: 'FOR YOUR FANDOM',
      title: '推し活の瞬間、',
      titleAccent: 'FANOIRと一緒に。',
      subtitle: 'あなたが推しを応援するすべての瞬間に、FANOIRが寄り添います。',
      cta1: '商品を見る',
      cta2: 'ブランド紹介',
      scroll: 'Scroll',
    },
    identity: {
      label: 'ABOUT FANOIR',
      title: 'ファンだから、もっと良いものを作りたかった',
      desc: 'かわいいぬい服、毎日使えるシュシュまで。ファンの私たちが本当に使いたいものだけを作っています。',
      meaningTitle: 'Fan + Noir',
      meaningDesc:
        "Fan（ファン）とNoir（フランス語で「黒」）を組み合わせた名前です。好きな気持ちを洗練された形で表現したいという想いを込めました。",
      roleTitle: '私たちがすること',
      roleDesc:
        'かわいいぬいぐるみに合う服を一着一着丁寧に作り、コンサートで輝く応援グッズを制作しています。',
      visionTitle: '私たちが目指すもの',
      visionDesc:
        '推し活のすべての瞬間が自分らしく輝くこと。応援も、デコも、日常も — 好きな気持ちがもっと素敵になる体験を作りたいです。',
      noirMovement: 'NEXT WITH FANOIR',
      joinTitle: '次のコンサート、FANOIRと一緒に準備しませんか？',
      joinDesc: '新商品やコラボ情報をいち早くお届けします。',
      joinCta: '商品を見る',
    },
    showcase: {
      label: '代表商品',
      title: '代表商品',
      desc: '自ら作り、自ら試し、自信のあるものだけをお届けします。コンサートでも、ぬいの前でも、日常でも。',
      products: [
        {
          name: 'ぬいワンピースセット',
          price: '¥5,500',
          desc: '20cmぬい用 · ベルベット素材 · レースディテール',
        },
        {
          name: 'ペンライトストラップ',
          price: '¥2,200',
          desc: '調節可能 · ゴールドチャーム · コンサート必須アイテム',
        },
        {
          name: 'ミニスローガン',
          price: '¥1,800',
          desc: '両面印刷 · メンバーカラー対応 · 集団応援用',
        },
        {
          name: 'ベルベットシュシュ',
          price: '¥1,500',
          desc: 'ベルベット素材 · 髪に優しい着け心地',
        },
        {
          name: 'うちわカバー',
          price: '¥1,000',
          desc: '透明保護カバー · 標準サイズ対応',
        },
      ],
      bestseller: 'Bestseller',
      comingSoon: 'Coming Soon',
      karatValue: '100%',
      karatLabel: '自主企画',
      premiumQuality: 'ファンの想いで直接制作',
      signatureLabel: 'OUR PROCESS',
      signatureTitle: 'ひとつひとつ、丁寧に企画しています',
      signatureDesc:
        '素材選びからデザイン、品質確認まで、すべての工程を自ら管理しています。',
      feature1Title: 'メンバーカラーマッチング',
      feature1Desc: '推しカラーにぴったりの配色とディテール',
      feature2Title: '検証済み素材',
      feature2Desc: '自ら確認し、自信のある素材だけを厳選',
      elevateTitle: '好きな気持ちを、いちばん素敵に',
      elevateDesc: '推し活のすべての瞬間をFANOIRと一緒に。',
      viewMore: '全商品を見る',
      shopNow: '商品を見に行く',
    },
    collection: {
      title: 'コレクション',
      viewAll: 'すべて見る',
      filters: {
        all: 'すべて',
        dolls: 'ぬいぐるみ',
        cheering: '応援グッズ',
        fashion: 'ファッション小物',
        keyrings: 'キーリング/チャーム',
      },
      viewAllTitle: 'すべてのコレクション',
      sortPrefix: '並び替え',
      sortOptions: {
        newest: '新着順',
        'price-asc': '価格が安い順',
        'price-desc': '価格が高い順',
      },
    },
    termsPage: {
      title: '利用規約',
      lastUpdated: '最終更新日：2025年1月1日',
      sections: [
        {
          title: '第1条（目的）',
          content:
            '本規約は、FANOIR（以下「当社」）が運営するウェブサイトで提供するサービスの利用条件および手続きに関する事項を規定することを目的とします。',
        },
        {
          title: '第2条（定義）',
          content:
            '• 「サービス」とは、当社が運営するウェブサイトを通じて提供するブランド紹介、商品情報案内および関連コンテンツを指します。\n• 「利用者」とは、本規約に同意しサービスを利用する者を指します。',
        },
        {
          title: '第3条（規約の効力）',
          content:
            '本規約は、サービス画面に掲示またはその他の方法で利用者に通知することにより効力が発生します。当社は必要に応じて規約を変更することができ、変更された規約は告知後に効力が発生します。',
        },
        {
          title: '第4条（サービス利用）',
          content:
            '• サービスの利用時間は、当社の業務上または技術上の特別な事情がない限り、年中無休・24時間を原則とします。\n• 当社はシステム点検、交換および故障、通信途絶等の事由が発生した場合、サービスの提供を一時的に中断することがあります。',
        },
        {
          title: '第5条（知的財産権）',
          content:
            '• ウェブサイトに掲載されたすべてのコンテンツ（テキスト、画像、デザイン、ロゴ等）の著作権は当社に帰属します。\n• 利用者は、当社の事前の書面による同意なく、コンテンツを複製、配布、送信、修正、または商業的に利用することはできません。',
        },
        {
          title: '第6条（免責事項）',
          content:
            '• 当社は、天災地変、戦争等の不可抗力によりサービスを提供できない場合、責任を負いません。\n• 当社は、利用者の帰責事由によるサービス利用障害について責任を負いません。\n• ウェブサイトに掲載された商品情報は参考用であり、実際の販売条件は別途の販売チャネルでご確認ください。',
        },
        {
          title: '第7条（紛争解決）',
          content:
            '• 当社と利用者間に発生した紛争は、相互協議により解決します。\n• 協議が成立しない場合、管轄裁判所に訴訟を提起することができます。\n• 本規約に明示されていない事項は、関係法令および商慣習に従います。',
        },
      ],
    },
    footer: {
      terms: '利用規約',
      copyright: 'All rights reserved.',
    },
  },
} as const;
