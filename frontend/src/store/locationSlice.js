import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    //임의 ID 값
    memberId: null,
    point: {
      x: null,
      y: null,
    },
    distance: null,
  },
  reducers: {
    updateLoc: (state, action) => {
      const userPoint = action.payload;
      state.memberId = userPoint.memberId;
      state.point.x = userPoint.point.x;
      state.point.y = userPoint.point.y;
      state.distance = userPoint.distance;
    },
  },
});

export const locationActions = locationSlice.actions;
export default locationSlice.reducer;
