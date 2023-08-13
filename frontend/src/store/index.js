// 리덕스 라이브러리 import
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import locationSlice from "./locationSlice";
import modalSlice from "./modalSlice";
import findUserSlice from "./findUserSlice";
import findPeekSlice from "./findPeekSlice";
import chatSlice from "./chatSlice";
import modalsSlice from "./modalsSlice";
import changeMapSlice from "./changeMapSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    location: locationSlice,
    modal: modalSlice,
    findUser: findUserSlice,
    findPeek: findPeekSlice,
    roomId: chatSlice,
    modals: modalsSlice,
    changeMap: changeMapSlice,
  },
});

// export const counterActions = counterSlice.actions;

export default store;
