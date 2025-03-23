import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GLOBAL_ICONS } from "../utils/icons";
import { CustomButton } from "../components/button/CustomButton";
import { Loading } from "../components/Loading";
import { UserModel } from "../apis/models/user";
import PositionedContainer from "../components/PositionedContainer";
import Input from "../components/form/Input";
import AuthEndpoint from "../apis/endpoints/auth";

const Register = () => {
  const [isPassword, setIsPassword] = useState(true);
  const { handleSubmit, register } = useForm<UserModel>();
  const navigate = useNavigate();

  const registerApi = AuthEndpoint.register();

  const onLogin = (data: UserModel) => {
    registerApi.mutate(data, {
      onSuccess: (result) => {
        if (result) {
          navigate("/conversatons");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <section className="flex justify-center h-screen items-center">
      {registerApi.isPending && <Loading />}
      <div className="w-[450px]">
        {registerApi.error && (
          <p className="text-red-500 text-sm text-center">Unauthorized</p>
        )}
        <form
          onSubmit={handleSubmit(onLogin)}
          className="flex w-[75%] mt-10 mx-auto flex-col gap-3"
        >
          <Input
            leftItem={GLOBAL_ICONS.user}
            placeholder="Nama Lengkap"
            {...register("fullName")}
          />
          <Input
            leftItem={GLOBAL_ICONS.email}
            placeholder="Email"
            {...register("email")}
          />
          <Input
            leftItem={GLOBAL_ICONS.phone}
            placeholder="Nomor Telepon"
            {...register("phone")}
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
              />
            </div>
            <input
              type={isPassword ? "password" : "text"}
              className="bg-neutral dark:text-white text-Dark dark:bg-neutralDark pl-12 pr-3 py-3.5 w-full rounded-lg placeholder:opacity-100 outline-none hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark placeholder:text-gray-600"
              placeholder="Password"
              {...register("password")}
              required
            />
          </PositionedContainer>
          <CustomButton
            ripleColor="bg-white/70 dark:bg-black/70"
            type="submit"
            className="bg-primary dark:text-Dark dark:bg-primaryDark p-2.5 rounded-lg text-white text-sm"
          >
            Login
          </CustomButton>
        </form>
      </div>
    </section>
  );
};

export default Register;
