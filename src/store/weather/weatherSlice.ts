import { createSlice } from '@reduxjs/toolkit';
import {
  LoadStatus,
  IWeatherStore,
  IResponseDataErrors,
} from 'helpers/global.types';
import {
  get5dayForeCastAsync,
  getCurrentCityHistoricalWeatherDataAsync,
  getCurrentCityWeatherAsync,
} from './weatherThunks';
import { RootState } from '../index';

const initialState: IWeatherStore = {
  status: LoadStatus.Idle,
  list: null,
  city: null,
  currentCityData: {},
  currentStatus: LoadStatus.Idle,
  curError: {},
  foreCastError: {},
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetCurrentCityData: (state) => {
      state.currentCityData = {};
      state.currentStatus = LoadStatus.Idle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get5dayForeCastAsync.pending, (state: IWeatherStore) => {
      state.status = LoadStatus.Loading;
    });
    builder.addCase(
      get5dayForeCastAsync.fulfilled,
      (state: IWeatherStore, { payload }) => {
        state.status = LoadStatus.Success;
        state.city = payload.city;
        state.list = payload.list;
      },
    );
    builder.addCase(
      get5dayForeCastAsync.rejected,
      (state: IWeatherStore, { payload }) => {
        state.status = LoadStatus.Failed;
        state.foreCastError = payload as IResponseDataErrors;
      },
    );
    builder.addCase(
      getCurrentCityWeatherAsync.pending,
      (state: IWeatherStore) => {
        state.currentStatus = LoadStatus.Loading;
      },
    );
    builder.addCase(
      getCurrentCityWeatherAsync.fulfilled,
      (state: IWeatherStore, { payload }) => {
        state.currentCityData = { ...payload };
        state.currentStatus = LoadStatus.Success;
      },
    );
    builder.addCase(
      getCurrentCityWeatherAsync.rejected,
      (state: IWeatherStore, { payload }) => {
        state.currentStatus = LoadStatus.Failed;
        state.curError = payload as IResponseDataErrors;
      },
    );
    builder.addCase(
      getCurrentCityHistoricalWeatherDataAsync.pending,
      (state: IWeatherStore) => {
        // state.currentStatus = LoadStatus.Loading;
      },
    );
    builder.addCase(
      getCurrentCityHistoricalWeatherDataAsync.fulfilled,
      (state: IWeatherStore, { payload }) => {
        // state.currentCityData = { ...payload };
        // state.currentStatus = LoadStatus.Success;
      },
    );
    builder.addCase(
      getCurrentCityHistoricalWeatherDataAsync.rejected,
      (state: IWeatherStore, { payload }) => {
        // state.currentStatus = LoadStatus.Failed;
        // state.curError = payload as IResponseDataErrors;
      },
    );
  },
});

export const { resetCurrentCityData } = weatherSlice.actions;

export const weatherSelector = (state: RootState) => state.weather;
export const weatherListSelector = (state: RootState) => state.weather.list;
export const weatherListLoadingSelector = (state: RootState) =>
  state.weather.status;
export const weatherCitySelector = (state: RootState) => state.weather.city;
export const currentCityDataSelector = (state: RootState) =>
  state.weather.currentCityData;
export const currentCityLoadingSelector = (state: RootState) =>
  state.weather.currentStatus;

export default weatherSlice.reducer;
