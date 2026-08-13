import { parseFrenchDate } from "@/lib/dates";

export type Note = {
  title: string;
  category: string;
  date: string;
};

const markdownFiles = import.meta.glob("/content/notes/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  const rawFrontmatter = match?.[1] ?? "";

  const frontmatter: Record<string, string> = {};
  for (const line of rawFrontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }
  return frontmatter;
}

let cachedNotes: Note[] | null = null;

export async function loadNotes(): Promise<Note[]> {
  if (cachedNotes) return cachedNotes;

  const entries = Object.entries(markdownFiles);
  const notes: Note[] = [];

  for (const [, loader] of entries) {
    const raw = await loader();
    const fm = parseFrontmatter(raw);
    notes.push({
      title: fm["title"] || "",
      category: fm["category"] || "",
      date: fm["date"] || "",
    });
  }

  // Sort by date descending
  notes.sort((a, b) => parseFrenchDate(b.date).getTime() - parseFrenchDate(a.date).getTime());

  cachedNotes = notes;
  return notes;
}
