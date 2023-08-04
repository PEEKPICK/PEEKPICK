import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    //임의 ID 값
    memberId: null,
    point: {
      x: 0,
      y: 0,
    },
    distance: 0,

    avatarId: null,
    bio: null,
    disLikes: [],
    emoji: {
      emojiId: null,
      rate: "",
      imageUrl: "",
      animatedImageUrl: "",
    },
    likes: [],
    nickname: "",
    prefix: { prefixId: null, content: "" },
    world: "",
  },
  reducers: {
    updateLoc: (state, action) => {
      const userInfo = action.payload;
      state.memberId = userInfo.memberId;
      state.point.x = userInfo.point.x;
      state.point.y = userInfo.point.y;
      state.distance = userInfo.distance;

      state.avatarId = userInfo.avatarId;
      state.bio = userInfo.bio;
      state.disLikes = userInfo.disLikes;
      state.emoji = userInfo.emoji;
      state.likes = userInfo.likes;
      state.nickname = userInfo.nickname;
      state.prefix = userInfo.prefix;
      state.world = userInfo.world;
    },
  },
});

export const locationActions = locationSlice.actions;
export default locationSlice.reducer;
