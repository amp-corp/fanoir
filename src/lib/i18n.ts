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
      title: '응원하는 모든 순간,',
      subtitle: '좋아하는 마음 가장 예쁘게',
    },
    identity: {
      label: 'WHO WE ARE',
      title: '마음에 드는 게 없어서 직접 만들기로 했어요',
      desc: 'FANOIR는 콘서트 전날의 설렘에서 시작됐어요. 응원봉 꾸미고, 인형한테 새 옷 입히는 그 시간 — 그 순간에 쓸 케이팝 팬덤 굿즈를 우리가 직접 만들게 됐어요.',
      storyLine1: '**Fan + Noir**\n\n팬의 마음에\n**Noir를 더 합니다.**',
      storyLine2:
        '응원하는 순간도\n좋아하는 것을 표현하는 순간도\n마음이 보이는 모든 순간.',
      storyLine3: 'FANOIR는\n그 순간을 위한 브랜드입니다.',
      spotlightLabel: '추천 상품',
      spotlightDesc:
        '좋아하는 마음을 더 특별하게.\nFANOIR가 만든 것들을 만나보세요.',
      spotlightCta: '보러 가기',
    },
    showcase: {
      label: '이런 거 만들어요',
      title: '자신 있는 것들만 올려요',
      desc: '인형옷부터 응원용품, 키링까지 — 콘서트장에 직접 들고 가서 써본 것들만 모았어요.',
      comingSoon: 'Coming Soon',
      viewMore: '더 보기',
      philosophyLabel: 'OUR PHILOSOPHY',
      philosophyQuote: '다음 응원의 순간도 FANOIR와 함께',
      philosophyDesc: '새 상품이랑 콜라보 소식을 가장 먼저 만나보세요',
      philosophyCta: '구경하러 가기',
    },
    product: {
      title: '상품',
      viewAll: '더 보기',
      filters: {
        all: '전체',
      },
      sortPrefix: '정렬',
      sortOptions: {
        newest: '최신순',
        'price-asc': '가격 낮은순',
        'price-desc': '가격 높은순',
      },
    },
    collection: {
      title: '컬렉션',
      desc: '팬덤에서 사랑받는 크리에이터들과 함께했어요. 파누아만의 특별한 콜라보 라인업!',
      to: '컬렉션 보기',
      viewMore: '컬렉션 모두 보기',
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
      title: 'Every moment you cheer,',
      subtitle: 'Your love, beautifully made',
    },
    identity: {
      label: 'WHO WE ARE',
      title:
        "We couldn't find what we wanted so we started making it ourselves",
      desc: 'FANOIR started from the excitement the night before a concert — decorating lightsticks, dressing up dolls. We started making K-pop fan goods for those exact moments ourselves.',
      storyLine1:
        '**Fan + Noir**\n\nTo your heart,\n**we add Noir.**',
      storyLine2:
        'Every moment you cheer,\nevery moment you express what you love,\nevery moment your heart shows.',
      storyLine3: 'FANOIR is\na brand made for those moments.',
      spotlightLabel: 'FEATURED',
      spotlightDesc:
        'Making your love even more special.\nDiscover what FANOIR has crafted.',
      spotlightCta: 'View Products',
    },
    showcase: {
      label: 'WHAT WE MAKE',
      title: 'Only the good stuff',
      desc: 'Doll clothes, cheering items, keyrings and more — we brought them to concerts and only kept what actually works.',
      comingSoon: 'Coming Soon',
      viewMore: 'See All',
      philosophyLabel: 'OUR PHILOSOPHY',
      philosophyQuote: 'Your next moment of cheer, together with FANOIR',
      philosophyDesc:
        'Be the first to discover new drops and collab news.',
      philosophyCta: 'Browse Products',
    },
    product: {
      title: 'Products',
      viewAll: 'See All',
      filters: {
        all: 'All',
      },
      sortPrefix: 'Sort by',
      sortOptions: {
        newest: 'Newest',
        'price-asc': 'Price: Low to High',
        'price-desc': 'Price: High to Low',
      },
    },
    collection: {
      title: 'Collection',
      desc: 'Special collab lineups with beloved fandom creators. Only at FANOIR!',
      to: 'View Collection',
      viewMore: 'View All Collections',
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
      title: '应援的每个瞬间，',
      subtitle: '喜欢的心情 最好看地呈现',
    },
    identity: {
      label: 'WHO WE ARE',
      title: '找不到满意的 就自己动手做了',
      desc: 'FANOIR始于演唱会前夜的那份期待。装饰应援棒、给娃娃换新衣——那些时刻用的K-pop粉丝周边，我们自己来做。',
      storyLine1: '**Fan + Noir**\n\n在粉丝的心中\n**添上Noir。**',
      storyLine2:
        '应援的瞬间\n表达喜欢的瞬间\n心意被看见的每个瞬间。',
      storyLine3: 'FANOIR是\n为那些瞬间而生的品牌。',
      spotlightLabel: '推荐商品',
      spotlightDesc: '让喜欢变得更特别。\n来看看FANOIR打造的好物吧。',
      spotlightCta: '去看看',
    },
    showcase: {
      label: '我们做这些',
      title: '有底气的才上架',
      desc: '娃衣、应援用品、钥匙扣等——带去演唱会用过，觉得真不错的才放上来。',
      comingSoon: 'Coming Soon',
      viewMore: '看全部',
      philosophyLabel: 'OUR PHILOSOPHY',
      philosophyQuote: '下一次应援的瞬间 与FANOIR一起',
      philosophyDesc: '第一时间了解新品和联名消息。',
      philosophyCta: '逛逛看',
    },
    product: {
      title: '商品',
      viewAll: '看全部',
      filters: {
        all: '全部',
      },
      sortPrefix: '排序',
      sortOptions: {
        newest: '最新',
        'price-asc': '价格从低到高',
        'price-desc': '价格从高到低',
      },
    },
    collection: {
      title: '系列',
      desc: '粉丝圈人气创作者们的联名合作，FANOIR专属特别企划！',
      to: '查看系列',
      viewMore: '查看全部系列',
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
      title: '應援的每個瞬間，',
      subtitle: '喜歡的心情 最好看地呈現',
    },
    identity: {
      label: 'WHO WE ARE',
      title: '找不到滿意的 就自己動手做了',
      desc: 'FANOIR始於演唱會前夜的那份期待。裝飾應援棒、幫娃娃換新衣——那些時刻用的K-pop粉絲周邊，我們自己來做。',
      storyLine1: '**Fan + Noir**\n\n在粉絲的心中\n**添上Noir。**',
      storyLine2:
        '應援的瞬間\n表達喜歡的瞬間\n心意被看見的每個瞬間。',
      storyLine3: 'FANOIR是\n為那些瞬間而生的品牌。',
      spotlightLabel: '推薦商品',
      spotlightDesc: '讓喜歡變得更特別。\n來看看FANOIR打造的好物吧。',
      spotlightCta: '去看看',
    },
    showcase: {
      label: '我們做這些',
      title: '有底氣的才上架',
      desc: '娃衣、應援用品、鑰匙圈等——帶去演唱會用過，覺得真不錯的才放上來。',
      comingSoon: 'Coming Soon',
      viewMore: '看全部',
      philosophyLabel: 'OUR PHILOSOPHY',
      philosophyQuote: '下一次應援的瞬間 與FANOIR一起',
      philosophyDesc: '第一時間了解新品和聯名消息。',
      philosophyCta: '逛逛看',
    },
    product: {
      title: '商品',
      viewAll: '看全部',
      filters: {
        all: '全部',
      },
      sortPrefix: '排序',
      sortOptions: {
        newest: '最新',
        'price-asc': '價格從低到高',
        'price-desc': '價格從高到低',
      },
    },
    collection: {
      title: '系列',
      desc: '粉絲圈人氣創作者們的聯名合作，FANOIR專屬特別企劃！',
      to: '查看系列',
      viewMore: '查看全部系列',
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
      title: '応援するすべての瞬間、',
      subtitle: '好きな気持ち いちばんかわいく',
    },
    identity: {
      label: 'WHO WE ARE',
      title: '気に入るものがなくて 自分たちで作ることにしました',
      desc: 'FANOIRはライブ前夜のワクワクから始まりました。ペンラをデコって、ぬいに新しい服を着せて——あの瞬間に使うK-popファンダムグッズを自分たちで作るようになりました。',
      storyLine1:
        '**Fan + Noir**\n\nファンの心に\n**Noirを加えます。**',
      storyLine2:
        '応援する瞬間も\n好きを表現する瞬間も\n気持ちが見えるすべての瞬間。',
      storyLine3: 'FANOIRは\nその瞬間のためのブランドです。',
      spotlightLabel: 'おすすめ',
      spotlightDesc:
        '好きをもっと特別に。\nFANOIRが作ったものに出会ってみませんか。',
      spotlightCta: '見に行く',
    },
    showcase: {
      label: 'こんなの作ってます',
      title: '自信あるものだけ',
      desc: 'ぬい服、応援グッズ、キーリングなど——ライブに持っていって本当によかったものだけ載せてます。',
      comingSoon: 'Coming Soon',
      viewMore: '全部見る',
      philosophyLabel: 'OUR PHILOSOPHY',
      philosophyQuote: '次の応援の瞬間も FANOIRと一緒に',
      philosophyDesc: '新商品やコラボ情報をいち早くお届けします。',
      philosophyCta: '見てみる',
    },
    product: {
      title: '商品',
      viewAll: '全部見る',
      filters: {
        all: 'すべて',
      },
      sortPrefix: '並び替え',
      sortOptions: {
        newest: '新着順',
        'price-asc': '価格が安い順',
        'price-desc': '価格が高い順',
      },
    },
    collection: {
      title: 'コレクション',
      desc: 'ファンダムで愛されるクリエイターたちとのコラボ。FANOIRだけの特別ラインナップ！',
      to: 'コレクションを見る',
      viewMore: 'コレクションをすべて見る',
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
