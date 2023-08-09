// 리덕스 라이브러리 import
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import locationSlice from "./locationSlice";
import modalSlice from "./modalSlice";
import findUserSlice from "./findUserSlice";
import findPeekSlice from "./findPeekSlice";
import chatSlice from "./chatSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    location: locationSlice,
    modal: modalSlice,
    findUser: findUserSlice,
    findPeek: findPeekSlice,
    roomId: chatSlice,
  },
});

// export const counterActions = counterSlice.actions;

export default store;
