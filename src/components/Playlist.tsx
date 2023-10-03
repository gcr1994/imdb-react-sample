import { getPlaylist } from "@/api/playlistApi";
import { movie } from "@/types/movie";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

export const Playlist = async (id: string) => {
  const movies = await getPlaylist(id);

  return movies?.map((movie: movie) => (
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
