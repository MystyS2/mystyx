import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPV = ({ type, id}) => {
  return type == 'movie'
    ? api.get(`/movie/${id}/videos`)
    : api.get(`/tv/${id}/videos`);
};

export const usePVQuery = ({ type, id }) => {
  return useQuery({
    queryKey: ["Preview video", { type, id }],
    queryFn: () => fetchPV({ type, id }),
  });
};
