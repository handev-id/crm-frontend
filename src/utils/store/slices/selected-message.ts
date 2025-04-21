import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationModel } from "../../../apis/models/conversation";

const initialState: {
  activeConversation: ConversationModel | null;
} = {
  activeConversation: null,
};

const selectedMessage = createSlice({
  name: "selectedMessage",
  initialState,
  reducers: {
    setActiveConversation: (
      state,
      action: PayloadAction<ConversationModel | null>
    ) => {
      state.activeConversation = action.payload;
    },
  },
});

export const { setActiveConversation } = selectedMessage.actions;
export default selectedMessage.reducer;

export type NewMessageState = typeof initialState;
