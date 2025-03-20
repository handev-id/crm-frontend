import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";
import { UserModel } from "../models/user";

export default class AuthEndpoint {
  static login() {
    return usePostApi<Partial<UserModel>>({
      endpoint: "/auth/login",
      key: "LOGIN",
    });
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
