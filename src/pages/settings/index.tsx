import { settingMenus, settingMenusMap } from "../../utils/common";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../../components/form/SearchInput";
import { GLOBAL_ICONS } from "../../utils/icons";
import SubHeader from "../../components/SubHeader";

const Layout = () => {
  const location = useLocation();
  return (
    <div className="lg:pl-[60px] overflow-hidden h-screen">
      <div className="border-b grid grid-cols-2 justify-between items-center h-20 bg-white sticky top-0 left-0 px-4 lg:px-8 dark:bg-Dark border-base w-full">
        <div className="h1">Pengaturan</div>
        <div className=" flex justify-end">
          <SearchInput
            width={window.innerWidth > 1024 ? "300px" : "100%"}
            isOpen
            placeholder="Cari Pengaturan"
            show={() => {}}
          />
        </div>
      </div>

      <div className="flex w-full h-full relative overflow-x-hidden">
        <div
          className={`flex bg-white w-full lg:w-[25%] dark:bg-Dark border-r border-base flex-col overflow-y-auto scrollbar`}
        >
          {Object.entries(settingMenusMap).map(([path, menu]) => (
            <Link
              key={path}
              to={path}
              className={`py-5 flex gap-3 cursor-pointer sm:pl-[40px] px-4 lg:px-8 border-b border-neutral dark:border-neutralDark text-neutralDark dark:text-neutral duration-300 ${
                location.pathname == path
                  ? "text-primary dark:text-primaryDark bg-neutral dark:bg-neutralDark"
                  : "text-neutralDark hover:bg-neutral dark:hover:bg-neutralDark"
              }`}
            >
              <span className="text-xl">{menu.icon}</span>
              <span>{menu.title}</span>
            </Link>
          ))}
        </div>
        <div
          className={`w-full duration-500 sm:pl-[85px] pb-48 sm:pb-[335px] lg:w-[75%] z-10 max-lg:absolute top-0 overflow-y-auto scrollbar h-full bg-neutral dark:bg-Dark px-4 lg:p-6 ${
            Object.keys(settingMenusMap).find(
              (item) => item === location.pathname
            )
              ? "right-0"
              : "opacity-0 right-[-100%]"
          }`}
        >
          <SubHeader
            title={settingMenusMap[location.pathname]?.title || ""}
            icon={GLOBAL_ICONS.arrowBack}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
