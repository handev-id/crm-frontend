import React from "react";
import { RippleButton } from "../../../components/button/RippleButton";
import { GLOBAL_ICONS } from "../../../utils/icons";

const Header = () => {
  return (
    <div className="border-b bg-white dark:text-neutral dark:bg-Dark border-Dark/10 dark:border-white/10 w-full">
      <div className="h-16 px-4 flex justify-between items-center">
        <div className="font-bold text-[18px]">First Name + Last Name</div>
        <div className="flex items-center gap-2">
          <RippleButton
            ripleColor="bg-black/30 dark:bg-white/30"
            className="p-2.5 text-xl bg-neutral dark:bg-neutralDark rounded-lg hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark"
          >
            {GLOBAL_ICONS.check}
          </RippleButton>
          <RippleButton
            ripleColor="bg-black/30 dark:bg-white/30"
            className="p-2.5 text-xl bg-neutral dark:bg-neutralDark rounded-lg hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark"
          >
            {GLOBAL_ICONS.download}
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
