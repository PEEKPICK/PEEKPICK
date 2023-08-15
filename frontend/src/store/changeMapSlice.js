import { createSlice } from "@reduxjs/toolkit";

const changeMapSlice = createSlice({
  name: "changeMap",
  initialState: {
    id: 1,
    openUrl: null,
    closeUrl: null,
    worldId: null,
  },
  reducers: {
    updateIdNum: (state, action) => {
      state.id = action.payload;
    },
    updateIdOpenUrl: (state, action) => {
      state.openUrl = action.payload;
    },
    updateIdCloseUrl: (state, action) => {
      state.closeUrl = action.payload;
    },
    updateId: (state, action) => {
      state.worldId = action.payload;
    },
  },
});

export const changeMapSliceActions = changeMapSlice.actions;
export default changeMapSlice.reducer;
