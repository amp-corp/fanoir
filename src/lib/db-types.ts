export type ProductTranslations = {
  [locale in 'ko' | 'en' | 'zh-CN' | 'zh-TW' | 'ja']: { name: string; price: string };
};

export type CollectionTranslations = {
  [locale in 'ko' | 'en' | 'zh-CN' | 'zh-TW' | 'ja']: { label: string; title: string; desc: string; cta: string };
};
