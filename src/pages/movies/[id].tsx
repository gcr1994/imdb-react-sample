import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getMovieById, getMovieImage } from "@/api/moviesApi";
import { movie } from "@/types/movie";
import { useState } from "react";
const queryClient = new QueryClient();

export const Movie = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <QueryClientProvider client={queryClient}>
      <MovieCard id={id as string}></MovieCard>
    </QueryClientProvider>
  );

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
