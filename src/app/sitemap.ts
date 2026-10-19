import type { MetadataRoute } from "next";
import { RepertoriosData } from "@/db/repertorios";
import { SITE_URL } from "@/lib/site";

// Required by the static export (output: "export").
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/busca`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/repertorios`, changeFrequency: "weekly", priority: 0.8 },
    ...RepertoriosData.map((r) => ({
      url: `${SITE_URL}/repertorios/${r.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
