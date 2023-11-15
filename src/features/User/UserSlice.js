import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
  email: '',
  name: '',
  mobileNumber: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, payload) => {
      state.isUserLoggedIn = true;
      state.email = payload.payload.email;
      state.name = payload.payload.name;
      state.mobileNumber = payload.payload.mobileNumber;
    },
    setUserLogout: (state) => {
      localStorage.removeItem('userId');
      window.location.href = '/';
      state = initialState;
    },
  },
});

export const { setUserLogin, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
