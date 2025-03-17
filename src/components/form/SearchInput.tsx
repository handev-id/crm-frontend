import { HTMLProps, useEffect, useState } from "react";
import { GLOBAL_ICONS } from "../../utils/icons";
import { RippleButton } from "../button/RippleButton";

type Props = {
  show: (value: boolean) => void;
};

const InputSearch = ({
  show,
  ...props
}: Props & HTMLProps<HTMLInputElement>) => {
  const [isShow, setIsShow] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);

  useEffect(() => {
    show(isShow);
  }, [isShow]);

  return (
    <>
      <div
        className={
          isShow
            ? "relative w-[200px] transition-all duration-300 overflow-hidden"
            : "relative w-0 opacity-100 transition-all duration-300 overflow-hidden"
        }
      >
        <input
          {...props}
          className="bg-neutral dark:text-neutral text-Dark dark:bg-neutralDark placeholder:text-sm px-10 py-2.5 w-full rounded-lg placeholder:opacity-100 outline-none hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark"
        />
        <span className="absolute top-3 left-3 text-[20px]">
          {GLOBAL_ICONS.search}
        </span>
        <span
          onClick={() => {
            setTimeout(() => {
              setSearchIcon(false);
            }, 100);
            setIsShow(false);
          }}
          className="absolute top-1 right-2 text-[20px] hover:bg-neutralHover dark:hover:bg-neutralHoverDark p-2 rounded-full cursor-pointer"
        >
          {GLOBAL_ICONS.closeX}
        </span>
      </div>
      {!searchIcon && (
        <div
          onClick={() => {
            setTimeout(() => {
              setIsShow(true);
            }, 100);
            setSearchIcon(true);
          }}
        >
          <RippleButton
            ripleColor="bg-black/30 dark:bg-white/30"
            type="button"
            className={`bg-transparent shadow-none rounded-lg text-[22px] w-full text-neutralDark dark:text-neutralHover p-2.5 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none`}
          >
            <span>{GLOBAL_ICONS.search}</span>
          </RippleButton>
        </div>
      )}
    </>
  );
};

export default InputSearch;
