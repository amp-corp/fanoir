import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const SITE_URL = "https://fanoir.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/collection", "/service/terms"];

  return pages.flatMap((page) =>
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
}
