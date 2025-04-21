import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelModel } from "../../../apis/models/channel";

const initialState: {
  channels: ChannelModel[] | null;
} = {
  channels: null,
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<ChannelModel[]>) => {
      state.channels = action.payload;
    },
  },
});

export const { setChannels } = channelsSlice.actions;
export default channelsSlice.reducer;
