import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: 0,
    title: '',
    userId: 0,
    profile: 'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Astonished+Face.png',
  },
  reducers: {
    // 리듀서를 회원가입 페이지 마다 작성해서 처리.
    updateProfile (state, action) {
      const newItem = action.payload;
      state.profile = newItem.profile;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;