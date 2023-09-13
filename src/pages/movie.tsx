import { get } from "@/utils/api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";


export default function Movie() {
    const [movie, setMovie] = useState({})
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () =>{
            const request = get('url');
            const data = await request;
            return data;

        }
    })

    
    useEffect(()=> {
        async function fetchData() {
            // TODO get real url
            const response = get('url');
            const getData = await response;
            setMovie(getData);
        }
        
        fetchData();
    },[])

        

    
    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error 


    return  (<>
                {movie}
                {data}
            </>)

}