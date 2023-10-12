import { Movie, Serie } from "@/types/movie";
import axios from "axios";
import { useQuery } from "react-query";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.common["Authorization"] =
  "Bearer " + process.env.NEXT_PUBLIC_API_RAT;

export const useMovieList = () => {
  const { isLoading, error, data } = useQuery(["movies"], async () => {
    const movies = await getMovies();
    return movies;
  });
  return { isLoading, error, data };
};

export const useSerieList = () => {
  const { isLoading, error, data } = useQuery(["series"], async () => {
    const series = await getSeries();
    return series;
  });
  return { isLoading, error, data };
};

export const getMovies: () => Promise<Movie[]> = async () => {
  try {
    const response = instance.get("discover/movie");
    const data = await response;
    return data.data.results as Movie[];
  } catch (err) {
    throw err;
  }
};

export const getSeries: () => Promise<Serie[]> = async () => {
  try {
    const response = instance.get("tv/popular");
    const data = await response;
    return data.data.results as Serie[];
  } catch (err) {
    throw err;
  }
};

export const getMovieById: (id: string) => Promise<Movie> = async (id) => {
  try {
    const response = instance.get("movie/" + id);
    const data = await response;
    return data.data as Movie;
  } catch (err) {
    throw err;
  }
};

export const getMovieImage: (path: string) => Promise<any> = async (path) => {
  try {
    const response = axios.get(process.env.NEXT_PUBLIC_TMBD_IMG_URL! + path);
    const data = await response;
    return data.data;
  } catch (err) {
    throw err;
  }
};
