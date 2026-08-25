export function formatPropertyArea(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed) return "";

  const area = trimmed
    .replace(/\s*(?:m(?:²|2)|sqm|sq\.?\s*m(?:etres?)?|square\s+met(?:er|re)s?)\.?\s*$/i, "")
    .trim();
  const compactNumber = area.replace(/[\s,]/g, "");
  const formatted = /^\d+$/.test(compactNumber)
    ? new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(Number(compactNumber))
    : area;

  return `${formatted} m²`;
}
