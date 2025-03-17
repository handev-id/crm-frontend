import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { ApiPayload } from "../../types/api-payload";

export default function useGetApi<T>({ endpoint, key, params }: ApiPayload) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(endpoint, { params });
      return data;
    },
  });
}
