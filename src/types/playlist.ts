import { movie } from "./movie";

export type Playlist = {
  _id: string;
  name: string;
  movies: number[];
  userId: string;
};
