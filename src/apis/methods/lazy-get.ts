import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { AxiosRequestConfig } from "axios";
import { ApiPayload } from "../../types/api-payload";

export default function useLazyGetApi<T, V = any>({
  endpoint,
  key,
}: ApiPayload<T, V>) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (variables: V & AxiosRequestConfig) => {
      const url =
        typeof endpoint === "function" ? endpoint(variables) : endpoint;
      const config = { ...variables };
      delete config.params; // optional: untuk hindari override dari endpoint

      const { data } = await axiosInstance.get<T>(url, config);
      return data;
    },
  });
}
