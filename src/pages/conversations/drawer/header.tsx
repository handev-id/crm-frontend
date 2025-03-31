import { GLOBAL_ICONS } from "../../../utils/icons";
import { CustomButton } from "../../../components/button/CustomButton";
import { CostumTooltip } from "../../../components/tooltip/CustomTooltip";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ConversationState } from ".";
import { channelsMap, filteringConversation } from "../../../utils/common";
import Select from "../../../components/form/SelectInput";
import LargeSelect from "../../../components/form/LargeSelectInput";
import SearchInput from "../../../components/form/SearchInput";
import Tab, { TabGroup } from "../../../components/Tab";

type Props = {
  watch: UseFormWatch<ConversationState>;
  setValue: UseFormSetValue<ConversationState>;
};

const Header = ({ watch, setValue }: Props) => {
  const [currentTab, setCurrentTab] = useState("all");
  const [isFilter, setIsFilter] = useState(false);

  return (
    <>
      <div className="border-b bg-white dark:bg-Dark border-base w-full">
        <div className="h-16 px-4 flex justify-between items-center">
          {((watch("conversationIds") as string[]) || []).length === 0 && (
            <div className="font-bold text-[18px]">Inbox</div>
          )}
          {((watch("conversationIds") as string[]) || []).length > 0 ? (
            <>
              <CustomButton
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
                options={Object.entries(channelsMap).map(([channel]) => {
                  return {
                    label: channel,
                    value: channel.toLowerCase()
                  }
                })}
                onChange={(value) => {}}
                containerClassName="mx-6 w-full"
                leftItems={Object.entries(channelsMap).map(([_, item]) => item.icon)}
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
      <TabGroup>
        {filteringConversation.map((menu, i) => (
          <Tab key={i} onClick={() => setCurrentTab(menu.value)} isActive={menu.value === currentTab}>{menu.title}</Tab>
        ))}
      </TabGroup>
    </>
  );
};

export default Header;
