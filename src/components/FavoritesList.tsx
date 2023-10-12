import { useMovieList, useSerieList } from "@/api/moviesApi";
import { Movie, Serie } from "@/types/movie";
import useStore from "@/utils/store";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

export const FavoritesList = ({ showMovies }: { showMovies: boolean }) => {
  const { user } = useStore();
  const movies = useMovieList().data;
  const series = useSerieList().data;

  let favoriteMovies: Movie[] = [];
  let favoriteSeries: Serie[] = [];
  if (showMovies) {
    user?.favoriteMovies?.forEach((movieId) => {
      const movie = movies?.find((movie) => movie.id === movieId);
      if (movie) favoriteMovies.push(movie);
    });
  } else {
    user?.favoriteSeries?.forEach((serieId) => {
      const serie = series?.find((serie) => serie.id === serieId);
      if (serie) favoriteSeries.push(serie);
    });
  }

  const favorites = showMovies ? favoriteMovies : favoriteSeries;

  return favorites?.map((favorite) => (
    <>
      <Grid key={favorite.id} item xs={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={
                process.env.NEXT_PUBLIC_TMBD_IMG_URL + favorite.poster_path
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {favorite.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {favorite.overview}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  ));
};
