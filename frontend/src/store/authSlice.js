import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: 'KimJunHyung'
  },
  reducers: {
    updateProfile (state, action) {
      const item = action.payload;
      state = item
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;