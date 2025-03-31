import useDeleteApi from "../methods/delete";
import useLazyGetApi from "../methods/lazy-get";
import usePatchApi from "../methods/patch";
import usePostApi from "../methods/post";
import usePutApi from "../methods/put";
import { UserModel } from "../models/user";

export default function UsersEndpoint() {
  const index = useLazyGetApi<UserModel>({
    endpoint: `/users`,
    key: "USERS",
  });

  const store = usePostApi<UserModel, UserModel>({
    endpoint: "/users",
    key: "CREATE USER",
  });

  const update = usePutApi<UserModel, UserModel>({
    endpoint: (payload) => `/users/${payload.id}`,
    key: "UPDATE_USER",
    isFormData: true,
  });

  const updatePassword = usePatchApi<
    UserModel,
    { id: number; currentPassword: string; newPassword: string; passwordConfirmation: string }
  >({
    endpoint: (payload) => `/users/${payload.id}`,
    key: "UPDATE_USER",
  });

  const destroy = useDeleteApi<UserModel, { id: number }>({
    endpoint: (payload) => `/users/${payload.id}`,
    key: "DELETE_USER",
  });

  return { store, index, update, updatePassword, destroy };
}
