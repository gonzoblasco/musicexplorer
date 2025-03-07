// app/api/album/[id]/tracks/route.ts
import { getTracksByAlbumId } from "../../../../../lib/api/theAudioDB";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const albumId = context.params?.id;

  if (!albumId) {
    return NextResponse.json(
      { error: "Album ID is required" },
      { status: 400 },
    );
  }

  try {
    const tracks = await getTracksByAlbumId(albumId);
    return NextResponse.json({ tracks });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tracks" },
      { status: 500 },
    );
  }
}
