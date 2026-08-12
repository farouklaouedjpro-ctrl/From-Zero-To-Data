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
  if (!match) return {};

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
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
      title: fm.title || "",
      category: fm.category || "",
      date: fm.date || "",
    });
  }

  // Sort by date descending
  notes.sort((a, b) => {
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

  cachedNotes = notes;
  return notes;
}
