import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { AxiosRequestConfig } from "axios";
import { ApiPayload } from "../../types/api-payload";

export default function useGetApi<T = {}>({
  endpoint,
  key,
  isPaginate,
}: ApiPayload<T> & {isPaginate: boolean}) {
  return useQuery({
    queryKey: [key],
    queryFn: async (variables: AxiosRequestConfig) => {
      const url =
        typeof endpoint === "function" ? endpoint(variables) : endpoint;
      const config = { ...variables };

      const { data } = await axiosInstance.get<T>(url, config);
      return data
    },
  });
}
