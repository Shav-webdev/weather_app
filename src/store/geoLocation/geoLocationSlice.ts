import { createSlice } from '@reduxjs/toolkit';
import { IPositionInterface } from 'helpers/global.types';
import { RootState } from '../index';

const initialState: IPositionInterface = {
  longitude: null,
  latitude: null,
  accuracy: null,
  heading: null,
  speed: null,
  timestamp: null,
};

export const geoLocationSlice = createSlice({
  name: 'geoLocation',
  initialState,
  reducers: {
    setLocation: (state, { payload }) => {
      state.latitude = payload.latitude;
      state.longitude = payload.longitude;
      state.accuracy = payload.accuracy;
      state.heading = payload.heading;
      state.speed = payload.speed;
      state.timestamp = payload.timestamp;
    },
    resetLocation: (state, { payload }) => {
      state.latitude = null;
      state.longitude = null;
      state.accuracy = null;
      state.heading = null;
      state.speed = null;
      state.timestamp = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLocation, resetLocation } = geoLocationSlice.actions;

export const geoLocationSelector = (state: RootState) => state.geoLocation;

export default geoLocationSlice.reducer;
