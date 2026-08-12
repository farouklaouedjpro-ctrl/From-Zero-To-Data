import { createFileRoute } from "@tanstack/react-router";
import { loadArticles } from "@/lib/articles";

const SITE_URL = "https://fromzerotodata.com";
const SITE_NAME = "From Zero to Data";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const allArticles = await loadArticles();

        const items = allArticles
          .map(
            (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${SITE_URL}/articles/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${a.slug}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <category>${a.category}</category>
    </item>`,
          )
          .join("");

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Articles clairs et sans bruit sur la data et l'intelligence artificielle : pipelines, SQL, RAG, agents IA et outils.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

        return new Response(rss, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
