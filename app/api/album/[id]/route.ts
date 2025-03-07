// app/api/album/[id]/route.ts
import { getAlbumById } from "../../../../lib/api/theAudioDB";
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
    const album = await getAlbumById(albumId);
    return NextResponse.json({ album });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching album" },
      { status: 500 },
    );
  }
}
