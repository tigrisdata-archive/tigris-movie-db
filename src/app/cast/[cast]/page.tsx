import SearchPage from "@/components/search-page";

export default async function Cast({
  params,
}: {
  params: { cast: string; page?: string; q?: string };
}) {
  return (
    /* https://github.com/vercel/next.js/issues/42292 */
    /* @ts-expect-error Server Component */
    <SearchPage
      pageNumber={params.page}
      query={params.q}
      cast={decodeURIComponent(params.cast)}
    />
  );
}
