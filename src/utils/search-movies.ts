import { Movie } from "@/db/models/movie";
import { Case, SearchQuery, Tigris } from "@tigrisdata/core";
import { cache } from "react";
import "server-only";

export type SearchMovieParams = {
  pageNumber?: number;
  pageSize?: number;
  query?: string;
  genre?: string;
  cast?: string;
};

export type Facet = {
  value: string;
  count: number;
};

export const preload = (pageSize: number) => {
  void searchMovies({ pageSize });
};

export const searchMovies = cache(
  async ({ pageNumber, pageSize, query, genre, cast }: SearchMovieParams) => {
    const tigris = new Tigris();
    const moviesCollection = tigris.getDatabase().getCollection<Movie>(Movie);

    const searchQuery: SearchQuery<Movie> = {
      q: query || undefined,
      sort: { field: "year", order: "$desc" },
      hitsPerPage: pageSize,
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

    if (genre) {
      searchQuery.filter = {
        genres: genre,
      };
    }

    if (cast) {
      searchQuery.filter = {
        cast,
      };
    }

    const moviesResults = await moviesCollection.search(
      searchQuery,
      pageNumber ? Number(pageNumber) : 1
    );
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

    return { movies, castFacets, genreFacets };
  }
);
