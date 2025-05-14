import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ConversationModel } from "../../../apis/models/conversation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveConversation } from "../../../utils/store/slices/selected-message";
import { RootState } from "../../../utils/store";
import { delay } from "../../../utils/helpers";
import Header from "./header";
import ConversationList from "./list";
import ConversationsEndpoint from "../../../apis/endpoints/conversations";
import SkeletonComponent from "../../../components/Skeleton";

export type ConversationState = {
  conversationIds: number[];
  conversations: ConversationModel[];
};

const Drawer = () => {
  const convsersationsApi = ConversationsEndpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { newConversation, from } = useSelector(
    (state: RootState) => state.newMessage
  );
  const { activeConversation } = useSelector(
    (state: RootState) => state.activeConversation
  );

  const { control, watch, reset, setValue } = useForm<ConversationState>();

  const {
    fields: conversations,
    insert,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "conversations",
    keyName: "uid",
  });

  const activedConversation = (conv: ConversationModel) => {
    dispatch(setActiveConversation(conv));
    navigate("conversation");

    delay(500, () => {
      const index = conversations.findIndex((c) => c.id === conv.id);
      if (index !== -1) {
        update(index, { ...conv, unreadCount: 0 });
      }
    });
  };

  useEffect(() => {
    // INCOMING MESSAGE AND UPDATE CONVERSATION
    if (from === "customer" && newConversation) {
      const index = conversations.findIndex((c) => c.id === newConversation.id);
      if (index !== -1) {
        remove(index);
      }
      insert(0, newConversation);

      if (newConversation.id === activeConversation?.id) {
        delay(500, () => {
          const updatedConv = { ...newConversation, unreadCount: 0 };
          update(0, updatedConv);
        });
      }
    }
  }, [newConversation]);

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
    <div className="h-screen w-full overflow-hidden bg-white dark:bg-Dark border border-base">
      <div className="sm:ml-[63px] text-Dark dark:text-neutralHover">
        <Header setValue={setValue} watch={watch} />
        <div className="scrollbar h-screen overflow-x-hidden pb-20 overflow-y-auto">
          {!convsersationsApi.index.isPending
            ? conversations.map((conv, index) => (
                <div key={conv.id} onClick={() => activedConversation(conv)}>
                  <Controller
                    control={control}
                    name="conversationIds"
                    render={({ field: { value, onChange } }) => (
                      <ConversationList
                        watch={watch}
                        conversation={conv}
                        onChange={onChange}
                        value={value}
                        index={index}
                        isActive={activeConversation?.id === conv.id}
                      />
                    )}
                  />
                </div>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="my-1 mx-3">
                  <SkeletonComponent type="user-list" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
