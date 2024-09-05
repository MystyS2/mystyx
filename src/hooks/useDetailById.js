import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchDetailbyId = ({ type, id }) => {
  return api.get(`/${type}/${id}`);
};

export const useDetailByIdQuery = ({ type, id }) => {
  return useQuery({
    queryKey: ["find-by-id", { type, id }],
    queryFn: () => fetchDetailbyId({ type, id }),
  });
};