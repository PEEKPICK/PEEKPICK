import { createSlice } from "@reduxjs/toolkit";

const checkDistance = () => {
  if (localStorage.getItem("distance") === null) {
    return 500;
  } else {
    return localStorage.getItem("distance");
  }
};

const locationSlice = createSlice({
  name: "location",
  initialState: {
    //임의 ID 값
    memberId: null,
    userPos: {
      point: {
        x: 0,
        y: 0,
      },
      // distance: checkDistance(),
      distance: 500000000,
    },
  },
  reducers: {
    updateLoc(state, action) {
      const userInfo = action.payload;
      state.userPos.point.x = userInfo.point.x;
      state.userPos.point.y = userInfo.point.y;
      state.userPos.distance = userInfo.distance;
    },
    updateDist(state, action) {
      const newItem = action.payload;
      state.userPos.distance = newItem.distance;
    },
  },
});

export const locationActions = locationSlice.actions;
export default locationSlice.reducer;
