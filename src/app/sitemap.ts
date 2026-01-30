import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fanoir.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ko: "https://fanoir.vercel.app",
          en: "https://fanoir.vercel.app",
        },
      },
    },
  ];
}
