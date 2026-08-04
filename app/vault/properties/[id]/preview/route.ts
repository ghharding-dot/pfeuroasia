import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const url = new URL("/vault/properties?notice=property-saved", request.url);
  return NextResponse.redirect(url, 303);
}
