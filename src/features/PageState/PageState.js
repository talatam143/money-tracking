import { createSlice } from '@reduxjs/toolkit';

export const statesEnum = Object.freeze({
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});

const initialState = {
  state: statesEnum.LOADING,
};

export const pageState = createSlice({
  name: 'pageState',
  initialState,
  reducers: {
    setSuccessState: (state) => {
      state.state = statesEnum.SUCCESS;
    },
    setErrorState: (state) => {
      state.state = statesEnum.ERROR;
    },
    resetState: (state) => {
      state.state = statesEnum.LOADING;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSuccessState, setErrorState, resetState } = pageState.actions;

export default pageState.reducer;
