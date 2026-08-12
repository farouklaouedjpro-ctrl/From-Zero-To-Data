import { createFileRoute, Link } from "@tanstack/react-router";
import { loadArticle, loadArticles } from "@/lib/articles";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => {
    const article = await loadArticle(params.slug);
    if (!article) throw new Error("Article introuvable");
    return { article };
  },
  head: ({ params }) => {
    // Head runs before loader on client, so we can't use loaderData here.
    // TanStack will re-run head after loader resolves.
    return {
      meta: [
        { title: `${params.slug} — From Zero to Data` },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Article introuvable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cet article n'existe pas ou a été déplacé.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  ),
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tracking-tight">
              From Zero to <span className="text-gradient-mint">Data</span>
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Retour
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Meta */}
        <p className="eyebrow">{article.category}</p>
        <h1 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          <time dateTime={article.date}>{article.date}</time> · {article.readingTime}
        </p>

        {/* Cover */}
        <div className="mt-10 overflow-hidden rounded-md border border-border/60">
          <img
            src={article.cover}
            alt={article.title}
            width={1280}
            height={800}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        {/* Body */}
        <article
          className="prose-custom mt-14"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        {/* Back */}
        <div className="mt-20 border-t border-border/60 pt-10">
          <Link
            to="/"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            ← Retour à tous les articles
          </Link>
        </div>
      </main>
    </div>
  );
}
