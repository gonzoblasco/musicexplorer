// app/api/artist/[id]/route.ts
import { getArtistById } from "../../../../lib/api/theAudioDB";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const artistId = context.params.id;

  if (!artistId) {
    return NextResponse.json(
      { error: "Artist ID is required" },
      { status: 400 },
    );
  }

  try {
    const artist = await getArtistById(artistId);
    return NextResponse.json({ artist });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching artist" },
      { status: 500 },
    );
  }
}
