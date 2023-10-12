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
  Input,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { FormEvent, SyntheticEvent, useState } from "react";
import { Playlist } from "@/types/playlist";
import {
  addMovieToPlaylist,
  postPlaylist,
  removeMovieFromPlaylist,
} from "@/api/playlistApi";

export const Movies = () => {
  const MovieList = () => {
    const { isLoading, error, data } = useMovieList();

    const [playlistName, setPlaylistName] = useState("");

    const [isAddPlaylist, setIsAddPlaylist] = useState(false);

    const store = useStore();

    const { user, token, playlists, setPlaylists } = store;

    const handleIsChecked = (playlist: Playlist, movie: movie): boolean => {
      return (
        playlist.movies.findIndex(
          (playlistMovie) => playlistMovie === movie.id
        ) !== -1
      );
    };

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
      console.log(playlist.movies);
      let updatedPlaylist: Playlist;
      if (movieIndex === -1) {
        playlist.movies.push(movie.id);
        updatedPlaylist = await addMovieToPlaylist(
          user!,
          playlist._id,
          movie.id,
          token!
        );
      } else {
        playlist.movies.splice(movieIndex);
        updatedPlaylist = await removeMovieFromPlaylist(
          user!,
          playlist._id,
          movie.id,
          token!
        );
      }
      let findPlaylist = playlists?.find(
        (list) => list._id === updatedPlaylist._id
      );
      findPlaylist = updatedPlaylist;
      console.log("updated to" + playlist.movies);

      setPlaylists([...(playlists ?? [])]);
    };

    const handleAddPlaylist = async (_event: FormEvent<HTMLButtonElement>) => {
      if (user && token) {
        try {
          const res = await postPlaylist(user, playlistName, token);
          let newPlaylists = playlists ? [...playlists] : [];
          newPlaylists.push(res);
          setPlaylists(newPlaylists);
          setIsAddPlaylist(false);
          setPlaylistName("");
        } catch (err) {
          console.log(err);
        }
      }
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
        user.favoriteMovies?.push(movie.id);
        store.setUser({ ...user });
      } else {
        const index = user.favoriteMovies?.findIndex((id) => id == movie.id);
        removeFromFavorites(user, movie.id, store.token!);
        user.favoriteMovies?.splice(index);
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
                          user.favoriteMovies?.find((id) => id == movie.id)
                            ? 1
                            : 0
                        }
                        onChange={(_event, newValue) =>
                          handleFavoriteClick(_event, newValue, movie)
                        }
                      />
                      <BasicModal buttonText="Save">
                        <>
                          {!isAddPlaylist ? (
                            <>
                              <Grid container xs={12}>
                                <FormControl>
                                  <Grid xs={12}>
                                    <FormLabel id="radio-buttons-group">
                                      Add to playlist:
                                    </FormLabel>
                                  </Grid>

                                  {playlists?.map((playlist) => (
                                    <>
                                      <Grid container xs={12}>
                                        <Grid xs={12}>
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                checked={handleIsChecked(
                                                  playlist,
                                                  movie
                                                )}
                                                onChange={() =>
                                                  handleChangeRadioButton(
                                                    playlist,
                                                    movie
                                                  )
                                                }
                                                value={playlist._id}
                                              />
                                            }
                                            label={playlist.name}
                                          />
                                        </Grid>
                                      </Grid>
                                    </>
                                  ))}
                                  <Grid container xs={12}>
                                    <Grid xs={4}></Grid>

                                    <Grid xs={8}>
                                      <Button onClick={handleCreatePlaylist}>
                                        Add Playlist
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </FormControl>
                              </Grid>
                            </>
                          ) : (
                            <>
                              <FormControl>
                                <FormLabel id="create-playlist">
                                  Playlist Name:
                                </FormLabel>
                                <Input
                                  id="addPlaylist"
                                  type="text"
                                  value={playlistName}
                                  onChange={(e) => {
                                    setPlaylistName(e.currentTarget.value);
                                  }}
                                  placeholder="Name"
                                />
                                <Button
                                  onClick={(event) => handleAddPlaylist(event)}
                                >
                                  Add
                                </Button>
                                <Button onClick={() => setIsAddPlaylist(false)}>
                                  Back
                                </Button>
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
