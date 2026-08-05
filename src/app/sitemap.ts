import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pianoud.net"
  const now = new Date()

  const staticPages = [
    "", "/courses", "/instructors", "/about",
    "/piano", "/oud", "/maqamat", "/reading", "/abrsm", "/harmony", "/kids", "/oudkids",
    "/booking", "/auth/signin", "/auth/signup",
  ]

  const courseSlugs = [
    "piano-fundamentals", "classical-piano", "arabic-piano", "piano-kids", "music-reading",
    "arabic-maqam-oud", "oud-beginners", "oud-advanced", "oud-harmony", "music-theory-abrsm", "oud-kids",
  ]

  const staticEntries = staticPages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }))

  const courseEntries = courseSlugs.map((slug) => ({
    url: `${base}/courses/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...courseEntries]
}
