import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openPeekWrite: (state) => {
      state.isOpen = true;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const modalsActions = modalsSlice.actions;
export default modalsSlice.reducer;