// app/api/album/[id]/route.ts
import { getAlbumById } from "../../../../lib/api/theAudioDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const albumId = params.id;

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
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Error fetching album ${albumId}:`, errorMessage);

    return NextResponse.json(
      { error: "Error fetching album" },
      { status: 500 },
    );
  }
}
