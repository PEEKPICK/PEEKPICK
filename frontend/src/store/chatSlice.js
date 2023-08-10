import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "roomId",
  initialState: {
    roomId: "",
    createTime: null,
    chatModalState: false,
    connectState: false,
  },
  reducers: {
    callRoomID: (state, action) => {
      state.roomId = action.payload;
      state.createTime = action.payload;
    },
    updateChatModalState: (state, action) => {
      state.chatModalState = action.payload;
    },
    updateConnectState: (state, action) => {
      state.connectState = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
