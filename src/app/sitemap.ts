import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getCollectionSlugs } from "@/lib/db-queries";

const SITE_URL = "https://fanoir.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/collection", "/service/terms"];

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${page}`])
        ),
      },
    }))
  );

  const slugs = await getCollectionSlugs();
  const collectionEntries = slugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/collection/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/collection/${slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...collectionEntries];
}
