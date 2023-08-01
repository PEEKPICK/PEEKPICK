import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedEmoji: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.selectedEmoji = action.payload;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
