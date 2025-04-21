import logo from "../assets/images/logo-png-250/2.png";

const NoSelectedConversation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <img src={logo} alt="" className="w-[100px] object-contain mx-auto" />
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
