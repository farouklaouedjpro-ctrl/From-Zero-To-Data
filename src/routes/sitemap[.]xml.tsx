import { createFileRoute } from "@tanstack/react-router";
import { articles, featured } from "@/data/articles";

const SITE_URL = "https://fromzerotodata.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const allArticles = [featured, ...articles];

        const articleUrls = allArticles
          .map(
            (a) => `
  <url>
    <loc>${SITE_URL}/articles/${a.slug}</loc>
    <lastmod>${a.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
          )
          .join("");

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/a-propos</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>${articleUrls}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
