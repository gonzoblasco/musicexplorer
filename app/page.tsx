// app/page.tsx
import HomeWithSuspense from "../components/home/HomeWithSuspense";

export const dynamic = "force-dynamic";

export default function Home() {
  return <HomeWithSuspense />;
}
