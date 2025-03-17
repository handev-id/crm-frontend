import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrawerSize, DrawerType } from "../types/drawer";

const initialState: DrawerType = {
  size: { type: "increase", value: 30 },
  isOpen: false,
  isOpenDetail: false,
  width: 300,
  isMobile: false,
  loading: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<DrawerSize>) => {
      state.size = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setIsOpenDetail: (state, action: PayloadAction<boolean>) => {
      state.isOpenDetail = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSize,
  setIsOpen,
  setIsOpenDetail,
  setWidth,
  setIsMobile,
  setLoading,
} = drawerSlice.actions;

export default drawerSlice.reducer;
