import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { ApiPayload } from "../../types/api-payload";

export default function usePostApi<T>({ endpoint, key }: ApiPayload) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (body: T) => {
      const { data } = await axiosInstance.post<T>(endpoint, { ...body });
      return data;
    },
  });
}
