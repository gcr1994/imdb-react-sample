import { getMovies } from "@/api/moviesApi";
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

    return <>{data}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MovieList />
    </QueryClientProvider>
  );
};

export default Movies;
