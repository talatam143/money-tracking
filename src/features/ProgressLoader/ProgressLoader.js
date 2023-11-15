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

export const { startLoader, resetLoader } = progressLoaderSlice.actions;

export default progressLoaderSlice.reducer;
