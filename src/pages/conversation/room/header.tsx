import { useSelector } from "react-redux";
import { CustomButton } from "../../../components/button/CustomButton";
import { GLOBAL_ICONS } from "../../../utils/icons";
import { RootState } from "../../../utils/store";

const Header = () => {
  const { activeConversation } = useSelector(
    (state: RootState) => state.activeConversation
  );
  return (
    <div className="border-b bg-white dark:text-neutral dark:bg-Dark border-base w-full">
      <div className="h-[71px] px-4 flex justify-between items-center">
        <div className="font-bold text-[18px]">
          {activeConversation?.customer.fullName}
        </div>
        <div className="flex items-center gap-2">
          <CustomButton
            ripleColor="bg-black/30 dark:bg-white/30"
            className="p-2.5 text-xl bg-neutral dark:bg-neutralDark rounded-lg hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark"
          >
            {GLOBAL_ICONS.check}
          </CustomButton>
          <CustomButton
            ripleColor="bg-black/30 dark:bg-white/30"
            className="p-2.5 text-xl bg-neutral dark:bg-neutralDark rounded-lg hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark"
          >
            {GLOBAL_ICONS.download}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
