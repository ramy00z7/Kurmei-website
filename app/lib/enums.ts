export const STATUSES = ["draft", "proposed", "review", "approved", "published", "archived"] as const;
export const PRECISIONS = ["exact", "year", "approximate", "range", "century", "era", "unknown"] as const;
export const LOC_PRECISIONS = ["exact", "approximate", "region", "route", "unknown"] as const;
/** Best-effort sort year from a label like "c. 750 BCE" (-750) or "1956" (1956). Editors can override. */
export function deriveYear(label: string): number | null {
  const m = label.match(/\d+/); if (!m) return null;
  return /\b(bce|bc)\b/i.test(label) ? -Number(m[0]) : Number(m[0]);
}
