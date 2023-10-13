import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getMovieById, useMovieCredits } from "@/api/moviesApi";
import { Movie as movie } from "@/types/movie";

export const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  const movieId = Array.isArray(id) ? id[0] : id;
  const credits = useMovieCredits(Number.parseInt(movieId!)).data;

  return <MovieCard id={id as string}></MovieCard>;

  function MovieCard(props: { id: string }) {
    const { id } = props;
    const { isLoading, error, data } = useQuery(["movies", id], async () => {
      const movie: movie = await getMovieById(id);
      return movie;
    });

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error;

    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={process.env.NEXT_PUBLIC_TMBD_IMG_URL + data!.poster_path}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data!.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data!.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
};

export default Movie;
