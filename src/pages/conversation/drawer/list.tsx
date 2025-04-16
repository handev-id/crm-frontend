import { ConversationState } from ".";
import { ConversationModel } from "../../../apis/models/conversation";
import { UseFormWatch } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import moment from "moment";
import CheckBox from "../../../components/form/CheckBox";

type Props = {
  conversation: ConversationModel;
  watch: UseFormWatch<ConversationState>;
  onChange: (value: number[]) => void;
  value: number[];
  index: number;
};

const ConversationList = ({ conversation, watch, onChange, value }: Props) => {
  return (
    <div className="flex justify-between group dark:bg-Dark dark:hover:bg-neutralDark items-center border-b border-base cursor-pointer p-4 bg-white hover:bg-neutral">
      <div
        className={`flex gap-2 h-full items-center duration-500 ${
          (watch("conversationIds") as number[])?.length > 0
            ? ""
            : "-translate-x-12 lg:group-hover:-translate-x-0"
        }`}
      >
        <div>
          <CheckBox
            onChange={(e) => {
              const newValues = [...value];
              if ((e.target as HTMLInputElement).checked) {
                newValues.push(conversation.id);
              } else {
                const index = newValues.indexOf(conversation.id);
                if (index > -1) {
                  newValues.splice(index, 1);
                }
              }
              onChange(newValues);
            }}
            checked={(value || []).includes(conversation.id)}
          />
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Avatar />
            <div
              className={`leading-5 ${
                ((watch("conversationIds") as number[]) || []).length > 0
                  ? "w-[110px]"
                  : "w-[150px] group-hover:w-[110px]"
              }`}
            >
              <h2
                className="text-[15px] text-Dark dark:text-neutral font-semibold truncate"
                title={conversation.customer.fullName}
              >
                {conversation.customer.fullName}
              </h2>
              <p
                className="text-[12px] truncate text-Dark dark:text-neutral overflow-hidden whitespace-nowrap"
                title={conversation.lastMessage?.text || ""}
              >
                <span className="font-medium text-Dark dark:text-neutral text-[14px]">
                  Bro:{" "}
                </span>
                {conversation.lastMessage?.text || ""}
              </p>
            </div>
          </div>
          {conversation.customer.tags.length > 0 && (
            <div className="flex gap-1 mt-4 flex-wrap">
              {conversation.customer.tags.map((tag, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: `${tag.color}`,
                  }}
                  className={`text-xs font-medium p-1 leading-none rounded text-white`}
                >
                  #{tag?.name && tag.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="dark:bg-Dark dark:group-hover:bg-neutralDark group-hover:bg-neutral pl-2 relative z-[5] h-[50px] flex justify-end items-center">
        <p className="text-[12px] text-nowrap font-light">
          {moment(conversation.lastMessage?.createdAt).format(
            "DD/MM/YYYY HH:mm"
          )}
        </p>
      </div>
    </div>
  );
};

export default ConversationList;
