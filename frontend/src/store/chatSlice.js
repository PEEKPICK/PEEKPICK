import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "roomId",
  initialState: {
    roomId: null,
    opponent: null,
    createTime: null,
    chatModalState: false,
    connectState: false,
    opponentURL: null,
    opponentId: null,
  },
  reducers: {
    callRoomID: (state, action) => {
      state.roomId = action.payload;
      state.opponent = action.payload;
    },
    updateOpponent: (state, action) => {
      state.opponent = action.payload;
    },
    updateTime: (state, action) => {
      state.createTime = action.payload;
    },
    updateChatModalState: (state, action) => {
      state.chatModalState = action.payload;
    },
    updateConnectState: (state, action) => {
      state.connectState = action.payload;
    },
    updateURL: (state, action) => {
      state.opponentURL = action.payload;
    },
    updateOpponentId: (state, action) => {
      state.opponentId = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
