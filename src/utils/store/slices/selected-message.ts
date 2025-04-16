import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationModel } from "../../../apis/models/conversation";

const initialState: {
  selectedConversation: ConversationModel | null;
} = {
  selectedConversation: null,
};

const selectedMessage = createSlice({
  name: "selectedMessage",
  initialState,
  reducers: {
    setSelectedConversation: (
      state,
      action: PayloadAction<ConversationModel>
    ) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const { setSelectedConversation } = selectedMessage.actions;
export default selectedMessage.reducer;

export type NewMessageState = typeof initialState;
