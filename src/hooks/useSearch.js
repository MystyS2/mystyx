import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearch = ({ keyword, page}) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/trending/all/day?page=${page}`);
};

export const useSearchQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page }],
    queryFn: () => fetchSearch({ keyword, page }),
  });
};
