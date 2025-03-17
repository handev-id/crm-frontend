import { AxiosError } from "axios";
import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";
import { UserModel } from "../models/user";
import { ErrorsValidation, UnknownError } from "../../types/api-errors";

export default class authEndpoint {
  static login() {
    const properties = usePostApi<Partial<UserModel>>({
      endpoint: "/auth/login",
      key: "LOGIN",
    });

    // SAYA INGIN ADA HANDLING SEPERTI INI
    const error = properties?.error as AxiosError;
    return {
      ...properties,
      error:
        error.status === 422
          ? (error.response?.data as ErrorsValidation)
          : (error as UnknownError),
    };
  }

  static register() {
    return usePostApi<Partial<UserModel>>({
      endpoint: "/auth/register",
      key: "REGISTER",
    });
  }

  static checkToken() {
    return useLazyGetApi<UserModel>({
      endpoint: "/auth/check",
      key: "CHECK_TOKEN",
    });
  }
}
