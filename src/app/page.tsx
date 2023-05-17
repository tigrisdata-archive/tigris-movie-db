import Footer from "@/components/footer";
import Header from "@/components/header";
import { Movie } from "@/db/models/movie";
import { FindQueryOptions, Tigris } from "@tigrisdata/core";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const tigris = new Tigris();
  const moviesCollection = tigris.getDatabase().getCollection<Movie>(Movie);

  const skip =
    searchParams.page !== undefined ? Number(searchParams.page) * 100 : 0;

  const moviesResult = moviesCollection.findMany({
    options: new FindQueryOptions(100, skip),
  });
  const movies = await moviesResult.toArray();

  const currentPage =
    searchParams.page === undefined ? 0 : Number(searchParams.page);
  const prevPage = Math.max(-1, currentPage - 1);
  const nextPage = movies.length === 100 ? currentPage + 1 : -1;

  return (
    <>
      <Header />

      <div className="mt-10 flex-col w-full">
        {/* Search <form /> goes here  */}
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex align-middle justify-center h-[385px] overflow-hidden">
                  <a className="p-4" href={`#${movie.href}`}>
                    <Image
                      className="rounded-t-lg"
                      src={movie.thumbnail || `/no-image-available.svg`}
                      width={Number(movie.thumbnail_width || 260)}
                      height={Number(movie.thumbnail_height || 385)}
                      alt={`Thumbnail for ${movie.title}`}
                    />
                  </a>
                </div>
                <div className="mt-5 p-5">
                  <a href="#">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {movie.title} ({movie.year})
                    </h2>
                  </a>
                  {movie.extract && (
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {movie.extract}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-evenly my-10">
          {currentPage === 1 && <a href={`/`}>Prev</a>}
          {currentPage > 1 && <a href={`/?page=${prevPage}`}>Prev</a>}
          {nextPage > 0 && <a href={`/?page=${nextPage}`}>Next</a>}
        </div>
      </div>

      <Footer />
    </>
  );
}
