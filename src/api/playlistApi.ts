import { movie } from "@/types/movie";
import axios from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_AUTH_URL });

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Caught a 401");
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

export const getPlaylist = async (id: string) => {
  const res = instance.get("playlist/" + id);
  const data = await res;
  return data.data as movie[];
};
