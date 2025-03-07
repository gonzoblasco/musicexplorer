// app/api/search/route.ts
import { searchArtist } from "../../../lib/api/theAudioDB";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ artists: [] });
  }

  try {
    const artists = await searchArtist(query);
    return NextResponse.json({ artists });
  } catch (error) {
    return NextResponse.json(
      { error: "Error searching artists" },
      { status: 500 },
    );
  }
}
