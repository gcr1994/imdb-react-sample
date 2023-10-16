import {
  addToFavoriteSeries,
  removeFromFavoriteSeries,
} from "@/api/authentication";
import { useSerieList } from "@/api/moviesApi";
import useStore from "@/utils/store";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { Serie } from "@/types/movie";

export const Series = () => {
  const SeriesList = () => {
    const { isLoading, error, data } = useSerieList();

    const store = useStore();

    const { user, token } = store;

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error;

    const handleFavoriteClick = (
      _event: SyntheticEvent<Element, Event>,
      newValue: number | null,
      serie: Serie
    ) => {
      const user = store.user!;
      if (newValue) {
        addToFavoriteSeries(user, serie.id, token!);
        user.favoriteSeries?.push(serie.id);
        store.setUser({ ...user });
      } else {
        const index = user.favoriteSeries?.findIndex((id) => id == serie.id);
        removeFromFavoriteSeries(user, serie.id, token!);
        user.favoriteSeries?.splice(index);
        store.setUser({ ...user });
      }
    };

    return data?.map((serie) => (
      <>
        <Grid key={serie.id} item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={process.env.NEXT_PUBLIC_TMBD_IMG_URL + serie.poster_path}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {serie.name}
                  {user ? (
                    <>
                      <Rating
                        name="simple-controlled"
                        max={1}
                        value={
                          user.favoriteSeries?.find((id) => id == serie.id)
                            ? 1
                            : 0
                        }
                        onChange={(_event, newValue) =>
                          handleFavoriteClick(_event, newValue, serie)
                        }
                      />
                    </>
                  ) : null}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {serie.overview}
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
      <SeriesList />
    </Grid>
  );
};

export default Series;
