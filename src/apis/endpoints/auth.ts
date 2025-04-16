import useDeleteApi from "../methods/delete";
import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";
import { TenantModel } from "../models/tenant";
import { UserModel } from "../models/user";

export default function AuthEndpoint() {
  const register = usePostApi<TenantModel, TenantModel & UserModel>({
    endpoint: "/auth/register",
    key: ["REGISTER"],
  });

  const login = usePostApi<UserModel, Partial<UserModel>>({
    endpoint: "/auth/login",
    key: ["LOGIN"],
  });

  const checkToken = useLazyGetApi<UserModel>({
    endpoint: "/auth/check",
    key: ["CHECK_TOKEN"],
  });

  const logout = useDeleteApi<{ message: string }>({
    endpoint: "/auth/logout",
    key: ["LOGOUT"],
  });

  return {
    register,
    login,
    logout,
    checkToken,
  };
}
