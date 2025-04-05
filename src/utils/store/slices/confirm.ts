import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConfirmState = {
  isOpen?: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void>;
};

const initialState: ConfirmState = {
  isOpen: false,
  title: "Konfirmasi",
  message: "",
  confirmText: "Ya",
  cancelText: "Batal",
  onConfirm: undefined,
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    openConfirm: (
      state,
      action: PayloadAction<Omit<ConfirmState, "isOpen">>
    ) => {
      return { ...state, ...action.payload, isOpen: true };
    },
    closeConfirm: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
