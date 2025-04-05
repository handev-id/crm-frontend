import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GLOBAL_ICONS } from "../utils/icons";
import { Loading } from "../components/Loading";
import { UserModel } from "../apis/models/user";
import Input from "../components/form/Input";
import AuthEndpoint from "../apis/endpoints/auth";
import logo from "../assets/images/CAQAP 01.png";
import Button from "../components/button/Button";
import { TenantModel } from "../apis/models/tenant";
import Select, { OptionType } from "../components/form/SelectInput";
import Error from "../components/Error";
import { useEffect, useRef } from "react";

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TenantModel & UserModel & { passwordConfirmation: string }>();
  const bodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const authApi = AuthEndpoint();

  const onRegister = (data: TenantModel & UserModel) => {
    authApi.register.mutate(data, {
      onSuccess: (data) => {
        reset();
        navigate("/login");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    if (authApi.register.error) {
      bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [authApi.register.error]);

  return (
    <div
      ref={bodyRef}
      className="bg-neutral dark:bg-Dark overflow-y-auto h-screen px-4 py-16"
    >
      <Loading show={authApi.register.isPending} />
      <div className="w-full lg:w-[550px] m-auto p-6 rounded-lg shadow-lg bg-white dark:bg-neutralDark">
        <div className="logo dark:hidden mb-8 w-1/2 lg:w-72  mx-auto">
          <img src={logo} alt="Logo Caqap" />
        </div>
        <div className="hidden dark:block mb-8 w-1/2 lg:w-72 mx-auto">
          <img src={logo} alt="Logo Caqap" />
        </div>

        <Error error={authApi.register.error} />
        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex mx-auto flex-col gap-4"
        >
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

          <Button
            loading={authApi.register.isPending}
            type="submit"
            sizing="fullBase"
            className="my-4"
          >
            Daftar
          </Button>
          <span>
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
