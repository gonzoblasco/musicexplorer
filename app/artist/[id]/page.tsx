// app/artist/[id]/page.tsx
import ArtistPageClient from "../../../components/artist/ArtistPageClient";

export const dynamicParams = true;

export default function ArtistPage() {
  return <ArtistPageClient />;
}
