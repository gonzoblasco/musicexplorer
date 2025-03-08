// app/api/artist/[id]/route.ts
import { createApiHandler } from "../../../../lib/api/apiHelpers";
import { getArtistById } from "../../../../lib/api/theAudioDB";

export const GET = createApiHandler(getArtistById, "Artist");
