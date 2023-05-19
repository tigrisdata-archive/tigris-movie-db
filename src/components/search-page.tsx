import { ExpandableSection } from "@/components/expandable-section";
import { Facet, Filterlist } from "@/components/filter-list";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { MovieCard } from "@/components/movie-card";
import { Movie } from "@/db/models/movie";
import { Tigris, SearchQuery, Case } from "@tigrisdata/core";
import Link from "next/link";

export type SearchPageProps = {
  pageNumber?: number | string;
  query?: string;
  genre?: string;
  cast?: string;
};

export default async function SearchPage(props: SearchPageProps) {
  const tigris = new Tigris();
  const moviesCollection = tigris.getDatabase().getCollection<Movie>(Movie);

  const searchTerm = props.query || "";

  const PAGE_SIZE = 50;

  const currentPage =
    props.pageNumber === undefined ? 1 : Number(props.pageNumber);
  const prevPage = Math.max(-1, currentPage - 1);

  const query: SearchQuery<Movie> = {
    q: searchTerm || undefined,
    sort: { field: "year", order: "$desc" },
    hitsPerPage: PAGE_SIZE,
    options: {
      collation: { case: Case.CaseInsensitive },
    },
    facets: {
      genres: {
        size: 100,
      },
      cast: {
        size: 100,
      },
    },
  };

  if (props.genre) {
    query.filter = {
      genres: props.genre,
    };
  }

  if (props.cast) {
    query.filter = {
      cast: props.cast,
    };
  }

  const moviesResults = await moviesCollection.search(query, currentPage);
  const movies = moviesResults.hits.map((hit) => hit.document);
  const castFacets: Facet[] = moviesResults.facets["cast"].counts.map(
    (cast) => {
      return { count: cast.count, value: cast.value };
    }
  );
  const genreFacets: Facet[] = moviesResults.facets["genres"].counts.map(
    (genre) => {
      return { count: genre.count, value: genre.value };
    }
  );
  const nextPage = movies.length === PAGE_SIZE ? currentPage + 1 : -1;

  return (
    <>
      <Header />

      <div className="mt-10 flex-col w-full">
        <form
          method="GET"
          action="/"
          className="flex w-full text-lg text-gray-950 space-x-4"
        >
          <input
            type="text"
            name="q"
            placeholder="Search..."
            defaultValue={searchTerm}
            className="p-4 rounded-lg grow"
          />
          <button className="rounded-lg p-4 bg-sky-600 text-white">
            Search
          </button>
        </form>

        <ExpandableSection
          title="Explore"
          titleClassName="text-lg"
          className="mt-10 mb-5 rounded-lg bg-slate-800 p-4"
        >
          <div>
            <Filterlist
              name="Cast"
              facets={castFacets}
              path="/cast/"
              className="my-2 rounded-lg bg-slate-600 p-4"
            />
            <Filterlist
              name="Genres"
              facets={genreFacets}
              path="/genre/"
              className="rounded-lg bg-slate-600 p-4"
            />
          </div>
        </ExpandableSection>

        <h2 className="text-lg mt-10 mb-5">
          <Link href="/">Movies</Link>
          {props.genre && <span> &gt; {props.genre}</span>}
          {props.cast && <span> &gt; {props.cast}</span>}
        </h2>
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {movies.length === 0 && (
            <div>
              <p>No movies found matching:</p>
              <ul>
                {props.query && <li>Query: &quot;{props.query}&quot;</li>}
                {props.pageNumber && (
                  <li>Page: &quot;{props.pageNumber}&quot;</li>
                )}
                {props.genre && <li>Genre: &quot;{props.genre}&quot;</li>}
                {props.cast && <li>Cast: &quot;{props.cast}&quot;</li>}
              </ul>
            </div>
          )}
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
        <div className="flex justify-evenly my-10">
          {currentPage === 2 && <Link href={`/`}>Prev</Link>}
          {currentPage > 2 && <Link href={`/?page=${prevPage}`}>Prev</Link>}
          {nextPage > 0 && <Link href={`/?page=${nextPage}`}>Next</Link>}
        </div>
      </div>

      <Footer />
    </>
  );
}
