import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterSection } from "@/components/newsletter-section";
import { ArticleCard } from "@/components/article-card";
import { categories, notes } from "@/data/articles";
import { loadArticles } from "@/lib/articles";

export const Route = createFileRoute("/")({
  loader: async () => {
    const allArticles = await loadArticles();
    const featured = allArticles.find((a) => a.featured) ?? allArticles[0];
    const articles = allArticles.filter((a) => a !== featured);
    return { articles, featured };
  },
  head: () => ({
    meta: [
      { title: "From Zero to Data — Blog sur la data et l'IA" },
      {
        name: "description",
        content:
          "Articles clairs et sans bruit sur la data et l'intelligence artificielle : pipelines, SQL, RAG, agents IA et outils.",
      },
      { property: "og:title", content: "From Zero to Data — Blog sur la data et l'IA" },
      {
        property: "og:description",
        content:
          "Retours d'expérience sur la data et l'IA : pipelines, SQL, RAG, agents et outils, expliqués simplement.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { articles, featured } = Route.useLoaderData();
  const [active, setActive] = useState("Tout");
  const visible =
    active === "Tout" ? articles : articles.filter((a) => a.category === active);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section id="top" className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:pt-36">
          <p className="eyebrow">Le blog</p>
          <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.08] md:text-6xl">
            Comprendre la data et l'IA,
            <br />
            une idée à la fois.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            J'écris sur ce que j'apprends en construisant : des pipelines, des modèles, des
            requêtes qui tiennent. Peu d'articles, beaucoup de place pour respirer.
          </p>
        </section>

        {/* Featured */}
        {featured && (
          <section className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 border-y border-border/60 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
              <div className="overflow-hidden rounded-md border border-border/60">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  width={1280}
                  height={800}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div>
                <p className="eyebrow">À la une · {featured.category}</p>
                <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <p className="mt-8 text-xs text-muted-foreground">
                  {featured.date} · {featured.readingTime}
                </p>
                <Link
                  to="/articles/$slug"
                  params={{ slug: featured.slug }}
                  className="mt-8 inline-block border-b border-primary pb-1 text-sm font-medium text-primary"
                >
                  Lire l'article
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Articles */}
        <section id="articles" className="mx-auto max-w-6xl px-6 py-28">
          <div className="flex flex-wrap items-baseline justify-between gap-8">
            <h2 className="text-2xl font-bold md:text-3xl">Derniers articles</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={
                    active === c
                      ? "rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                      : "rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-14 md:grid-cols-3">
            {visible.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-16 text-sm text-muted-foreground">
              {articles.length === 0
                ? "Aucun article pour le moment — ça arrive."
                : "Rien encore dans cette catégorie — ça arrive."}
            </p>
          )}
        </section>

        {/* Notes */}
        <section id="notes" className="mx-auto max-w-6xl px-6 pb-28">
          <div className="border-t border-border/60 pt-16">
            <h2 className="text-2xl font-bold md:text-3xl">Notes courtes</h2>
            <ul className="mt-12 divide-y divide-border/60">
              {notes.map((n) => (
                <li
                  key={n.title}
                  className="group flex flex-col gap-2 py-7 md:flex-row md:items-center md:justify-between md:gap-10"
                >
                  <p className="text-lg font-medium transition-colors group-hover:text-primary">
                    {n.title}
                  </p>
                  <p className="shrink-0 text-xs text-muted-foreground">
                    {n.category} · {n.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <NewsletterSection />
      </main>

      <SiteFooter />
    </div>
  );
}
