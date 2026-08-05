export type PropertyCurrency = "EUR" | "USD" | "GBP" | "MYR" | "AED";

const FALLBACK_EUR_USD_RATE = 1.16;

export function normalizePriceAmount(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value !== "string") return undefined;

  const cleaned = value.replace(/[^0-9.,]/g, "").trim();
  if (!cleaned) return undefined;

  let normalized = cleaned;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");

  if (lastComma > lastDot && cleaned.length - lastComma <= 3) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    normalized = cleaned.replace(/,/g, "");
  }

  const amount = Number(normalized);
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

export function normalizePropertyCurrency(value: unknown): PropertyCurrency {
  return value === "USD" || value === "GBP" || value === "MYR" || value === "AED"
    ? value
    : "EUR";
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
