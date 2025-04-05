import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { useEffect, useState } from "react";
import { AttachmentModel } from "../../apis/models/attachment";
import { showRoles } from "../../utils/roles";
import { Modal, useModal } from "../../components/modal";
import { UserModel } from "../../apis/models/user";
import { Controller, useForm } from "react-hook-form";
import { GLOBAL_ICONS } from "../../utils/icons";
import { rolesMap } from "../../types/roles";
import { confirmAlert } from "../../utils/confirmAlert";
import useCheckRoles from "../../utils/hooks/useCheckRoles";
import UsersEndpoint from "../../apis/endpoints/users";
import Avatar from "../../components/Avatar";
import Input from "../../components/form/Input";
import MultiSelect from "../../components/form/MultiSelectInput";
import Actions from "../../components/Actions";
import DataGrid from "../../components/data-grid";
import Button from "../../components/button/Button";

const Users = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [userIds, setUserIds] = useState<number[]>([]);
  const userModal = useModal({});

  useCheckRoles({
    allowed: ["owner", "admin"],
    roles: profile?.roles,
    redirectTo: "/settings/account",
  });

  const usersApi = UsersEndpoint();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserModel>();

  const onSubmit = async (data: UserModel) => {
    await (data.id ? usersApi.update.mutateAsync : usersApi.store.mutateAsync)(
      data
    );
    usersApi.index.mutate({});
    userModal.control.close();
  };

  const onSearch = async (value: string) => {
    await usersApi.index.mutateAsync({
      params: {
        search: value,
      },
    });
  };

  const onDelete = () => {
    confirmAlert({
      title: "Yakin?",
      message: "Anda Akan Menghapus Data Pengguna",
      onConfirm: async () => {
        await usersApi.destroy.mutateAsync({ ids: userIds });
        usersApi.index.mutate({});
      },
    });
  };

  useEffect(() => {
    usersApi.index.mutate({});
  }, []);

  return (
    <div className="space-y-2 w-full cn-box-base">
      <DataGrid
        title="Data Pengguna"
        data={usersApi.index.data?.data || []}
        columns={[
          {
            key: "fullName",
            label: "Nama Lengkap",
            render: (user) => {
              return (
                <>
                  <Avatar value={(user?.avatar as AttachmentModel)?.url} />
                  <span>{user.fullName}</span>
                </>
              );
            },
          },
          {
            key: "phone",
            label: "No Telepon",
          },
          { key: "email", label: "Email" },
          {
            key: "roles",
            label: "Role",
            render: (user) => showRoles(user.roles),
          },
        ]}
        selectedItems={(items) => setUserIds(items.map((user) => user.id))}
        selectItem={(user) => {
          reset(user);
          userModal.control.open();
        }}
        onSearch={async (value) => {
          await onSearch(value);
        }}
        actions={() => {
          return (
            <div className="flex gap-2">
              <Button
                title="Tambah Pengguna"
                sizing="sm"
                onClick={() => userModal.control.open()}
              >
                Tambah
              </Button>
              <Button
                disabled={!userIds.length}
                coloring="danger"
                title={
                  !userIds.length
                    ? "Pilih Pengguna Terlebih Dulu"
                    : "Hapus Pengguna"
                }
                sizing="sm"
                onClick={onDelete}
              >
                Hapus
              </Button>
            </div>
          );
        }}
        loading={usersApi.index.isPending}
      />

      <Modal
        control={userModal.control}
        title={watch("id") ? "Edit Pengguna" : "Tambah Pengguna"}
        onChange={() => {
          reset({});
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="avatar"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex justify-center">
                <Avatar
                  value={
                    value instanceof File
                      ? URL.createObjectURL(value)
                      : value?.url
                  }
                  onChange={onChange}
                  sizing="lg"
                />
              </div>
            )}
          />
          <Input
            label="Nama Lengkap"
            leftItem={GLOBAL_ICONS.user}
            placeholder="Nama Lengkap"
            {...register("fullName", { required: "Wajib Diisi" })}
            message={errors.fullName?.message}
          />
          <Input
            label="Email"
            leftItem={GLOBAL_ICONS.email}
            placeholder="Email"
            {...register("email", { required: "Wajib Diisi" })}
            message={errors.email?.message}
          />
          <Input
            label="No Telepon"
            leftItem={GLOBAL_ICONS.phone}
            placeholder="No Telepon"
            {...register("phone", { required: "Wajib Diisi" })}
            message={errors.phone?.message}
          />
          <Controller
            control={control}
            name="roles"
            rules={{ required: "Wajib Diisi" }}
            render={({ field: { value, onChange } }) => (
              <MultiSelect
                label="Role"
                value={value || []}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (opt) => opt.value
                  );
                  onChange(selectedValues);
                }}
                options={Object.entries(rolesMap).map(([key, label]) => ({
                  label,
                  value: key,
                }))}
                message={errors.roles?.message}
                position="top"
                isDefault
              />
            )}
          />
          <Input
            label="Password"
            leftItem={GLOBAL_ICONS.gembok}
            type="password"
            placeholder="Masukkan Password Akun"
            {...register("password", {
              required: watch("id") ? false : "Wajib Diisi",
            })}
            message={errors.password?.message}
          />
          <Actions
            error={usersApi.store.error || usersApi.update.error}
            loading={usersApi.store.isPending || usersApi.update.isPending}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Users;
