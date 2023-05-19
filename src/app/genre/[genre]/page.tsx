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
      genre={params.genre}
    />
  );
}

export async function generateStaticParams() {
  const tigris = new Tigris();
  const moviesCollection = tigris.getDatabase().getCollection<Movie>(Movie);
  const query: SearchQuery<Movie> = {
    sort: { field: "year", order: "$desc" },
    facets: {
      genres: { size: 1000 },
    },
    hitsPerPage: 1,
  };

  const search = await moviesCollection.search(query, 1);

  // TODO: consider pagination of genre pages
  return search.facets["genres"].counts.map((facet) => ({
    genre: facet.value,
  }));
}
