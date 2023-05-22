import { ExpandableSection } from "@/components/expandable-section";
import { Filterlist } from "@/components/filter-list";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { MovieCard } from "@/components/movie-card";
import { searchMovies } from "@/utils/search-movies";
import Link from "next/link";

const PAGE_SIZE = 50;

export type SearchPageProps = {
  pageNumber?: number | string;
  query?: string;
  genre?: string;
  cast?: string;
};

export default async function SearchPage(props: SearchPageProps) {
  const searchTerm = props.query || "";
  const currentPage =
    props.pageNumber === undefined ? 1 : Number(props.pageNumber);
  const prevPage = Math.max(-1, currentPage - 1);

  const { movies, castFacets, genreFacets } = await searchMovies({
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
    query: searchTerm,
    cast: props.cast,
    genre: props.genre,
  });

  const nextPage = movies.length === PAGE_SIZE ? currentPage + 1 : -1;

  return (
    <>
      <Header />

      <div className="mt-10 flex-col w-full">
        <form
          method="GET"
          action="/"
          className="flex flex-col lg:flex-row text-lg text-gray-950 space-y-4 lg:space-x-4 lg:space-y-0"
        >
          <input
            type="text"
            name="q"
            placeholder="Search: term, cast, genre..."
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
          {props.genre && <span> &gt; Genre &gt; {props.genre}</span>}
          {props.cast && <span> &gt; Cast &gt; {props.cast}</span>}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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
            const pojMovie = Object.assign({}, movie);
            return <MovieCard key={movie.id} movie={pojMovie} />;
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
