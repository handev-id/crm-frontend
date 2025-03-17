import { createSlice } from "@reduxjs/toolkit";
import { MyProfile } from "../types/my-profile";

const initalState: { data: MyProfile } = {
  data: {
    profile: "",
    email: "",
    password: "",
    token: "",
    user_id: "",
    expired_at: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initalState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
