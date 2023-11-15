import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserDatafetced: false,
  userData: {},
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, payload) => {
      state.isUserDatafetced = true;
      state.userData = payload.payload;
    },
    resetUserData: (state) => {
      state.isUserDatafetced = false;
      state.userData = {};
    },
  },
});

export const { setUserData, resetUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
