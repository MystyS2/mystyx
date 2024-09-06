import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchReviews = ({ type, id}) => {
  return type == 'movie'
    ? api.get(`/movie/${id}/reviews`)
    : api.get(`/tv/${id}/reviews`);
};

export const useReviewsQuery = ({ type, id }) => {
  return useQuery({
    queryKey: ["Reviews", { type, id }],
    queryFn: () => fetchReviews({ type, id }),
  });
};
