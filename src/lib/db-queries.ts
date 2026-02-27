import { prisma } from './db';
import type { ProductTranslations, CollectionTranslations } from './db-types';

export type ProductForDisplay = {
  id: string;
  image: string;
  badgeText: string | null;
  badgeColor: string | null;
  category: string;
  name: string;
  price: string;
};

export type CollectionForDisplay = {
  id: string;
  slug: string;
  image: string;
  label: string;
  title: string;
  desc: string;
  cta: string;
};

export type CollectionDetailForDisplay = CollectionForDisplay & {
  products: ProductForDisplay[];
};

export async function getProducts(locale: string): Promise<ProductForDisplay[]> {
  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
  });

  return products.map((p) => {
    const t = (p.translations as ProductTranslations)[locale as keyof ProductTranslations] ||
              (p.translations as ProductTranslations).ko;
    return {
      id: p.id,
      image: p.image,
      badgeText: p.badgeText,
      badgeColor: p.badgeColor,
      category: p.category,
      name: t.name,
      price: t.price,
    };
  });
}

export async function getCollections(locale: string): Promise<CollectionForDisplay[]> {
  const collections = await prisma.collection.findMany({
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
      cta: t.cta,
    };
  });
}

export async function getCollectionBySlug(slug: string, locale: string): Promise<CollectionDetailForDisplay | null> {
  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        include: { product: true },
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
    return {
      id: cp.product.id,
      image: cp.product.image,
      badgeText: cp.product.badgeText,
      badgeColor: cp.product.badgeColor,
      category: cp.product.category,
      name: pt.name,
      price: pt.price,
    };
  });

  return {
    id: collection.id,
    slug: collection.slug,
    image: collection.image,
    label: ct.label,
    title: ct.title,
    desc: ct.desc,
    cta: ct.cta,
    products,
  };
}

export async function getCollectionSlugs(): Promise<string[]> {
  const collections = await prisma.collection.findMany({
    select: { slug: true },
  });
  return collections.map((c) => c.slug);
}
