import type { MetadataRoute } from "next";

import { alerts } from "@/data/alerts";
import { learningArticles } from "@/data/learn";
import { recoveryGuides } from "@/data/recovery";
import { scenarios } from "@/data/scenarios";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().toString().replace(/\/$/, "");

  const staticRoutes: string[] = [
    "/",
    "/check",
    "/emergency",
    "/emergency/call",
    "/emergency/link-clicked",
    "/emergency/app-installed",
    "/emergency/money-sent",
    "/emergency/family-help",
    "/emergency/impersonation",
    "/emergency/device-check",
    "/scams",
    "/recovery",
    "/evidence",
    "/family",
    "/help",
    "/alerts",
    "/learn",
    "/search",
    "/tools/script-detector",
  ];

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...scenarios.map((s) => ({
      url: `${base}/scams/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
    ...recoveryGuides.map((g) => ({
      url: `${base}/recovery/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...alerts.map((a) => ({
      url: `${base}/alerts/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.55,
    })),
    ...learningArticles.map((a) => ({
      url: `${base}/learn/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];

  return entries;
}
