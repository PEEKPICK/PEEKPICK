import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: 0,
    title: '',
    userId: 0,
  },
  reducers: {
    updateProfile (state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.item.push({
          id: newItem.id,
          title: newItem.title,
          userId: newItem.userId,
        });
      } else {
        console.log('else로 나옴')
      }
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;