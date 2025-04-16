import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MessageModel } from "../../../apis/models/message";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import Header from "./header";
import Message from "../../../components/conversation/Message";
import MessagesEndpoint from "../../../apis/endpoints/messages";
import useInteractivity from "../../../utils/hooks/useInteractivity";
import SkeletonComponent from "../../../components/Skeleton";
import Detail from "../detail";

const Room = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const messagesApi = MessagesEndpoint();
  const navigate = useNavigate();
  const { handleScrollRoom } = useInteractivity();
  const { theme } = useSelector((state: RootState) => state.theme);
  const { from, message } = useSelector((state: RootState) => state.message);
  const { selectedConversation } = useSelector(
    (state: RootState) => state.selectedConversation
  );

  const { control, reset } = useForm<{ messages: MessageModel[] }>();

  const {
    fields: messages,
    insert,
    remove,
  } = useFieldArray({
    control,
    name: "messages",
    keyName: "uid",
  });

  useEffect(() => {
    if (message) {
      if (from === "user") {
        remove(messages.length - 1);
        insert(messages.length, message);
        handleScrollRoom(bodyRef, { behavior: "smooth", duration: 100 });
      } else {
        insert(messages.length, message);
        handleScrollRoom(bodyRef, { behavior: "smooth", duration: 100 });
      }
    }
  }, [message]);

  useEffect(() => {
    if (selectedConversation?.id) {
      messagesApi.index.mutate(
        {
          params: { id: selectedConversation.id },
        },
        {
          onSuccess: (data) => {
            reset({
              messages: data.data,
            });
            handleScrollRoom(bodyRef);
          },
        }
      );
    } else {
      navigate("/");
    }
  }, [selectedConversation]);

  if (!messages.length) return; // delete this code if load message too long

  return (
    <div className="flex">
      <div className="h-screen w-[90%] bg-white dark:bg-Dark pb-10 flex flex-col justify-between">
        <Header />
        <div
          ref={bodyRef}
          className="h-full space-y-4 pt-4 px-6 pb-4 scrollbar w-full overflow-x-hidden overflow-y-auto"
        >
          {messages.length === 0
            ? Array.from({ length: 10 }).map(() => (
                <SkeletonComponent type="messages" height="50px" />
              ))
            : messages.map((message) => (
                <Message
                  key={message.id}
                  theme={theme!}
                  position={
                    message.senderType === "customer" ? "left" : "right"
                  }
                  message={message}
                />
              ))}
        </div>
        <div className="mt-auto">
          <Form />
        </div>
      </div>
      <div className="w-[10%]">
        <Detail />
      </div>
    </div>
  );
};

export default Room;
