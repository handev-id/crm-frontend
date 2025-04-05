import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../types/theme";

const initialState: ThemeType = {
  isDarkMode: false,
  theme: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      state.isDarkMode = action.payload === "dark";
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
