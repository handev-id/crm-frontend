import { GLOBAL_ICONS } from "../../utils/icons";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { useEffect } from "react";
import { setProfile } from "../../utils/store/slices/my-profile";
import { TenantModel } from "../../apis/models/tenant";
import { OptionType } from "../../components/form/LargeSelectInput";
import Input from "../../components/form/Input";
import Avatar from "../../components/Avatar";
import TenantEndpoint from "../../apis/endpoints/tenant";
import useCheckRoles from "../../utils/hooks/useCheckRoles";
import Select from "../../components/form/SelectInput";
import Actions from "../../components/Actions";
import TextArea from "../../components/form/TextArea";

const Tenant = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  useCheckRoles({
    allowed: ["owner"],
    roles: profile?.roles,
    redirectTo: "/settings/account",
  });

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantModel>();

  const tenantApi = TenantEndpoint();

  const onUpdate = (data: TenantModel) => {
    tenantApi.update.mutate(
      {
        ...data,
        logo: data?.logo instanceof File ? data.logo : null,
      },
      {
        onSuccess: (data) => {
          dispatch(setProfile({ ...profile!, tenant: data }));
        },
      }
    );
  };

  useEffect(() => {
    if (profile?.tenant) {
      reset(profile.tenant);
    }
  }, [profile]);

  return (
    <div className="space-y-6 w-full cn-box-base">
      <div className="h2 pb-3 border-b mb-6 border-base">Informasi Bisnis</div>
      <form
        onSubmit={handleSubmit(onUpdate)}
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-3 mb-4 flex-col flex items-center gap-4 justify-center">
          <Controller
            name="logo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Avatar
                value={
                  value instanceof File
                    ? URL.createObjectURL(value)
                    : value?.url
                }
                onChange={onChange}
                sizing="xl"
              />
            )}
          />
          <Input
            sizing="sm"
            placeholder="Nama Bisnis Anda"
            {...register("name", { required: "Wajib Diisi" })}
            className="text-center"
            message={errors.name?.message}
          />
        </div>
        <Input
          label="Email Bisnis"
          sizing="sm"
          leftItem={GLOBAL_ICONS.email}
          placeholder="Email Bisnis Anda"
          {...register("email", { required: "Wajib Diisi" })}
          message={errors.email?.message}
        />
        <Input
          label="No Telepon / Whatsapp Bisnis"
          sizing="sm"
          leftItem={GLOBAL_ICONS.phone}
          placeholder="No Telepon Bisnis Anda"
          {...register("phone", { required: "Wajib Diisi" })}
          message={errors.phone?.message}
        />
        <Controller
          control={control}
          name="type"
          rules={{ required: "Wajib Diisi" }}
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              label="Tipe Bisnis"
              onChange={(val) => {
                onChange((val as OptionType).value);
              }}
              options={[{ label: "Retail", value: "Retail" }]}
              message={errors.type?.message}
              isDefault
            />
          )}
        />
        <div className="grid lg:grid-cols-2 lg:col-span-3 gap-4">
          <TextArea
            label="Alamat"
            placeholder="Masukkan Alamat Bisnis Anda"
            {...register("address", { required: "Wajib Diisi" })}
            message={errors.address?.message}
          />
          <TextArea
            label="Deskripsi"
            placeholder="Jelaskan Tentang Bisnis Anda"
            {...register("description", { required: "Wajib Diisi" })}
            message={errors.address?.message}
          />
        </div>
        <Actions
          className="lg:col-span-3"
          loading={tenantApi.update.isPending}
          error={tenantApi.update.error}
        />
      </form>
    </div>
  );
};

export default Tenant;
