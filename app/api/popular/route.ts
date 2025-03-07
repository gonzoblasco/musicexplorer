// app/api/popular/route.ts
import { getPopularArtists } from "../../../lib/api/theAudioDB";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const artists = await getPopularArtists();
    return NextResponse.json({ artists });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching popular artists" },
      { status: 500 },
    );
  }
}
