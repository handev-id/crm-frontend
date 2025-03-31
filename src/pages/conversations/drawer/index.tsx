import { Controller, useForm } from "react-hook-form";
import { ConversationModel } from "../../../apis/models/conversation";
import Header from "./header";
import ConversationList from "./list";
import { useEffect } from "react";

const conversatios: ConversationModel[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hello",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [],
  },
  {
    id: "2",
    firstName: "Johnd",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hellofdfdfdffffffffffffffffffffffffff",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [
      {
        id: "1",
        name: "Tag 1",
        color: "red",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Tag 2",
        color: "blue",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
      {
        id: "3",
        name: "Tag 3",
        color: "green",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Tag 2",
        color: "blue",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
      {
        id: "1",
        name: "Tag 1",
        color: "red",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      },
    ],
  },
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hello",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [],
  },
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hello",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [],
  },
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hello",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [],
  },
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hello",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [],
  },
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hello",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [],
  },
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "6285777104634",
    avatar:
      "https://ui-avatars.com/api/?name=6285777104634+at+swhatsappnet&background=04b3e8&color=fff&size=512",
    lastChat: "Hello",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    tags: [],
  },
];

export type ConversationState = {
  conversationIds: string[];
  conversations: ConversationModel[];
};

const Drawer = () => {
  const { control, watch, reset, setValue } = useForm<ConversationState>({
    defaultValues: {
      conversationIds: [],
    },
  });

  useEffect(() => {
    if (conversatios) {
      reset({
        conversations: conversatios,
        conversationIds: [],
      });
    }
  }, [conversatios]);

  return (
    <div
      className={`h-screen w-full overflow-hidden bg-white dark:bg-Dark border border-base`}
    >
      <div className="sm:ml-[63px] text-Dark dark:text-neutralHover">
        <Header setValue={setValue} watch={watch} />
        <div className="scrollbar h-screen pb-20 overflow-y-auto">
          {(conversatios || []).map((conv, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
