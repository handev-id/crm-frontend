import { GLOBAL_ICONS } from "../../utils/icons";
import { Controller, useForm } from "react-hook-form";
import { UserModel } from "../../apis/models/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { useEffect } from "react";
import { setProfile } from "../../utils/store/slices/my-profile";
import Input from "../../components/form/Input";
import Button from "../../components/button/Button";
import Avatar from "../../components/Avatar";
import UsersEndpoint from "../../apis/endpoints/users";
import Error from "../../components/Error";

type UpdatePasswordType = {
  newPassword: string;
  currentPassword: string;
  passwordConfirmation: string;
};

const Account = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const {
    reset,
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>();

  const {
    register: registerUpdatePassword,
    reset: resetUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: updatePasswordErrors },
  } = useForm<UpdatePasswordType>();

  const usersApi = UsersEndpoint();

  const onUpdate = (data: UserModel) => {
    usersApi.update.mutate(
      {
        ...data,
        avatar: data?.avatar instanceof File ? data.avatar : null,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          dispatch(setProfile(data));
        },
      }
    );
  };

  const onUpdatePassword = (data: UpdatePasswordType) => {
    usersApi.updatePassword.mutate(
      {
        id: watch("id"),
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        passwordConfirmation: data.passwordConfirmation,
      },
      {
        onSuccess: () => {
          resetUpdatePassword();
        },
      }
    );
  };

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile]);

  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6 w-full cn-box-base">
        <div className="h2 pb-3 border-b mb-6 border-base">Informasi Akun</div>
        <form
          onSubmit={handleSubmit(onUpdate)}
          className="grid lg:grid-cols-2 gap-6"
        >
          <div className="lg:col-span-2 flex items-center gap-4 justify-center">
            <Controller
              name="avatar"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Avatar
                  value={
                    value instanceof File
                      ? URL.createObjectURL(value)
                      : value?.url
                  }
                  onChange={onChange}
                  sizing="lg"
                />
              )}
            />
            <div className="w-full">
              <Input
                label="Nama Lengkap"
                sizing="sm"
                leftItem={GLOBAL_ICONS.user}
                placeholder="Nama Lengkap"
                {...register("fullName", { required: "Wajib Diisi" })}
                message={errors.fullName?.message}
              />
            </div>
          </div>
          <Input
            label="Email"
            sizing="sm"
            leftItem={GLOBAL_ICONS.email}
            placeholder="Email"
            {...register("email", { required: "Wajib Diisi" })}
            message={errors.email?.message}
          />
          <Input
            label="No Telepon"
            sizing="sm"
            leftItem={GLOBAL_ICONS.phone}
            placeholder="No Telepon"
            {...register("phone", { required: "Wajib Diisi" })}
            message={errors.phone?.message}
          />

          <div className="lg:col-span-2 mt-4 flex justify-between lg:flex-row flex-col">
            <div>
              <Error error={usersApi.update.error} />
            </div>
            <Button loading={usersApi.update.isPending} type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
      <div className="lg:col-span-1 space-y-6 w-full cn-box-base">
        <div className="h2 pb-3 border-b mb-6 border-base">Keamanan</div>
        <div className="space-y-6">
          <Input
            type="password"
            label="Password Saat Ini"
            sizing="sm"
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Password Saat Ini"
            {...registerUpdatePassword("currentPassword", {
              required: "Wajib Diisi",
            })}
            message={updatePasswordErrors.currentPassword?.message}
          />
          <Input
            type="password"
            label="Password Baru"
            sizing="sm"
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Password Baru"
            {...registerUpdatePassword("newPassword", {
              required: "Wajib Diisi",
            })}
            message={errors.password?.message}
          />
          <Input
            type="password"
            label="Konfirmasi Password Baru"
            sizing="sm"
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Konfirmasi Password Baru"
            {...registerUpdatePassword("passwordConfirmation", {
              required: "Wajib Diisi",
            })}
            message={updatePasswordErrors.passwordConfirmation?.message}
          />
          <div className="mt-4 flex flex-col items-end">
            <Button
              onClick={() => handleSubmitUpdatePassword(onUpdatePassword)()}
            >
              Simpan
            </Button>
            <div className="mt-3">
              <Error
                customMsg="Password Saat ini Salah"
                error={usersApi.updatePassword.error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
