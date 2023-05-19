import SearchPage from "@/components/search-page";
import { Movie } from "@/db/models/movie";
import { SearchQuery, Tigris } from "@tigrisdata/core";

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

export async function generateStaticParams() {
  const tigris = new Tigris();
  const moviesCollection = tigris.getDatabase().getCollection<Movie>(Movie);
  const query: SearchQuery<Movie> = {
    sort: { field: "year", order: "$desc" },
    facets: {
      cast: { size: 1000 },
    },
    hitsPerPage: 1,
  };

  const search = await moviesCollection.search(query, 1);

  // TODO: consider pagination of genre pages
  return search.facets["cast"].counts
    .map((facet) => ({
      cast: facet.value,
    })) // filter out erroneous "." cast entry
    .filter((result) => result.cast !== ".");
}
