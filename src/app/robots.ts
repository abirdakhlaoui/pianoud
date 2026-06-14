import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/checkout/", "/auth/"],
    },
    sitemap: "https://pianoud.vercel.app/sitemap.xml",
  }
}
