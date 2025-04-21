import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationModel } from "../../../apis/models/conversation";
import { MessageModel } from "../../../apis/models/message";

const initialState: {
  newMessage: MessageModel | null;
  newConversation: ConversationModel | null;
  from: "user" | "customer" | null;
} = {
  newMessage: null,
  newConversation: null,
  from: null,
};

const newMessageSlice = createSlice({
  name: "new-message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageModel>) => {
      state.newMessage = action.payload;
    },
    setConversation: (state, action: PayloadAction<ConversationModel>) => {
      state.newConversation = action.payload;
    },
    setFrom: (state, action: PayloadAction<"customer" | "user">) => {
      state.from = action.payload;
    },
  },
});

export const { setMessage, setConversation, setFrom } = newMessageSlice.actions;
export default newMessageSlice.reducer;

export type NewMessageState = typeof initialState;
