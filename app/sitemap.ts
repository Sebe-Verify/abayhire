import type { MetadataRoute } from "next";

const baseUrl = "https://abayhire.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/jobs",
    "/about",
    "/features",
    "/pricing",
    "/employers",
    "/candidates",
    "/success-stories",
    "/help",
    "/faq",
    "/trust-safety",
    "/contact",
    "/careers",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/jobs" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/jobs" ? 0.9 : 0.7,
  }));
}
