import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTrendingAll=()=>{
    return api.get(`/trending/all/day`)
}

export const useTrendingAllQuery =()=>{
    return useQuery({
        queryKey:['trending-all'],
        queryFn:fetchTrendingAll,
        select:(result)=>result.data
    })
}
