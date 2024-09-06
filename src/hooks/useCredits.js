import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchCredits = ({ type, id}) => {
  return type == 'movie'
    ? api.get(`/movie/${id}/credits`)
    : api.get(`/tv/${id}/credits`);
};

export const useCreditsQuery = ({ type, id }) => {
  return useQuery({
    queryKey: ["credits", { type, id }],
    queryFn: () => fetchCredits({ type, id }),
  });
};
