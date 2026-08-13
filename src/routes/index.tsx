import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterSection } from "@/components/newsletter-section";
import { ArticleCard } from "@/components/article-card";
import { categories } from "@/data/articles";
import { loadArticles } from "@/lib/articles";
import { loadNotes } from "@/lib/notes";

export const Route = createFileRoute("/")({
  loader: async () => {
    const allArticles = await loadArticles();
    const notes = await loadNotes();
    const featured = allArticles.find((a) => a.featured) ?? allArticles[0];
    return { articles: allArticles, featured, notes };
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
  const { articles, featured, notes } = Route.useLoaderData();
  const [active, setActive] = useState("Tout");
  const visible =
    active === "Tout" ? articles : articles.filter((a) => a.category === active);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main id="main-content">
        {/* Hero */}
        <section id="top" className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-96"
            style={{
              background:
                "radial-gradient(55% 60% at 50% 35%, color-mix(in oklab, var(--primary) 9%, transparent), transparent)",
            }}
          />
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
            <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => {
                const count =
                  articles.length > 0
                    ? c === "Tout"
                      ? articles.length
                      : articles.filter((a) => a.category === c).length
                    : null;
                return (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    aria-pressed={active === c}
                    className={
                      active === c
                        ? "shrink-0 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                        : "shrink-0 whitespace-nowrap rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                    }
                  >
                    {count === null ? c : `${c} (${count})`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-16 grid gap-14 md:grid-cols-3">
            {visible.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mt-16 max-w-xl">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {articles.length === 0
                  ? "Aucun article pour le moment — ça pousse, doucement."
                  : "Rien encore dans cette catégorie — ça pousse, doucement."}
              </p>
              <a
                href="#newsletter"
                className="mt-6 inline-block border-b border-primary pb-1 text-sm font-medium text-primary"
              >
                Sois prévenu du prochain article
              </a>
            </div>
          )}
        </section>

        {/* Notes */}
        <section id="notes" className="mx-auto max-w-6xl px-6 pb-28">
          <div className="border-t border-border/60 pt-16">
            <h2 className="text-2xl font-bold md:text-3xl">Notes courtes</h2>
            <ul className="mt-10 divide-y divide-border/60">
              {notes.map((n) => (
                <li
                  key={n.title}
                  className="group flex flex-col gap-1.5 py-4 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <p className="text-base font-medium transition-colors group-hover:text-primary">
                    {n.title}
                  </p>
                  <p className="shrink-0 text-xs text-muted-foreground">
                    {n.category} · {n.date}
                  </p>
                </li>
              ))}
            </ul>
            {notes.length === 0 && (
              <div className="mt-8 max-w-xl">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Aucune note courte pour le moment — ça pousse, doucement.
                </p>
                <a
                  href="#newsletter"
                  className="mt-4 inline-block border-b border-primary pb-1 text-sm font-medium text-primary"
                >
                  Sois prévenu du prochain article
                </a>
              </div>
            )}
          </div>
        </section>

        <NewsletterSection />
      </main>

      <SiteFooter />
    </div>
  );
}
