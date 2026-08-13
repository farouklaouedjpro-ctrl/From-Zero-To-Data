const MONTHS: Record<string, number> = {
  janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
};

/**
 * Parses a French date string like "12 août 2026" into a Date.
 * Returns epoch 0 for unparsable input so sorting stays stable.
 */
export function parseFrenchDate(date: string): Date {
  const parts = date.split(" ");
  if (parts.length < 3) return new Date(0);
  const day = Number.parseInt(parts[0] ?? "", 10);
  const month = MONTHS[(parts[1] ?? "").toLowerCase()] ?? 0;
  const year = Number.parseInt(parts[2] ?? "", 10);
  if (Number.isNaN(day) || Number.isNaN(year)) return new Date(0);
  return new Date(year, month, day);
}

/** Formats a French date string as RFC 2822 for RSS pubDate. */
export function frenchDateToRfc2822(date: string): string {
  return parseFrenchDate(date).toUTCString();
}

/** Formats a French date string as ISO 8601 (YYYY-MM-DD) for sitemap lastmod. */
export function frenchDateToIso(date: string): string {
  const parsed = parseFrenchDate(date);
  if (parsed.getTime() === 0) return "";
  return parsed.toISOString().slice(0, 10);
}
