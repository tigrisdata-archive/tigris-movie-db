import SearchPage from "@/components/search-page";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  return (
    /* @ts-expect-error Server Component */
    <SearchPage pageNumber={searchParams.page} query={searchParams.q} />
  );
}

export async function generateStaticParams() {
  // TODO: consider pagination of genre pages
  return [{}];
}
