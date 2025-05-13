import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { GLOBAL_ICONS } from "../utils/icons";
import { UserModel } from "../apis/models/user";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-horizontal/600.png";
import Input from "../components/form/Input";
import AuthEndpoint from "../apis/endpoints/auth";
import Error from "../components/Error";
import Button from "../components/button/Button";
import toast from "react-hot-toast";

const Login = () => {
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Partial<UserModel>>();

  const authApi = AuthEndpoint();

  const onLogin = ({ email, password }: Partial<UserModel>) => {
    toast.promise(
      authApi.login.mutateAsync(
        { email, password },
        {
          onSuccess: (result) => {
            if (result) {
              reset();
              setCookie("token", result.token, {
                path: "/",
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
                secure: false,
              });
              navigate("/");
            }
          },
        }
      ),
      {
        loading: "Loading...",
        success: "Login Berhasil",
        error: "Login Gagal, silahkan coba lagi",
      }
    );
  };

  return (
    <div className="bg-neutral dark:bg-Dark overflow-y-auto h-screen px-4 py-16">
      <div className="w-full lg:w-[550px] m-auto p-6 rounded-lg shadow-lg bg-white dark:bg-neutralDark">
        <div className="w-full">
          <img
            src={logo}
            className="max-w-[200px] mx-auto object-contain"
            alt="Logo Caqap"
          />
        </div>

        <Error
          customMsg="Email Atau Password Salah"
          error={authApi.login.error}
        />
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

          <Button
            loading={authApi.login.isPending}
            type="submit"
            sizing="fullBase"
            className="my-4"
          >
            Login
          </Button>
          <span className="text-sm">
            Belum Punya Akun?{" "}
            <Link className="text-blue-500" to={"/register"}>
              Daftar Disini
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
