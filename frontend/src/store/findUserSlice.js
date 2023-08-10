import { createSlice } from "@reduxjs/toolkit";

const findUserSlice = createSlice({
  name: "userInfos",
  initialState: {
    userInfomation: [],
  },
  reducers: {
    updateUserInfo: (state, action) => {
      const userInfo = action.payload;
      state.userInfomation = userInfo;
    },
  },
});

export const findUserActions = findUserSlice.actions;
export default findUserSlice.reducer;
