import { Playlist } from "@/types/playlist";
import { User } from "@/types/user";
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
  return data.data as { movies: number[]; name: string };
};

export const putPlaylist = async (
  user: User,
  playlist: Playlist,
  token: string
) => {
  const res = instance.put(
    "playlist/" + playlist._id,
    { movies: playlist.movies, email: user.email },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await res;
  return data.data as Playlist;
};

export const postPlaylist = async (
  user: User,
  playlistName: Playlist,
  token: string
) => {
  const res = instance.put(
    "playlist/",
    { name: playlistName, email: user.email },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await res;
  return data.data as Playlist;
};
