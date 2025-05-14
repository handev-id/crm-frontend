import { GLOBAL_ICONS } from "../../../utils/icons";
import { CustomButton } from "../../../components/button/CustomButton";
import { CostumTooltip } from "../../../components/tooltip/CustomTooltip";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ConversationState } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { filteringConversation } from "../../../utils/constant";
import Tab, { TabGroup } from "../../../components/Tab";
import Select from "../../../components/form/SelectInput";
import LargeSelect from "../../../components/form/LargeSelectInput";
import SearchInput from "../../../components/form/SearchInput";

type Props = {
  watch: UseFormWatch<ConversationState>;
  setValue: UseFormSetValue<ConversationState>;
};

const Header = ({ watch, setValue }: Props) => {
  const { channels } = useSelector((state: RootState) => state.channels);
  const [currentTab, setCurrentTab] = useState("all");
  const [isFilter, setIsFilter] = useState(false);

  return (
    <>
      <div className="border-b bg-white dark:bg-Dark border-base w-full">
        <div className="h-16 px-4 flex justify-between items-center">
          {((watch("conversationIds") as unknown as number[]) || []).length ===
            0 && <div className="font-bold text-[18px]">Inbox</div>}
          {((watch("conversationIds") as unknown as number[]) || []).length >
          0 ? (
            <>
              <CustomButton
                onClick={() => {
                  if (
                    (watch("conversationIds") || []).length ===
                    (watch("conversations") || []).length
                  ) {
                    setValue("conversationIds", [] as unknown as number[]);
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
              </CustomButton>
              <LargeSelect
                options={[
                  { label: "Agent 1", value: "agent_1" },
                  { label: "Agent 2", value: "sales" },
                  { label: "Agent 3", value: "sales" },
                ]}
                onChange={(value) => {}}
                containerClassName="w-[150px]"
                showInput
              />
            </>
          ) : isFilter ? (
            <>
              <Select
                options={(channels || []).map((channel) => {
                  return {
                    label: channel.name,
                    value: channel.id,
                  };
                })}
                onChange={(value) => {}}
                containerClassName="mx-6 w-full"
                leftItems={channels?.map((channel) => (
                  <img
                    className="w-5 h-5 rounded-full"
                    src={channel?.logo?.url}
                  />
                ))}
              />
              <div className="flex gap-2 items-center">
                <CustomButton
                  onClick={() => setIsFilter(false)}
                  ripleColor="bg-black/30 dark:bg-white/30"
                  type="button"
                  className={`bg-transparent shadow-none rounded-lg text-[22px] w-full text-neutralDark dark:text-neutralHover p-2.5 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none`}
                >
                  <span>{GLOBAL_ICONS.close}</span>
                </CustomButton>
              </div>
            </>
          ) : (
            <div className="flex">
              <CostumTooltip text={"Filter Percakapan"}>
                <CustomButton
                  onClick={() => setIsFilter(true)}
                  ripleColor="bg-black/30 dark:bg-white/30"
                  type="button"
                  className={`bg-transparent shadow-none rounded-lg text-[22px] w-full text-neutralDark dark:text-neutralHover p-2.5 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none`}
                >
                  <span>{GLOBAL_ICONS.filter}</span>
                </CustomButton>
              </CostumTooltip>
              <SearchInput placeholder="Cari Percakapan" show={() => {}} />
            </div>
          )}
        </div>
      </div>
      <TabGroup className="justify-evenly">
        {filteringConversation.map((menu, i) => (
          <Tab
            key={i}
            onClick={() => setCurrentTab(menu.value)}
            isActive={menu.value === currentTab}
          >
            {menu.title}
          </Tab>
        ))}
      </TabGroup>
    </>
  );
};

export default Header;
