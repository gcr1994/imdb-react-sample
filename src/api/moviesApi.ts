import { movie } from "@/types/movie";
import axios from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.common["Authorization"] =
  "Bearer " + process.env.NEXT_PUBLIC_API_RAT;

export const getMovies: () => Promise<movie[]> = async () => {
  try {
    const response = instance.get("discover/movie");
    const data = await response;
    return data.data.results as movie[];
  } catch (err) {
    throw err;
  }
};

export const getMovieById: (id: string) => Promise<movie> = async (id) => {
  try {
    const response = instance.get("movie/" + id);
    const data = await response;
    return data.data as movie;
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
