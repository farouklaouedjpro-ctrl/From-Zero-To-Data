import type { Article } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-md border border-border/60">
        <img
          src={article.cover}
          alt={article.title}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <p className="eyebrow mt-6">{article.category}</p>
      <h3 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-primary">
        <a href={`#${article.slug}`}>{article.title}</a>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <p className="mt-5 text-xs text-muted-foreground">
        {article.date} · {article.readingTime}
      </p>
    </article>
  );
}
