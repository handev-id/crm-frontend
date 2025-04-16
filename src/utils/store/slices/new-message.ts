import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationModel } from "../../../apis/models/conversation";
import { MessageModel } from "../../../apis/models/message";

const initialState: {
  message: MessageModel | null;
  conversation: ConversationModel | null;
  from: "user" | "customer" | null;
} = {
  message: null,
  conversation: null,
  from: null,
};

const newMessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageModel>) => {
      state.message = action.payload;
    },
    setConversation: (state, action: PayloadAction<ConversationModel>) => {
      state.conversation = action.payload;
    },
    setFromCustomer: (state, action: PayloadAction<"customer" | "user">) => {
      state.from = action.payload;
    },
  },
});

export const { setMessage, setConversation, setFromCustomer } =
  newMessageSlice.actions;
export default newMessageSlice.reducer;

export type NewMessageState = typeof initialState;
