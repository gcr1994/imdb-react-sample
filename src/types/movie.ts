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

/**
 * Type for each Movie casts
 */
export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  credit_id: number;
  order: number;
};

/**
 * Type for each Movie crew
 */
export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: number;
  department: string;
  job: string;
};

/**
 * Type returned by API
 */
export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
