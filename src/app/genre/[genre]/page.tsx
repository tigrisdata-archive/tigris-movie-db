import SearchPage from "@/components/search-page";
import { Movie } from "@/db/models/movie";
import { SearchQuery, Tigris } from "@tigrisdata/core";

export default async function Genre({
  params,
}: {
  params: { genre: string; page?: string; q?: string };
}) {
  return (
    /* https://github.com/vercel/next.js/issues/42292 */
    /* @ts-expect-error Server Component */
    <SearchPage
      pageNumber={params.page}
      query={params.q}
      genre={decodeURIComponent(params.genre)}
    />
  );
}
