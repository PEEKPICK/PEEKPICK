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
    nickName: null,
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
    updateOpponentNickName: (state, action) => {
      state.nickName = action.payload;
    },
    resetState: (state) => {
      state.roomId = null;
      state.opponent = null;
      state.createTime = null;
      state.connectState = false;
      state.opponentURL = null;
      state.opponentId = null;
      state.nickName = null;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
