import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Shared-password access has been replaced by approved email verification.",
    },
    { status: 410 },
  );
}
