export const Skeleton = () => {
  return (
    <div className="flex gap-2 m-4">
      <div className="animate-pulse bg-neutralHover dark:bg-neutralHoverDark duration-100 transition-all rounded-full h-[50px] w-[60px]"></div>
      <div className="w-full">
        <div className="animate-pulse bg-neutralHover dark:bg-neutralHoverDark duration-100 transition-all rounded-md mb-2 h-[20px] w-full"></div>
        <div className="animate-pulse bg-neutralHover dark:bg-neutralHoverDark duration-100 transition-all rounded-md h-[15px] w-[50%]"></div>
      </div>
    </div>
  );
};
