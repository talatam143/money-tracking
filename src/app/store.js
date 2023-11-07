import { configureStore } from '@reduxjs/toolkit';
import progressLoaderReducer from '../features/ProgressLoader/ProgressLoader';
import snackBarReducer from '../features/SnackBar/SnackBar';
import userReducer from '../features/User/UserSlice';
import userDataReducer from '../features/User/UserData';
import pageStateReducer from '../features/PageState/PageState';

export const store = configureStore({
  reducer: {
    progressLoader: progressLoaderReducer,
    snackBar: snackBarReducer,
    user: userReducer,
    userData: userDataReducer,
    pageState: pageStateReducer,
  },
});
