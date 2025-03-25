import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../../apis/models/user";

const initalState: { profile: UserModel | null } = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initalState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
