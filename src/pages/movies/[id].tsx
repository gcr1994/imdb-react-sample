import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
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
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={""} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {
                //movie.title
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {
                //movie.overview
              }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
};

export default Movie;
