// app/search/page.tsx
import SearchWithSuspense from "../../components/search/SearchWithSuspense";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return <SearchWithSuspense />;
}
