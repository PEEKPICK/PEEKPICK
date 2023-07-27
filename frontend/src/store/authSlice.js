import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: '',
    name: '',
    email: '',
    phone: '',
    birth: '',
    sex: '',
    profile: 'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Astonished+Face.png',
    title: '',
    nickname: '',
    like: [],
    hate: [],
  },
  reducers: {
    // 리듀서를 회원가입 페이지 마다 작성해서 처리.
    updateUserInfo (state, action) {
      const newItem = action.payload;
      state.name = newItem.name;
      state.email = newItem.email;
      state.phone = newItem.phone;
      state.birth = newItem.birth;
      state.sex = newItem.sex;
    },
    updateProfile (state, action) {
      const newItem = action.payload;
      state.profile = newItem.profile;
    },
    updateUserNickname (state, action) {
      const newItem = action.payload;
      state.title = newItem.title;
      state.nickname = newItem.nickname;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;