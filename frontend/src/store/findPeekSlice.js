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
    toggleViewed: (state, action) => {
      const peekId = action.payload;
      const peekItem = state.peekInfomation.find(item => item.peekId === peekId);
      if (peekItem.viewed === false) {
        peekItem.viewed = !peekItem.viewed;
      }
    },
  },
  
});

export const findPeekActions = findPeekSlice.actions;
export default findPeekSlice.reducer;
