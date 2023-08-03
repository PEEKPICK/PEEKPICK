// 리덕스 라이브러리 import
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import geoLocation from "./locationSlice";
import modalSlice from "./modalSlice";
import findUserSlice from "./findUserSlice";

const store = configureStore({
  reducer: { auth: authSlice, geo: geoLocation, modal: modalSlice, findUser: findUserSlice },
});

// export const counterActions = counterSlice.actions;

export default store;
