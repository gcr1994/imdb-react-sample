import { get } from "@/utils/api";
import { QueryClientProvider, useQuery, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function Movie() {


    function MovieDetails() {
        const { isLoading, error, data } = useQuery(
            ['movies'],
            async () =>{
    
                const response = get(process.env.NEXT_PUBLIC_API_URL!+"discover/movie", {headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_RAT}`
                }});
                const data = await response;
                console.log(data)
                return JSON.stringify(data);
    
            }
        );

            
    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error 

    return <>{data}</>
    }

    return  (<QueryClientProvider client={queryClient}>
                <MovieDetails/>
            </QueryClientProvider>)

}