import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../types/theme";

const initialState: ThemeType = {
  isDarkMode: false,
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      state.theme = action.payload ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      state.isDarkMode = action.payload === "dark";
    },
  },
});

export const { setIsDarkMode, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
