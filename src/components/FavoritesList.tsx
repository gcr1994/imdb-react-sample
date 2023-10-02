import { useMovieList } from "@/api/moviesApi";
import { movie } from "@/types/movie";
import useStore from "@/utils/store";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";

export const FavoritesList = () => {
  const { user } = useStore();
  const { data } = useMovieList();

  const favoritesList: movie[] = [];
  user?.favorites.forEach((movieId) => {
    const movie = data?.find((movie) => movie.id === movieId);
    if (movie) favoritesList.push(movie);
  });

  return favoritesList?.map((movie) => (
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
                {movie.title}
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
