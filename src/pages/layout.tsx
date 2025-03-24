import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { setIsOpen, setIsOpenDetail } from "../utils/store/slices/drawer";
import { GLOBAL_ICONS, NavigationMenu } from "../utils/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CostumTooltip } from "../components/tooltip/CustomTooltip";
import { CustomButton } from "../components/button/CustomButton";
import { useModal } from "../components/modal";
import { setTheme } from "../utils/store/slices/theme";
import Avatar from "../components/Avatar";
import Modal from "../components/modal/modal";
import moment from "moment";
import OnlineStatus from "../components/OnlineStatus";
import logo from "../assets/images/apple-touch-icon.png";
import { useCookies } from "react-cookie";
import AuthEndpoint from "../apis/endpoints/auth";
import { useEffect } from "react";
import { axiosInstance } from "../apis/axios";
import Button from "../components/button/Button";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const modalConfirm = useModal({});
  const [cookies, , removeCookie] = useCookies(["token"]);
  const { isOpenDetail } = useSelector((state: RootState) => state.drawer);
  const { isDarkMode, theme } = useSelector((state: RootState) => state.theme);

  const onChangeTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };
  const checkTokenApi = AuthEndpoint.checkToken();

  useEffect(() => {
    if (cookies.token) {
      checkTokenApi.mutate(
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
        {
          onSuccess: () => {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${cookies.token}`;
          },
          onError: () => {
            removeCookie("token");
            navigate("/login", { replace: true });
          },
        }
      );
    }
  }, [cookies.token]);

  useEffect(() => {
    if (location === "/") {
      navigate("/conversations", { replace: true });
    }
  }, [location]);

  return (
    <>
      <div
        className={
          isOpenDetail
            ? "fixed z-50 duration-300 flex justify-end top-0 w-full h-screen right-0"
            : "fixed z-50 duration-300 flex justify-end top-0 w-full h-screen right-[-100%]"
        }
      >
        <div className="w-[80%]">{/* <Detail /> */}</div>
        {isOpenDetail && (
          <div
            role="button"
            onClick={() => dispatch(setIsOpenDetail(false))}
            className="bg-black/30 absolute -z-10 w-full h-screen"
          ></div>
        )}
      </div>
      <div className="fixed hidden sm:block left-0 top-0 bg-neutral dark:bg-neutralDark w-[65px] h-screen border-r z-30 border-base">
        <div className="flex flex-col items-center justify-between h-full">
          <div>
            <div className="py-3 px-1">
              <img src={logo} className="w-[50px]" alt="" />
            </div>
            {NavigationMenu.map((menu, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (menu.title === "Chats") {
                    dispatch(setIsOpen(true));
                  }
                  if (location.includes(menu?.location as string)) {
                    return;
                  } else if (menu?.location) {
                    navigate(menu?.location);
                  }
                }}
              >
                <CostumTooltip text={menu.title}>
                  <CustomButton
                    ripleColor="bg-black/30 dark:bg-white/30"
                    type="button"
                    className={`${
                      location.includes(menu?.location as string)
                        ? "text-primary dark:text-primaryDark"
                        : "text-neutralDark dark:text-neutral"
                    } bg-transparent shadow-none rounded-lg text-[22px] w-full py-4 px-[18px] hover:bg-neutralHover dark:hover:bg-neutralHoverDark hover:shadow-none`}
                  >
                    {location.includes(menu?.location as string)
                      ? menu.icon
                      : menu.outlineIcon}
                  </CustomButton>
                </CostumTooltip>
              </div>
            ))}
          </div>
          <CostumTooltip text={"logout"}>
            <div className="flex flex-col gap-2 cursor-pointer">
              <div
                onClick={() => modalConfirm.control.open()}
                className="active:bg-neutralHover dark:active:bg-neutralHoverDark w-full p-3"
              >
                <Avatar
                  src={
                    "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512"
                  }
                />
              </div>
              <span className="text-neutralDark dark:text-neutralHover text-sm mx-3 mb-2">
                v1.3.82
              </span>
            </div>
          </CostumTooltip>
        </div>
      </div>

      {/* PARENT STAART */}

      <Outlet />

      {/* CHILDREN END */}
      <div className="fixed hidden sm:block pl-[85px] left-0 bottom-0 bg-neutral dark:bg-neutralDark w-full py-1.5 border-t z-20 border-base">
        <div className="pr-5 gap-3 flex justify-between items-center">
          <div>
            <span className="text-neutralDark dark:text-neutralHover text-sm mr-3">
              Build 200
            </span>
            <OnlineStatus />
          </div>
          <div className="text-sm flex items-center gap-3">
            <CostumTooltip text={`Subscription Active until`}>
              <span className="bg-green-500 cursor-default px-2 py-1 font-semibold rounded-lg text-white">
                active
              </span>
            </CostumTooltip>
            <div>
              {!isDarkMode ? (
                <button
                  onClick={onChangeTheme}
                  className="text-neutralHoverDark mx-1 dark:text-neutralHover flex font-semibold items-center gap-2"
                >
                  <span className="text-[18px]">{GLOBAL_ICONS.sun}</span>
                  <p>light</p>
                </button>
              ) : (
                <button
                  onClick={onChangeTheme}
                  className="text-neutralDark mx-1 dark:text-neutralHover flex font-semibold items-center gap-2"
                >
                  <span className="text-[18px]">{GLOBAL_ICONS.month}</span>
                  <p>dark</p>
                </button>
              )}
            </div>
            <div className="text-xs font-semibold text-neutralHoverDark dark:text-neutralHover">
              {moment().format("DD MM YYYY hh:mm A")}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed border-t border-base hidden max-sm:block left-0 bottom-0 bg-neutral dark:bg-neutralDark w-full z-30">
        <div className="grid grid-cols-5">
          {NavigationMenu.map((menu, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (menu.title === "Chats") {
                  setIsOpen(true);
                }
                if (location.includes(menu?.location as string)) {
                  return;
                } else if (menu?.location) {
                  navigate(menu?.location);
                }
              }}
            >
              <CustomButton
                ripleColor="bg-black/30 dark:bg-white/30"
                type="button"
                className={`flex items-center flex-col justify-center ${
                  location?.includes(menu?.location as string)
                    ? "text-primary dark:text-primaryDark"
                    : "text-neutralDark dark:text-neutral opacity-60"
                } bg-transparent shadow-none rounded-lg text-[22px] w-full py-4 px-[18px] hover:bg-neutralHover dark:hover:bg-neutralHoverDark hover:shadow-none`}
              >
                {location?.includes(menu?.location as string)
                  ? menu.icon
                  : menu.outlineIcon}
                <div className="text-xs mt-[2px]">{menu?.title}</div>
              </CustomButton>
            </div>
          ))}
        </div>
      </div>

      <Modal
        control={modalConfirm.control}
        title="Apakah anda yakin ingin keluar ?"
      >
        <div className="flex justify-center gap-4">
          <Button coloring="danger">Batal</Button>
          <Button coloring="primary">Keluar</Button>
        </div>
      </Modal>
    </>
  );
};

export default Layout;
