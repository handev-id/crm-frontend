import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import logo from "../assets/images/CAQAP 01.png";

const NoSelectedConversation = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        {theme === "light" ? (
          <img src={logo} alt="" className="w-[300px] mx-auto" />
        ) : (
          <img src={logo} alt="" className="w-[300px] mx-auto" />
        )}
        <div className="text-center mb-16 mt-5 text-neutralHoverDark dark:text-neutralHover">
          <h2 className="font-bold text-xl">
            Tidak ada percakapan yang di pilih
          </h2>
          <p>Pilih percakapan yang ada di samping untuk memulai percakapan</p>
        </div>
      </div>
    </div>
  );
};

export default NoSelectedConversation;
