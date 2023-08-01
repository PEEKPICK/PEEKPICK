// 리덕스 라이브러리 import
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import geoLocation from "./locationSlice";

const store = configureStore({
  reducer: { auth: authSlice, geo: geoLocation },
});

// export const counterActions = counterSlice.actions;

export default store;
