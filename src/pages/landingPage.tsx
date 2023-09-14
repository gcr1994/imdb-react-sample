import { useEffect, useState } from "react";
import {get} from '../utils/api'
import { movie } from "@/types/movie";

export default function LandingPage() {
    
    const [movies, setMovies] = useState([] as movie[]);

    useEffect(() => {
        async function fetchData(){
            const response = get(process.env.API_URL!, {headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.API_RAT}`
            }});
            const getData = await response;
            setMovies(getData);
        }
        fetchData();

    }, [])

    return (<>
        {movies.map(movie => movie)}
        </>);
}