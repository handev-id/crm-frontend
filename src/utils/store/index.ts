import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slices/drawer";
import themeReducer from "./slices/theme";
import profileReducer from "./slices/my-profile";
import confirmReducer from "./slices/confirm";

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    theme: themeReducer,
    profile: profileReducer,
    confirm: confirmReducer,
  },
  middleware: (getDefaultMiddlewware) =>
    getDefaultMiddlewware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
