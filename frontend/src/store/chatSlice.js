import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "roomId",
  initialState: {
    roomId: null,
  },
  reducers: {
    callRoomID: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
