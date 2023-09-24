import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingState: false,
};

export const progressLoaderSlice = createSlice({
  name: 'progressLoader',
  initialState,
  reducers: {
    startLoader: (state) => {
      state.loadingState = true;
    },
    resetLoader: (state) => {
      state.loadingState = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoader, resetLoader } = progressLoaderSlice.actions;

export default progressLoaderSlice.reducer;
