import { createSlice } from "@reduxjs/toolkit";

const findPeekSlice = createSlice({
  name: "peekInfos",
  initialState: {
    peekInfomation: [],
  },
  reducers: {
    updatePeekInfo: (state, action) => {
      const peekInfo = action.payload;
      state.peekInfomation = peekInfo;
    },
  },
});

export const findPeekActions = findPeekSlice.actions;
export default findPeekSlice.reducer;
