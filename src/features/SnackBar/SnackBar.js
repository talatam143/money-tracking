import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackBarState: false,
  snackBarText: '',
  snackBarSeverity: 'info',
};

export const snackbarSlice = createSlice({
  name: 'progressLoader',
  initialState,
  reducers: {
    startSnackbar: (state, payload) => {
      state.snackBarState = true;
      state.snackBarText = payload.payload.message;
      state.snackBarSeverity = payload.payload.severity;
    },
    resetSnackBar: (state) => {
      state.snackBarState = false;
      state.snackBarText = '';
    },
  },
});

export const { startSnackbar, resetSnackBar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
