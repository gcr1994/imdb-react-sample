import { addToFavorites, removeFromFavorites } from "@/api/authentication";
import { useMovieList } from "@/api/moviesApi";
import BasicModal from "@/components/Modal";
import { movie } from "@/types/movie";
import useStore from "@/utils/store";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Rating,
  Button,
  FormControl,
  FormLabel,
  Radio,
  Input,
} from "@mui/material";

import { FormEvent, SyntheticEvent, useState } from "react";
import { Playlist } from "@/types/playlist";
import { putPlaylist } from "@/api/playlistApi";

export const Movies = () => {
  const MovieList = () => {
    const { isLoading, error, data } = useMovieList();

    const [isAddPlaylist, setIsAddPlaylist] = useState(false);

    const store = useStore();

    const { user, playlists, setPlaylists } = store;

    const handleCreatePlaylist = () => {
      setIsAddPlaylist(true);
    };

    const handleChangeRadioButton = async (
      playlist: Playlist,
      movie: movie
    ) => {
      const movieIndex = playlist.movies.findIndex(
        (playlistMovie) => movie.id === playlistMovie
      );
      if (movieIndex !== -1) {
        playlist.movies.push(movie.id);
      } else {
        playlist.movies.splice(movieIndex);
      }
      const updatedPlaylist = await putPlaylist(user!, playlist, store.token!);
      let findPlaylist = playlists?.find(
        (list) => list._id === updatedPlaylist._id
      );
      findPlaylist = updatedPlaylist;
      setPlaylists(playlists);
    };

    const handleAddPlaylist = (event: FormEvent<HTMLButtonElement>) => {
      const form = event.currentTarget.value;
      console.log(form);
    };

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error;

    const handleFavoriteClick = (
      _event: SyntheticEvent<Element, Event>,
      newValue: number | null,
      movie: movie
    ) => {
      const user = store.user!;
      if (newValue) {
        addToFavorites(user, movie.id, store.token!);
        user.favorites?.push(movie.id);
        store.setUser({ ...user });
      } else {
        const index = user.favorites?.findIndex((id) => id == movie.id);
        removeFromFavorites(user, movie.id, store.token!);
        user.favorites?.splice(index);
        store.setUser({ ...user });
      }
    };

    return data?.map((movie) => (
      <>
        <Grid key={movie.id} item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={process.env.NEXT_PUBLIC_TMBD_IMG_URL + movie.poster_path}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}{" "}
                  {user ? (
                    <>
                      <Rating
                        name="simple-controlled"
                        max={1}
                        value={
                          user.favorites?.find((id) => id == movie.id) ? 1 : 0
                        }
                        onChange={(_event, newValue) =>
                          handleFavoriteClick(_event, newValue, movie)
                        }
                      />
                      <BasicModal buttonText="Save">
                        <>
                          {!isAddPlaylist ? (
                            <>
                              <FormControl>
                                <FormLabel id="radio-buttons-group">
                                  Add to playlist:
                                </FormLabel>

                                {playlists?.map((playlist) => (
                                  <>
                                    <Radio
                                      checked={
                                        playlist.movies.find(
                                          (playlistMovie) =>
                                            playlistMovie === movie.id
                                        ) !== undefined
                                      }
                                      onChange={() =>
                                        handleChangeRadioButton(playlist, movie)
                                      }
                                      value={playlist._id}
                                      name="radio-buttons"
                                      inputProps={{
                                        "aria-label": playlist.name,
                                      }}
                                    />
                                  </>
                                ))}
                              </FormControl>

                              <Button onClick={handleCreatePlaylist}>
                                Add Playlist
                              </Button>
                            </>
                          ) : (
                            <>
                              <FormControl>
                                <FormLabel id="create-playlist">
                                  Playlist Name:
                                </FormLabel>
                                <Input type="string" placeholder="Name" />
                                <Button onSubmit={handleAddPlaylist} />
                              </FormControl>
                            </>
                          )}
                        </>
                      </BasicModal>
                    </>
                  ) : null}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.overview}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </>
    ));
  };

  return (
    <Grid container spacing={2}>
      <MovieList />
    </Grid>
  );
};

export default Movies;
