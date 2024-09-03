import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTvGenres=()=>{
    return api.get(`/genre/tv/list`)
}

export const useTvGenresQuery =()=>{
    return useQuery({
        queryKey:['Tv-genres'],
        queryFn:fetchTvGenres,
        select:(result)=>result.data.genres,
        staleTime: 300000 // 5분
    })
}