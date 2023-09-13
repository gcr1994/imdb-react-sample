import { useEffect, useState } from "react";
import {get} from '../utils/api'

export default function LandingPage() {
    
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            // TODO get real url
            const response = get('url');
            const getData = await response;
            setMovies(getData);
        }
        fetchData();

    }, [])

    return (<>
        {movies.map(movie => movie)}
        </>);
}