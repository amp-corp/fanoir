import { prisma } from './db';
import type { ProductTranslations, CollectionTranslations, CategoryTranslations } from './db-types';

export type CategoryForDisplay = {
  key: string;
  name: string;
};

export type ProductForDisplay = {
  id: string;
  image: string;
  badgeText: string | null;
  badgeColor: string | null;
  category: string;
  categoryName: string;
  name: string;
  price: string;
  comingSoon: boolean;
  link: string | null;
};

export type CollectionForDisplay = {
  id: string;
  slug: string;
  image: string;
  label: string;
  title: string;
  desc: string;
};

export type CollectionDetailForDisplay = CollectionForDisplay & {
  products: ProductForDisplay[];
};

export async function getCategories(locale: string): Promise<CategoryForDisplay[]> {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });

  return categories.map((c) => {
    const t = (c.translations as CategoryTranslations)[locale as keyof CategoryTranslations] ||
              (c.translations as CategoryTranslations).ko;
    return {
      key: c.key,
      name: t.name,
    };
  });
}

export async function getProducts(locale: string): Promise<ProductForDisplay[]> {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { order: 'asc' },
  });

  return products.map((p) => {
    const t = (p.translations as ProductTranslations)[locale as keyof ProductTranslations] ||
              (p.translations as ProductTranslations).ko;
    const ct = (p.category.translations as CategoryTranslations)[locale as keyof CategoryTranslations] ||
               (p.category.translations as CategoryTranslations).ko;
    return {
      id: p.id,
      image: p.image,
      badgeText: p.badgeText,
      badgeColor: p.badgeColor,
      category: p.category.key,
      categoryName: ct.name,
      name: t.name,
      price: t.price,
      comingSoon: p.comingSoon && (!p.comingSoonUntil || new Date() < new Date(p.comingSoonUntil)),
      link: p.link,
    };
  });
}

export async function getCollections(locale: string): Promise<CollectionForDisplay[]> {
  const collections = await prisma.collection.findMany({
    where: { visible: true },
    orderBy: { order: 'asc' },
  });

  return collections.map((c) => {
    const t = (c.translations as CollectionTranslations)[locale as keyof CollectionTranslations] ||
              (c.translations as CollectionTranslations).ko;
    return {
      id: c.id,
      slug: c.slug,
      image: c.image,
      label: t.label,
      title: t.title,
      desc: t.desc,
    };
  });
}

export async function getCollectionBySlug(slug: string, locale: string): Promise<CollectionDetailForDisplay | null> {
  const collection = await prisma.collection.findFirst({
    where: { slug, visible: true },
    include: {
      products: {
        include: { product: { include: { category: true } } },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!collection) return null;

  const ct = (collection.translations as CollectionTranslations)[locale as keyof CollectionTranslations] ||
             (collection.translations as CollectionTranslations).ko;

  const products: ProductForDisplay[] = collection.products.map((cp) => {
    const pt = (cp.product.translations as ProductTranslations)[locale as keyof ProductTranslations] ||
               (cp.product.translations as ProductTranslations).ko;
    const ct = (cp.product.category.translations as CategoryTranslations)[locale as keyof CategoryTranslations] ||
               (cp.product.category.translations as CategoryTranslations).ko;
    return {
      id: cp.product.id,
      image: cp.product.image,
      badgeText: cp.product.badgeText,
      badgeColor: cp.product.badgeColor,
      category: cp.product.category.key,
      categoryName: ct.name,
      name: pt.name,
      price: pt.price,
      comingSoon: cp.product.comingSoon && (!cp.product.comingSoonUntil || new Date() < new Date(cp.product.comingSoonUntil)),
      link: cp.product.link,
    };
  });

  return {
    id: collection.id,
    slug: collection.slug,
    image: collection.image,
    label: ct.label,
    title: ct.title,
    desc: ct.desc,
    products,
  };
}

export async function getCollectionSlugs(): Promise<string[]> {
  const collections = await prisma.collection.findMany({
    where: { visible: true },
    select: { slug: true },
  });
  return collections.map((c) => c.slug);
}

// ── Site Settings ──────────────────────────────────────────

export type SiteImages = {
  hero_image: string;
  signature_image_1: string;
  signature_image_2: string;
};

const SITE_IMAGE_KEYS: (keyof SiteImages)[] = [
  'hero_image',
  'signature_image_1',
  'signature_image_2',
];

export async function getSiteImages(): Promise<SiteImages> {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: SITE_IMAGE_KEYS } },
  });

  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return {
    hero_image: map.hero_image || '',
    signature_image_1: map.signature_image_1 || '',
    signature_image_2: map.signature_image_2 || '',
  };
}

export async function upsertSiteSetting(key: string, value: string) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
