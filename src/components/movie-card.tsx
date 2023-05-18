import { Movie } from "@/db/models/movie";
import Image from "next/image";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
        <div className="flex gap-3 text-xs mb-2">
          {movie.genres?.map((genre) => {
            return (
              <span key={genre}>
                <a href={`/genre/${genre}`}>{genre}</a>
              </span>
            );
          })}
        </div>
        {movie.extract && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {movie.extract}
          </p>
        )}
      </div>
    </div>
  );
};
