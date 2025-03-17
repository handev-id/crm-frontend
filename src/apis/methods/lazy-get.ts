import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { AxiosRequestConfig } from "axios";
import { ApiPayload } from "../../types/api-payload";

export default function useLazyGetApi<T>({ endpoint, key }: ApiPayload) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (payload: AxiosRequestConfig) => {
      const { data } = await axiosInstance.get<T>(endpoint, payload);
      return data;
    },
  });
}
