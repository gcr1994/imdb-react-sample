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
  const res = instance.get("playlists/" + id);
  const data = await res;
  return data.data as { movies: number[]; name: string };
};

export const putPlaylist = async (
  user: User,
  playlist: Playlist,
  token: string
) => {
  const res = instance.put(
    "user/playlists/" + playlist._id,
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
  playlistName: string,
  token: string
) => {
  const res = instance.post(
    "user/playlists/",
    { playlistName: playlistName, email: user.email },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await res;
  return data.data.playlist as Playlist;
};

export const addMovieToPlaylist = async (
  user: User,
  playlistId: string,
  movieId: number,
  token: string
) => {
  const res = instance.post(
    "user/playlists/addMovie",
    { playlistId, movieId, email: user.email },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await res;
  return data.data.playlist as Playlist;
};

export const removeMovieFromPlaylist = async (
  user: User,
  playlistId: string,
  movieId: number,
  token: string
) => {
  const res = instance.post(
    "user/playlists/removeMovie",
    { playlistId, movieId, email: user.email },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await res;
  return data.data.playlist as Playlist;
};
