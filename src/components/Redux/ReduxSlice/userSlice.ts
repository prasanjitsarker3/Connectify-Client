// src/components/Redux/ReduxSlice/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  name: string | null;
  profile: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.profile = action.payload.profile;
    },
    clearUserInfo: (state) => {
      state.id = null;
      state.name = null;
      state.profile = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
