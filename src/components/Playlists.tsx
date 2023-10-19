import useStore from "@/utils/store";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

export const Playlists = () => {
  const { playlists } = useStore();

  return playlists?.map((playlist) => (
    <>
      <Grid key={playlist._id} item xs={4}>
        <Card sx={{ maxWidth: 345 }} className="mui-card-color">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {playlist.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Movies in playlist: ${playlist.movies.length}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  ));
};
