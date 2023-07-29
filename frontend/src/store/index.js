// 리덕스 라이브러리 import
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';

const store = configureStore({
  reducer: { auth: authSlice }
});

// export const counterActions = counterSlice.actions;

export default store;