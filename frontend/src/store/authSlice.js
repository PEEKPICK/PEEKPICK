import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    memberId: '',
    name: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    emojiId: '',
    prefixId: '',
    nickname: '',
    emojiUrl:'',
    emojiMoveUrl:'',
    likes: [],
    disLikes: [],
    like: [],
    hate: [],
  },
  reducers: {
    // 리듀서를 회원가입 페이지 마다 작성해서 처리.
    updateUserInfo (state, action) {
      const newItem = action.payload;
      state.memberId = newItem.memberId
      state.name = newItem.name;
      state.email = newItem.email;
      state.phone = newItem.phone;
      state.birthday = newItem.birthday;
      state.gender = newItem.gender;
    },
    updateProfile (state, action) {
      const newItem = action.payload;
      state.emojiId = newItem.emojiId;
    },
    updateMyPageProfile (state, action) {
      const newItem = action.payload;
      state.emojiUrl = newItem.emojiUrl;
      state.emojiMoveUrl = newItem.emojiMoveUrl;
    },
    updateUserNickname (state, action) {
      const newItem = action.payload;
      state.prefixId = newItem.prefixId;
      state.nickname = newItem.nickname;
    },
    updateUserLike (state, action) {
      const newItem = action.payload;
      state.likes = newItem.likes;
      state.like = newItem.like
    },
    updateUserHate (state, action) {
      const newItem = action.payload;
      state.disLikes = newItem.disLikes;
      state.hate = newItem.hate;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;