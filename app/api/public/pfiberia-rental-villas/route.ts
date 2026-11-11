import { NextResponse } from "next/server";
import {
  readRentalVillas,
  selectRentalCarouselVillas,
  type RentalVilla,
} from "@/app/lib/rentalVillaStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function amount(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value.replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function currency(value?: RentalVilla["currency"]) {
  return value === "EUR" || value === "USD" ? value : "GBP";
}

function formatAmount(value: number, code: "EUR" | "GBP" | "USD") {
  return new Intl.NumberFormat(code === "USD" ? "en-US" : "en-GB", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(value);
}

function price(villa: RentalVilla) {
  const from = amount(villa.priceFrom);
  const to = amount(villa.priceTo);
  const code = currency(villa.currency);
  if (from && to) return `${formatAmount(from, code)} – ${formatAmount(to, code)} per week`;
  if (from || to) return `From ${formatAmount(from || to || 0, code)} per week`;
  return "Price on request";
}

export async function GET() {
  try {
    const villas = selectRentalCarouselVillas(await readRentalVillas()).map((villa) => ({
      id: villa.id,
      code: villa.reference,
      name: villa.title,
      location: villa.location,
      price: price(villa),
      bedrooms: villa.bedrooms,
      bathrooms: villa.bathrooms,
      sleeps: villa.guests,
      image: villa.image,
      detailUrl:
        `https://www.pfeuroasia.com/luxury-villa-rentals?villa=${encodeURIComponent(villa.reference)}` +
        "&utm_source=pfiberia&utm_medium=referral&utm_campaign=rent_before_you_buy#villa-enquiry",
    }));

    return NextResponse.json(
      { villas, updatedAt: new Date().toISOString() },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("pfiberia-rental-feed-unavailable", error);
    return NextResponse.json(
      { villas: [], updatedAt: new Date().toISOString() },
      {
        status: 503,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
