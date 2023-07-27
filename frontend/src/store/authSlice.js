import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: '',
    name: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    emojiId: '',
    prefixId: '',
    title: '',
    nickname: '',
    likes: [],
    dislikes: [],
  },
  reducers: {
    // 리듀서를 회원가입 페이지 마다 작성해서 처리.
    updateUserInfo (state, action) {
      const newItem = action.payload;
      state.name = newItem.name;
      state.email = newItem.email;
      state.phone = newItem.phone;
      state.birthday = newItem.birthday;
      state.gender = newItem.gender;
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