import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    memberId: '',
    name: '',
    email: '',
    phone: '1',
    birthday: '',
    gender: '',
    emojiId: '',
    prefixId: '',
    prefix:'',
    nickname: '',
    bio:'',
    emojiUrl:'',
    emojiMoveUrl:'',
    likes: [],
    disLikes: [],
    like: [], 
    hate: [],
    worldId: '',
    openUrl: '',
    closeUrl: '',
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
      state.prefix = newItem.prefix;
      state.nickname = newItem.nickname;
      state.bio=newItem.bio;
    },
    updateUserLike (state, action) {
      const newItem = action.payload;
      state.likes = newItem.likes;
      state.like = newItem.like;
    },
    updateUserHate (state, action) {
      const newItem = action.payload;
      state.disLikes = newItem.disLikes;
      state.hate = newItem.hate;
    },
    updateUserMap (state, action) {
      const newItem = action.payload;
      state.worldId = newItem.worldId;
      state.openUrl = newItem.openUrl;
      state.closeUrl = newItem.closeUrl;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;