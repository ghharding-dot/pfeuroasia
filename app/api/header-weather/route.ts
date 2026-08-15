import { NextResponse } from "next/server";

export const revalidate = 600;

type MetForecast = {
  properties?: {
    timeseries?: Array<{
      data?: {
        instant?: {
          details?: {
            air_temperature?: number;
          };
        };
      };
    }>;
  };
};

async function getTemperature(latitude: number, longitude: number) {
  const url = new URL("https://api.met.no/weatherapi/locationforecast/2.0/compact");
  url.searchParams.set("lat", latitude.toFixed(4));
  url.searchParams.set("lon", longitude.toFixed(4));

  const response = await fetch(url, {
    headers: {
      "User-Agent": "pfeuroasia.com enquiry@pfeuroasia.com",
    },
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`MET Norway request failed with ${response.status}`);
  }

  const data = (await response.json()) as MetForecast;
  const temperature = data.properties?.timeseries?.[0]?.data?.instant?.details?.air_temperature;

  return typeof temperature === "number" ? Math.round(temperature) : null;
}

export async function GET() {
  try {
    const [marbella, kualaLumpur] = await Promise.all([
      getTemperature(36.5101, -4.8824),
      getTemperature(3.139, 101.6869),
    ]);

    return NextResponse.json(
      { marbella, kualaLumpur },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
        },
      },
    );
  } catch (error) {
    console.error("Header weather lookup failed", error);
    return NextResponse.json(
      { marbella: null, kualaLumpur: null },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
        },
      },
    );
  }
}
