import SearchPage from "@/components/search-page";

export default async function Home({
  params,
}: {
  params: { genre: string; page?: string; q?: string };
}) {
  return (
    /* @ts-expect-error Server Component */
    <SearchPage
      pageNumber={params.page}
      query={params.q}
      genre={params.genre}
    />
  );
}
