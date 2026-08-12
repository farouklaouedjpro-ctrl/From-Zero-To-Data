import { marked } from "marked";

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
  if (!match) return { frontmatter: {}, body: raw };

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
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

  return { frontmatter, body: match[2] };
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
      slug: frontmatter.slug || "",
      title: frontmatter.title || "",
      excerpt: frontmatter.excerpt || "",
      category: frontmatter.category || "",
      date: frontmatter.date || "",
      readingTime: frontmatter.readingTime || "",
      cover: frontmatter.cover || "",
      featured: frontmatter.featured === "true",
      bodyHtml,
    });
  }

  // Sort by date descending (most recent first)
  articles.sort((a, b) => {
    const parseDate = (d: string) => {
      const months: Record<string, number> = {
        janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
        juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
      };
      const parts = d.split(" ");
      if (parts.length < 3) return 0;
      return new Date(parseInt(parts[2]), months[parts[1].toLowerCase()] ?? 0, parseInt(parts[0])).getTime();
    };
    return parseDate(b.date) - parseDate(a.date);
  });

  cachedArticles = articles;
  return articles;
}

export async function loadArticle(slug: string): Promise<Article | undefined> {
  const articles = await loadArticles();
  return articles.find((a) => a.slug === slug);
}
