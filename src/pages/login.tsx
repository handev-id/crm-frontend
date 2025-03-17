import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import PositionedContainer from "../components/PositionedContainer";
import { GLOBAL_ICONS } from "../utils/icons";
import { RippleButton } from "../components/button/RippleButton";
import { Loading } from "../components/Loading";
import { UserModel } from "../apis/models/user";
import logo from "../assets/images/CAQAP 01.png";
import Input from "../components/form/Input";
import authEndpoint from "../apis/endpoints/auth";

const Login = () => {
  const [_, setCookie] = useCookies();
  const [isPassword, setIsPassword] = useState(true);
  const { handleSubmit, register } = useForm<Partial<UserModel>>();

  const loginApi = authEndpoint.login();

  const onLogin = ({ email, password }: Partial<UserModel>) => {
    loginApi.mutate(
      { email, password },
      {
        onSuccess: (result) => {
          if (result) {
            setCookie("token", result.token);
            window.location.href = "/conversations";
          }
        },
      }
    );
  };

  return (
    <section className="flex justify-center h-screen items-center">
      {loginApi.isPending && <Loading />}
      <div className="w-[450px]">
        <div className="logo dark:hidden">
          <img
            src={logo}
            className="w-[80%] mx-auto sm:w-full"
            alt="Logo Caqap"
          />
        </div>
        <div className="hidden dark:block">
          <img
            src={logo}
            className="w-[80%] mx-auto sm:w-full"
            alt="Logo Caqap"
          />
        </div>
        {loginApi.error && (
          <p className="text-red-500 text-sm text-center">Unauthorized</p>
        )}
        <form
          onSubmit={handleSubmit(onLogin)}
          className="flex w-[75%] mt-10 mx-auto flex-col gap-3"
        >
          <Input
            leftItem={GLOBAL_ICONS.email}
            placeholder="Email"
            {...register("email")}
          />
          <PositionedContainer
            items={GLOBAL_ICONS.gembok}
            className="text-2xl dark:text-neutral text-Dark/70"
            positioning="top-4 left-3"
          >
            <div
              onClick={() => setIsPassword(!isPassword)}
              className="rounded-full cursor-pointer hover:bg-neutralHover"
            >
              <PositionedContainer
                items={isPassword ? GLOBAL_ICONS.eye : GLOBAL_ICONS.eyeSlash}
                className="text-2xl dark:text-neutral text-Dark/70"
                positioning="top-4 right-3"
              >
                <div></div>
              </PositionedContainer>
            </div>
            <input
              type={isPassword ? "password" : "text"}
              className="bg-neutral dark:text-white text-Dark dark:bg-neutralDark pl-12 pr-3 py-3.5 w-full rounded-lg placeholder:opacity-100 outline-none hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark placeholder:text-gray-600"
              placeholder="Password"
              {...register("password")}
              required
            />
          </PositionedContainer>
          <RippleButton
            ripleColor="bg-white/70 dark:bg-black/70"
            type="submit"
            className="bg-primary dark:text-Dark dark:bg-primaryDark p-2.5 rounded-lg text-white text-sm"
          >
            Login
          </RippleButton>
        </form>
      </div>
    </section>
  );
};

export default Login;
