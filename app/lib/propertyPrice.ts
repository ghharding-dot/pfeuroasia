export type PropertyCurrency = "EUR" | "USD" | "GBP" | "MYR" | "AED";

const FALLBACK_EUR_USD_RATE = 1.16;

export function normalizePriceAmount(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value !== "string") return undefined;

  const cleaned = value.replace(/[^0-9.,]/g, "").trim();
  if (!cleaned) return undefined;

  const separators = cleaned.match(/[.,]/g) || [];
  let normalized = cleaned;

  if (separators.length > 1) {
    const groups = cleaned.split(/[.,]/);
    const finalGroup = groups.at(-1) || "";
    const looksLikeThousands = groups.slice(1).every((group) => group.length === 3);

    normalized = looksLikeThousands
      ? groups.join("")
      : `${groups.slice(0, -1).join("")}.${finalGroup}`;
  } else if (separators.length === 1) {
    const separator = separators[0];
    const [whole, fraction = ""] = cleaned.split(separator);
    normalized = fraction.length === 3 && whole.length >= 1
      ? `${whole}${fraction}`
      : `${whole}.${fraction}`;
  }

  const amount = Number(normalized);
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

export function normalizePropertyCurrency(value: unknown): PropertyCurrency {
  return value === "USD" || value === "GBP" || value === "MYR" || value === "AED"
    ? value
    : "EUR";
}

export function inferLegacyCurrency(value: unknown): PropertyCurrency {
  if (typeof value !== "string") return "EUR";
  const upper = value.toUpperCase();
  if (upper.includes("USD") || upper.includes("US$") || upper.includes("$")) return "USD";
  if (upper.includes("GBP") || upper.includes("£")) return "GBP";
  if (upper.includes("MYR") || upper.includes("RM")) return "MYR";
  if (upper.includes("AED")) return "AED";
  return "EUR";
}

export function formatPropertyCurrency(amount: number, currency: PropertyCurrency) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function getEurUsdRate(): Promise<number> {
  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=EUR&to=USD", {
      next: { revalidate: 43200 },
    });
    if (!response.ok) return FALLBACK_EUR_USD_RATE;
    const data = await response.json();
    const rate = Number(data?.rates?.USD);
    return Number.isFinite(rate) && rate > 0 ? rate : FALLBACK_EUR_USD_RATE;
  } catch {
    return FALLBACK_EUR_USD_RATE;
  }
}

export async function formatPropertyPrice(
  amount?: number,
  currency: PropertyCurrency = "EUR",
) {
  if (!amount) {
    return { primary: "Price on application", secondary: "" };
  }

  const primary = formatPropertyCurrency(amount, currency);
  if (currency !== "EUR") return { primary, secondary: "" };

  const eurUsdRate = await getEurUsdRate();
  return {
    primary,
    secondary: `Approx. ${formatPropertyCurrency(amount * eurUsdRate, "USD")}`,
  };
}
