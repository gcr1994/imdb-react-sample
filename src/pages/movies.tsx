import { getMovies } from "@/api/moviesApi";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import image from "next/image";
import { QueryClientProvider, useQuery, QueryClient } from "react-query";

const queryClient = new QueryClient();

export const Movies = () => {
  const MovieList = () => {
    const { isLoading, error, data } = useQuery(["movies"], async () => {
      const movies = await getMovies();
      return movies;
    });

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error;

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

  return (
    <QueryClientProvider client={queryClient}>
      <Grid container spacing={2}>
        <MovieList />
      </Grid>
    </QueryClientProvider>
  );
};

export default Movies;
