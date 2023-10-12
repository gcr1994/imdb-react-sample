/**
 * Type for movies
 */
export type Movie = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

/**
 * Type for series
 */
export type Serie = {
  first_air_drop: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  origin_country: string;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
};
