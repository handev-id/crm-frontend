import { GLOBAL_ICONS } from "../../../utils/icons";
import { RippleButton } from "../../../components/button/RippleButton";
import { CostumTooltip } from "../../../components/tooltip/CustomTooltip";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import Select from "../../../components/form/SelectInput";
import LargeSelect from "../../../components/form/LargeSelectInput";
import SearchInput from "../../../components/form/SearchInput";
import { ConversationState } from ".";

const filteringConversation = [
  { title: "All" },
  { title: "Assigned" },
  { title: "Unassigned" },
  { title: "Archived" },
];

type Props = {
  watch: UseFormWatch<ConversationState>;
  setValue: UseFormSetValue<ConversationState>;
};

const Header = ({ watch, setValue }: Props) => {
  const [filterBy, setFilterBy] = useState("All");
  const [isFilter, setIsFilter] = useState(false);

  console.log(watch());

  return (
    <>
      <div className="border-b bg-white dark:bg-Dark border-Dark/10 dark:border-white/10 w-full">
        <div className="h-16 px-4 flex justify-between items-center">
          {((watch("conversationIds") as string[]) || []).length === 0 && (
            <div className="font-bold text-[18px]">Inbox</div>
          )}
          {((watch("conversationIds") as string[]) || []).length > 0 ? (
            <>
              <RippleButton
                onClick={() => {
                  if (
                    (watch("conversationIds") || []).length ===
                    (watch("conversations") || []).length
                  ) {
                    setValue("conversationIds", []);
                  } else {
                    setValue(
                      "conversationIds",
                      (watch("conversations") || []).map((conv) => conv.id)
                    );
                  }
                }}
                ripleColor="bg-black/30 dark:bg-white/30"
                className="p-2.5 text-xl bg-neutral dark:bg-neutralDark rounded-lg hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark"
              >
                {(watch("conversationIds") || []).length ===
                (watch("conversations") || []).length
                  ? GLOBAL_ICONS.closeX
                  : GLOBAL_ICONS.check}
              </RippleButton>
              <LargeSelect
                options={[
                  { label: "Agent 1", value: "telegram" },
                  { label: "Agent 2", value: "messenger" },
                  { label: "Agent 3", value: "whatsapp" },
                ]}
                onChange={(value) => {}}
                containerClassName="w-[150px]"
                showInput
              />
            </>
          ) : isFilter ? (
            <>
              <Select
                options={[
                  { label: "Telegram", value: "telegram" },
                  { label: "Messenger", value: "messenger" },
                  { label: "Whatsapp", value: "whatsapp" },
                ]}
                onChange={(value) => {}}
                containerClassName="mx-6 w-full"
              />
              <div className="flex gap-2 items-center">
                <RippleButton
                  onClick={() => setIsFilter(false)}
                  ripleColor="bg-black/30 dark:bg-white/30"
                  type="button"
                  className={`bg-transparent shadow-none rounded-lg text-[22px] w-full text-neutralDark dark:text-neutralHover p-2.5 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none`}
                >
                  <span>{GLOBAL_ICONS.close}</span>
                </RippleButton>
              </div>
            </>
          ) : (
            <div className="flex">
              <CostumTooltip text={"Filter Percakapan"}>
                <RippleButton
                  onClick={() => setIsFilter(true)}
                  ripleColor="bg-black/30 dark:bg-white/30"
                  type="button"
                  className={`bg-transparent shadow-none rounded-lg text-[22px] w-full text-neutralDark dark:text-neutralHover p-2.5 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none`}
                >
                  <span>{GLOBAL_ICONS.filter}</span>
                </RippleButton>
              </CostumTooltip>
              <SearchInput placeholder="Cari Percakapan" show={() => {}} />
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex items-center w-full overflow-x-scroll scrollbar-hidden text-sm font-semibold`}
      >
        {filteringConversation.map((conv, idx) => (
          <div
            key={idx}
            onClick={() => {
              setFilterBy(conv.title);
            }}
            className={`py-4 border-b-2 text-neutralDark dark:text-neutral ${
              filterBy.toUpperCase() === conv.title.toUpperCase()
                ? "text-primary duration-100 dark:text-primaryDark border-primary dark:border-primaryDark"
                : "text-neutralDark border-transparent dark:text duration-100"
            }`}
          >
            <span className="px-4 cursor-pointer">{conv.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
