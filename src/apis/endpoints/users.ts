import { UserModel } from "../models/user";
import useLazyGetApi from "../methods/lazy-get";
import usePatchApi from "../methods/patch";
import usePostApi from "../methods/post";
import usePutApi from "../methods/put";
import { MetaData } from "../../types/meta-data";
import { AxiosRequestConfig } from "axios";

export default function UsersEndpoint() {
  const index = useLazyGetApi<
    { meta: MetaData; data: UserModel[] },
    AxiosRequestConfig
  >({
    endpoint: "/users",
    key: ["USERS"],
  });

  const store = usePostApi<UserModel, UserModel>({
    endpoint: "/users",
    key: ["CREATE USER"],
    isFormData: true,
  });

  const update = usePutApi<UserModel, UserModel>({
    endpoint: (payload) => `/users/${payload.id}`,
    key: ["UPDATE_USER"],
    isFormData: true,
  });

  const updatePassword = usePatchApi<
    UserModel,
    {
      id: number;
      currentPassword: string;
      newPassword: string;
      passwordConfirmation: string;
    }
  >({
    endpoint: (payload) => `/users/${payload.id}`,
    key: ["UPDATE_USER"],
  });

  const destroy = usePostApi<UserModel, { ids: number[] }>({
    endpoint: "/users/delete",
    key: ["DELETE_USERS"],
  });

  return { store, index, update, updatePassword, destroy };
}
