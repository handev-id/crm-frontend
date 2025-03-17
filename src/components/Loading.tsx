export const Loading = () => {
  return (
    <div className="absolute z-50 items-center flex justify-center w-full h-screen bg-black/50 left-0 top-0">
      <div className="p-10 rounded-lg px-20 bg-white dark:bg-neutralDark flex flex-col items-center">
        <div className="dark:rounded-full dark:w-[100px] dark:overflow-hidden">
          <img src="/giphy.gif" className="w-[100px] hidden sm:block" alt="" />
        </div>
        <div className="block sm:hidden">
          <div className="spinner"></div>
        </div>
        <h2 className="text-2xl font-bold mt-3 dark:text-neutral">
          Please Wait
        </h2>
        <p className="opacity-60 dark:text-neutral">Processing...</p>
      </div>
    </div>
  );
};

export const LoadingAssign = () => {
  return (
    <div className="absolute z-50 items-center flex justify-center w-full h-screen bg-black/50 left-0 top-[-100%]">
      <div className="p-10 rounded-lg px-20 bg-white dark:bg-neutralDark flex flex-col items-center">
        <div className="dark:rounded-full dark:w-[100px] dark:overflow-hidden">
          <img src="/giphy.gif" className="w-[100px] hidden sm:block" alt="" />
        </div>
        <div className="block sm:hidden">
          <div className="spinner"></div>
        </div>
        <h2 className="text-2xl font-bold mt-3 dark:text-neutral">
          Please Wait
        </h2>
        <p className="opacity-60 dark:text-neutral">Processing...</p>
      </div>
    </div>
  );
};
