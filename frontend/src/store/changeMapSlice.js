import { createSlice } from "@reduxjs/toolkit";

const changeMapSlice = createSlice({
  name: "changeMap",
  initialState: {
    id: 1,
  },
  reducers: {
    updateIdNum: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const changeMapSliceActions = changeMapSlice.actions;
export default changeMapSlice.reducer;
