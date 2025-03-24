import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawer";
import themeReducer from "./slices/theme";
import profileReducer from "./slices/my-profile";

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    theme: themeReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
