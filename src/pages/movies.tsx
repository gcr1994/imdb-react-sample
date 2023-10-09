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
} from "@mui/material";
import { SyntheticEvent } from "react";

export const Movies = () => {
  const MovieList = () => {
    const { isLoading, error, data } = useMovieList();

    const store = useStore();

    const user = store.user;

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
                        <>{"list of playlists TODO"}</>
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
