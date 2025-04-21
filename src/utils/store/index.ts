import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawer";
import themeReducer from "./slices/theme";
import profileReducer from "./slices/my-profile";
import confirmReducer from "./slices/confirm";
import newMessageReducer from "./slices/new-message";
import selectedConversationReducer from "./slices/selected-message";
import channelsReducer from "./slices/channels";

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    theme: themeReducer,
    profile: profileReducer,
    confirm: confirmReducer,
    newMessage: newMessageReducer,
    activeConversation: selectedConversationReducer,
    channels: channelsReducer,
  },
  middleware: (getDefaultMiddlewware) =>
    getDefaultMiddlewware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
