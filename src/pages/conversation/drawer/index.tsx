import { Controller, useForm } from "react-hook-form";
import { ConversationModel } from "../../../apis/models/conversation";
import { useEffect } from "react";
import Header from "./header";
import ConversationList from "./list";
import ConversationsEndpoint from "../../../apis/endpoints/conversations";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../../utils/store/slices/selected-message";

export type ConversationState = {
  conversationIds: number[];
  conversations: ConversationModel[];
};

const Drawer = () => {
  const convsersationsApi = ConversationsEndpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, watch, reset, setValue } = useForm<ConversationState>();

  const selectedConversation = (conv: ConversationModel) => {
    dispatch(setSelectedConversation(conv));
    navigate("conversation");
  };

  useEffect(() => {
    convsersationsApi.index.mutate(
      {},
      {
        onSuccess: (data) => {
          reset({
            conversations: data.data,
            conversationIds: [],
          });
        },
      }
    );
  }, []);

  return (
    <div
      className={`h-screen w-full overflow-hidden bg-white dark:bg-Dark border border-base`}
    >
      <div className="sm:ml-[63px] text-Dark dark:text-neutralHover">
        <Header setValue={setValue} watch={watch} />
        <div className="scrollbar h-screen pb-20 overflow-y-auto">
          {(watch("conversations") || []).map((conv, index) => (
            <div onClick={() => selectedConversation(conv)}>
              <Controller
                key={index}
                control={control}
                name="conversationIds"
                render={({ field: { value, onChange } }) => (
                  <ConversationList
                    watch={watch}
                    conversation={conv}
                    key={index}
                    onChange={onChange}
                    value={value}
                    index={index}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
