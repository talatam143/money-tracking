import { configureStore } from '@reduxjs/toolkit';
import progressLoaderReducer from '../features/ProgressLoader/ProgressLoader';
import snackBarReducer from '../features/SnackBar/SnackBar';

export const store = configureStore({
  reducer: {
    progressLoader: progressLoaderReducer,
    snackBar: snackBarReducer,
  },
});
