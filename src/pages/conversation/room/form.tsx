import { CustomButton } from "../../../components/button/CustomButton";
import { GLOBAL_ICONS } from "../../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { Controller, useForm } from "react-hook-form";
import { SendMessagePayload } from "../../../types/send-message-payload";
import { useEffect } from "react";
import { setMessage } from "../../../utils/store/slices/new-message";
import { UserModel } from "../../../apis/models/user";
import LargeSelect from "../../../components/form/LargeSelectInput";
import InputEmoji from "react-input-emoji";
import socket from "../../../apis/socket";
import Attachment from "../../../components/form/Attachment";

const Form = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { theme } = useSelector((state: RootState) => state.theme);
  const { activeConversation: conversation } = useSelector(
    (state: RootState) => state.activeConversation
  );

  const { control, reset } = useForm<SendMessagePayload>();

  const onSubmit = (data: SendMessagePayload) => {
    socket?.emit("send-message", data);

    dispatch(
      setMessage({
        sender: profile as UserModel,
        createdAt: new Date().toISOString(),
        senderType: "user",
        text: data.text,
        attachment: data?.attachment || null,
        webhookMessageId: 0,
        updatedAt: new Date().toISOString(),
        id: 0,
        conversationId: conversation?.id!,
      })
    );
    console.log(data);

    reset();
  };

  useEffect(() => {
    if (profile && conversation) {
      reset({
        tenantId: profile!.tenant!.id,
        conversationId: conversation.id,
        senderId: profile!.id,
        webhookConversationId: conversation.webhookConversationId,
        channelId: conversation.channelId,
      });
    }
  }, [profile, conversation]);

  return (
    <form
      onSubmit={control.handleSubmit(onSubmit)}
      className="flex flex-col mx-2 items-start text-neutralDark dark:text-neutral p-2 shadow-lg dark:border-neutralHover/10 border-neutralDark/10 border rounded-lg bg-white dark:bg-Dark"
    >
      {/* <div className="bg-neutral flex items-center gap-2 dark:bg-neutralDark text-xs py-1.5 px-2 mb-4 rounded-md">
        <span>Reply: John Doe </span>
        <span className="p-1 text-sm hover:bg-neutralHover rounded-full dark:hover:bg-neutralHoverDark">
          {GLOBAL_ICONS.closeX}
        </span>
      </div> */}
      <div className="flex items-center gap-3 ml-3 py-1">
        <Controller
          name="attachment"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Attachment value={value} onChange={onChange} />
          )}
        />
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
      <Controller
        control={control}
        name="text"
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <InputEmoji
            value={value}
            onChange={onChange}
            placeholder="Type a message"
            theme={theme!}
            color={theme === "light" ? "#2a2a2a" : "#dedede"}
            background={theme === "light" ? "#fff" : "#121212"}
            borderColor={theme === "light" ? "#dedede" : "#2a2a2a"}
            inputClass="scrollbar"
            shouldReturn={false}
            shouldConvertEmojiToImage={false}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                control.handleSubmit(onSubmit)();
              }
            }}
          />
        )}
      />
    </form>
  );
};

export default Form;
