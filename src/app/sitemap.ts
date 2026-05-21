import type { MetadataRoute } from "next";
import { GENERATIONS } from "@/data/generations";
import { VARIATOR_BRANDS } from "@/data/variators";
import { GUIDES } from "@/data/guides";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const top: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/varyator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/periyodik-bakim`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/nasil-yapilir`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/teknik-ozellikler`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/bilgi`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/bilgi/lastik-basinci`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE.url}/bilgi/hata-kodlari`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/aksesuar`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }
  ];

  return [
    ...top,
    ...VARIATOR_BRANDS.map((b) => ({
      url: `${SITE.url}/varyator/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    ...GUIDES.map((g) => ({
      url: `${SITE.url}/nasil-yapilir/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...GENERATIONS.map((g) => ({
      url: `${SITE.url}/teknik-ozellikler/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
