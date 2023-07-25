// 리덕스 라이브러리 import
// import { createSlice, configureStore } from '@reduxjs/toolkit';

// store 변수에 createStore사용
// createStore에는 카운터가 필요하다. 따라서 리듀서를 작성

// const initialState = { counter: 0, showCounter: true };

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment(state) {
//       state.counter++;
//     },
//     decrement(state) {
//       state.counter--;
//     },
//     increase(state, action) {
//       state.counter = state.counter + action.payload;
//     },
//     toggleCounter(state) {
//       state.showCounter = !state.showCounter;
//     },
//   }
// });


// const store = configureStore({
//   reducer: counterSlice.reducer
// });

// export const counterActions = counterSlice.actions;

// export default store;