import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

const initalState: { socket: Socket | null } = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initalState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket>) => {
      return {
        ...state,
        socket: action.payload
      }
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
