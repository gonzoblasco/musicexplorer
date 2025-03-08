// app/album/[id]/page.tsx
import AlbumPageClient from "../../../components/album/AlbumPageClient";

export const dynamicParams = true;

export default function AlbumPage() {
  return <AlbumPageClient />;
}
