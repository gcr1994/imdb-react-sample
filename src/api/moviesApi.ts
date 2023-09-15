import { movie } from "@/types/movie";
import { get } from "@/utils/api";

export const getMovies: () => Promise<movie[]> = async () => {
  try {
    const response = get(process.env.NEXT_PUBLIC_API_URL! + "discover/movie", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_RAT}`,
      },
    });
    const data = await response;
    return data.data.results as movie[];
  } catch (err) {
    throw err;
  }
};

export const getMovieById: (id: string) => Promise<movie> = async (id) => {
  try {
    console.log(id);
    const response = get(process.env.NEXT_PUBLIC_API_URL! + "movie/" + id, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_RAT}`,
      },
    });
    const data = await response;
    return data.data as movie;
  } catch (err) {
    throw err;
  }
};

export const getMovieImage: (path: string) => Promise<any> = async (path) => {
  try {
    const response = get(process.env.NEXT_PUBLIC_TMBD_IMG_URL! + path);
    const data = await response;
    return data.data;
  } catch (err) {
    throw err;
  }
};
