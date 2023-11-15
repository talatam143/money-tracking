import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Default theme',
  backgroundColor: '#fcffe7',
  primaryColor: '#eb455f',
  secondaryColor: '#2b3467',
  lightColor: '#bad7e9',
};

export const colorTheme = createSlice({
  name: 'colorTheme',
  initialState,
  reducers: {
    secondaryTheme: (state) => {
      localStorage.setItem('theme', 'secondaryTheme');
      state.name = 'Secondary theme';
      state.backgroundColor = '#F5F5F5';
      state.primaryColor = '#FC5185';
      state.secondaryColor = '#364F6B';
      state.lightColor = '#3FC1C9';
    },
    blueTheme: (state) => {
      localStorage.setItem('theme', 'blueTheme');
      state.name = 'Blue theme';
      state.backgroundColor = '#F7FBFC';
      state.primaryColor = '#0F4C75';
      state.secondaryColor = '#1B262C';
      state.lightColor = '#3282B8';
    },
    greenTheme: (state) => {
      localStorage.setItem('theme', 'greenTheme');
      state.name = 'Green theme';
      state.backgroundColor = '#FEFFDE';
      state.primaryColor = '#52734D';
      state.secondaryColor = '#40513B';
      state.lightColor = '#DDFFBC';
    },
    greyTheme: (state) => {
      localStorage.setItem('theme', 'greyTheme');
      state.name = 'Grey theme';
      state.backgroundColor = '#FAF3E0';
      state.primaryColor = '#6C3428';
      state.secondaryColor = '#1E212D';
      state.lightColor = '#F0E9D2';
    },
    darkTheme: (state) => {
      localStorage.setItem('theme', 'darkTheme');
      state.name = 'Dark theme';
      state.backgroundColor = '#111936';
      state.primaryColor = '#1565C0';
      state.secondaryColor = '#6200EA';
      state.lightColor = '#d1c4e9';
    },
    defaultTheme: (state) => {
      localStorage.setItem('theme', 'defaultTheme');
      state.name = 'Default theme';
      state.backgroundColor = '#fcffe7';
      state.primaryColor = '#eb455f';
      state.secondaryColor = '#2b3467';
      state.lightColor = '#bad7e9';
    },
  },
});

export const { secondaryTheme, blueTheme, greenTheme, greyTheme, defaultTheme, darkTheme } =
  colorTheme.actions;

export default colorTheme.reducer;
