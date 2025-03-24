import { useState } from "react";
import { CustomButton } from "../../../components/button/CustomButton";
import LargeSelect from "../../../components/form/LargeSelectInput";
import { GLOBAL_ICONS } from "../../../utils/icons";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";

const Form = () => {
  const [text, setText] = useState("");
  const { theme } = useSelector((state: RootState) => state.theme);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col items-start text-neutralDark dark:text-neutral p-2 shadow-lg dark:border-neutralHover/10 border-neutralDark/10 border rounded-lg bg-white dark:bg-Dark"
    >
      <div className="bg-neutral flex items-center gap-2 dark:bg-neutralDark text-xs py-1.5 px-2 mb-4 rounded-md">
        <span>Reply: John Doe </span>
        <span className="p-1 text-sm hover:bg-neutralHover rounded-full dark:hover:bg-neutralHoverDark">
          {GLOBAL_ICONS.closeX}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <CustomButton
          ripleColor="bg-black/30 dark:bg-white/30"
          className="p-3 text-xl text-Dark dark:text-neutral hover:bg-neutral dark:bg-neutralDark rounded-lg dark:hover:bg-neutralHoverDark"
        >
          {GLOBAL_ICONS.imagePlus}
        </CustomButton>
        <LargeSelect
          top={-140}
          options={[
            { label: "#Text", value: "text" },
            { label: "#Image", value: "image" },
          ]}
          onChange={() => {}}
          parent={
            <CustomButton
              ripleColor="bg-black/30 dark:bg-white/30"
              className="p-3 text-xl text-Dark dark:text-neutral hover:bg-neutral dark:bg-neutralDark rounded-lg dark:hover:bg-neutralHoverDark"
            >
              {GLOBAL_ICONS.quickReply}
            </CustomButton>
          }
        />
        <CustomButton
          ripleColor="bg-black/30 dark:bg-white/30"
          type="submit"
          className="text-primary dark:text-primaryDark bg-transparent shadow-none rounded-lg text-[22px] p-3 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none"
        >
          {GLOBAL_ICONS.send}
        </CustomButton>
      </div>
      <InputEmoji
        value={text}
        onChange={setText}
        placeholder="Type a message"
        theme={theme}
        color={theme === "light" ? "#2a2a2a" : "#dedede"}
        background={theme === "light" ? "#fff" : "#121212"}
        borderColor={theme === "light" ? "#dedede" : "#2a2a2a"}
        inputClass="scrollbar"
        shouldReturn={false}
        shouldConvertEmojiToImage={false}
      />
    </form>
  );
};

export default Form;
