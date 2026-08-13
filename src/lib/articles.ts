import { marked } from "marked";

import { parseFrenchDate } from "@/lib/dates";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  cover: string;
  featured?: boolean;
  bodyHtml: string;
};

const markdownFiles = import.meta.glob("/content/articles/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

function parseFrontmatter(raw: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const rawFrontmatter = match?.[1] ?? "";
  const body = match?.[2] ?? raw;

  const frontmatter: Record<string, string> = {};
  for (const line of rawFrontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.md$/, "");
}

let cachedArticles: Article[] | null = null;

export async function loadArticles(): Promise<Article[]> {
  if (cachedArticles) return cachedArticles;

  const entries = Object.entries(markdownFiles);
  const articles: Article[] = [];

  for (const [path, loader] of entries) {
    const raw = await loader();
    const { frontmatter, body } = parseFrontmatter(raw);

    const bodyHtml = marked(body, { breaks: true }) as string;

    articles.push({
      slug: frontmatter["slug"] || slugFromPath(path),
      title: frontmatter["title"] || "",
      excerpt: frontmatter["excerpt"] || "",
      category: frontmatter["category"] || "",
      date: frontmatter["date"] || "",
      readingTime: frontmatter["readingTime"] || "",
      cover: frontmatter["cover"] || "",
      featured: frontmatter["featured"] === "true",
      bodyHtml,
    });
  }

  // Sort by date descending (most recent first)
  articles.sort((a, b) => parseFrenchDate(b.date).getTime() - parseFrenchDate(a.date).getTime());

  cachedArticles = articles;
  return articles;
}

export async function loadArticle(slug: string): Promise<Article | undefined> {
  const articles = await loadArticles();
  return articles.find((a) => a.slug === slug);
}
