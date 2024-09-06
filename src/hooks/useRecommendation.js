import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendation = ({ type, id}) => {
  return type == 'movie'
    ? api.get(`/movie/${id}/recommendations`)
    : api.get(`/tv/${id}/recommendations`);
};

export const useRecommendationQuery = ({ type, id }) => {
  return useQuery({
    queryKey: ["recommendations", { type, id }],
    queryFn: () => fetchRecommendation({ type, id }),
  });
};
