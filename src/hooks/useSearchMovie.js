import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}`)
    : api.get("/trending/all/day");
};

export const useSearchMovieQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ["movie-search", keyword],
    queryFn: () => fetchSearchMovie({ keyword }),
  });
};
