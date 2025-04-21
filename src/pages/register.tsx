import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Input from "../components/form/Input";
import Select, { OptionType } from "../components/form/SelectInput";
import Button from "../components/button/Button";
import { GLOBAL_ICONS } from "../utils/icons";
import AuthEndpoint from "../apis/endpoints/auth";
import { Loading } from "../components/Loading";
import { UserModel } from "../apis/models/user";
import { TenantModel } from "../apis/models/tenant";
import logo from "../assets/images/logo-horizontal/600.png";
import Error from "../components/Error";

const Register = () => {
  const [isAccount, setIsAccount] = useState(false);
  const navigate = useNavigate();
  const authApi = AuthEndpoint();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TenantModel & UserModel & { passwordConfirmation: string }>();

  const onRegister = (data: TenantModel & UserModel) => {
    authApi.register.mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/login");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="bg-neutral dark:bg-Dark overflow-y-auto h-screen px-4 py-16">
      <Loading show={authApi.register.isPending} />
      <div className="w-full lg:w-[550px] m-auto p-6 rounded-lg shadow-lg bg-white dark:bg-neutralDark">
        <div className="w-full">
          <img
            src={logo}
            className="max-w-[200px] mx-auto object-contain"
            alt="Logo Caqap"
          />
        </div>

        <Error error={authApi.register.error} />

        <form onSubmit={handleSubmit(onRegister)} className="mt-4">
          {/* STEP 1 - Info Bisnis */}
          {!isAccount && (
            <div className="animate-fade-in transition-opacity duration-500 opacity-100">
              <div className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: "Wajib Diisi" }}
                  render={({ field }) => (
                    <Input
                      leftItem={GLOBAL_ICONS.businessOutline}
                      placeholder="Masukkan Nama Bisnis Anda"
                      {...field}
                      sizing="sm"
                      label="Nama Bisnis"
                      message={errors.name?.message}
                    />
                  )}
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
              </div>
            </div>
          )}

          {/* STEP 2 - Info Akun */}
          {isAccount && (
            <div className="animate-fade-in transition-opacity duration-500 opacity-100">
              <div className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name="fullName"
                  rules={{ required: "Wajib Diisi" }}
                  render={({ field }) => (
                    <Input
                      leftItem={GLOBAL_ICONS.user}
                      placeholder="Masukkan Nama Lengkap Anda"
                      sizing="sm"
                      label="Nama Lengkap"
                      {...field}
                      message={errors.fullName?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "Wajib Diisi" }}
                  render={({ field }) => (
                    <Input
                      label="Email Bisnis"
                      leftItem={GLOBAL_ICONS.email}
                      placeholder="Masukkan Email Bisnis Anda"
                      sizing="sm"
                      {...field}
                      message={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <Input
                      leftItem={GLOBAL_ICONS.phone}
                      placeholder="Masukkan No Telpon / Whatsapp Bisnis Anda"
                      {...field}
                      sizing="sm"
                      label="No Telpon / Whatsapp Bisnis"
                      type="number"
                      message={errors.phone?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={{ required: "Wajib Diisi" }}
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Masukkan Password"
                      leftItem={GLOBAL_ICONS.gembok}
                      sizing="sm"
                      label="Password"
                      message={errors.password?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="passwordConfirmation"
                  rules={{ required: "Wajib Diisi" }}
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Masukkan Konfirmasi Password"
                      leftItem={GLOBAL_ICONS.gembok}
                      sizing="sm"
                      label="Konfirmasi Password"
                      message={errors.passwordConfirmation?.message}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="mt-4">
            {isAccount ? (
              <Button
                loading={authApi.register.isPending}
                type="submit"
                sizing="fullBase"
              >
                Daftar
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setIsAccount(true)}
                sizing="fullBase"
              >
                Lanjut
              </Button>
            )}
          </div>

          <span className="text-sm">
            Sudah Punya Akun?{" "}
            <Link className="text-blue-500" to={"/login"}>
              Login Disini
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
