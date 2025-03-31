import { useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import PositionedContainer from "../components/PositionedContainer";
import { GLOBAL_ICONS } from "../utils/icons";
import { Loading } from "../components/Loading";
import { UserModel } from "../apis/models/user";
import logo from "../assets/images/CAQAP 01.png";
import Input from "../components/form/Input";
import AuthEndpoint from "../apis/endpoints/auth";
import Error from "../components/Error";
import Button from "../components/button/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [_, setCookie] = useCookies();
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<Partial<UserModel>>();

  const authApi = AuthEndpoint();

  const onLogin = ({ email, password }: Partial<UserModel>) => {
    authApi.login.mutate(
      { email, password },
      {
        onSuccess: (result) => {
          if (result) {
            reset()
            setCookie("token", result.token);
            navigate('/conversations')
          }
        },
      }, 
    );
  };

  return (
    <div className="bg-neutral dark:bg-Dark overflow-y-auto h-screen px-4 py-16">
      <Loading show={authApi.login.isPending} />
      <div className="w-full lg:w-[550px] m-auto p-6 rounded-lg shadow-lg bg-white dark:bg-neutralDark">
        <div className="logo dark:hidden mb-8 w-1/2 lg:w-72  mx-auto">
          <img src={logo} alt="Logo Caqap" />
        </div>
        <div className="hidden dark:block mb-8 w-1/2 lg:w-72 mx-auto">
          <img src={logo} alt="Logo Caqap" />
        </div>

        <Error error={authApi.login.error} />
        <form
          onSubmit={handleSubmit(onLogin)}
          className="flex mx-auto flex-col gap-4"
        >
          <Controller
            control={control}
            name="email"
            rules={{ required: "Wajib Diisi" }}
            render={({ field }) => (
              <Input
                label="Email"
                leftItem={GLOBAL_ICONS.email}
                placeholder="Masukkan Email"
                sizing="sm"
                {...field}
                message={errors.email?.message}
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

          <Button loading={authApi.login.isPending} type="submit" sizing="fullBase" className="my-4">
            Login
          </Button>
          <span>
            Belum Punya Akun? <Link className="text-blue-500" to={"/register"}>Daftar Disini</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
