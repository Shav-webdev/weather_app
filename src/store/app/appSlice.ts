import { RootState } from '../index';
import { createSlice } from '@reduxjs/toolkit';
import { IAppStore } from 'helpers/global.types';

const initialState: IAppStore = {
  isSnackbarVisible: false,
  message: '',
};

export const appSlice = createSlice({
  name: 'geoLocation',
  initialState,
  reducers: {
    setSnackbarState: (state, { payload }) => {
      state.isSnackbarVisible = payload.isSnackbarVisible;
      state.message = payload.message;
    },
    resetSnackbarState: (state) => {
      state.isSnackbarVisible = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {},
});

export const { setSnackbarState, resetSnackbarState } = appSlice.actions;

export const appSelector = (state: RootState) => state.app;
export const snackbarMessageSelector = (state: RootState) => state.app.message;
export const isSnackbarVisibleSelector = (state: RootState) =>
  state.app.isSnackbarVisible;

export default appSlice.reducer;
