// 리덕스 라이브러리 import
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import geoLocation from "./locationSlice";
import modalSlice from "./modalSlice";
import findUserSlice from "./findUserSlice";
import findPeekSlice from "./findPeekSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    geo: geoLocation,
    modal: modalSlice,
    findUser: findUserSlice,
    findPeek: findPeekSlice,
  },
});

// export const counterActions = counterSlice.actions;

export default store;
