import {
  IResponseErrors,
  I5dayForeCastOptions,
  IHistoricalWeatherRequest,
  IGetCurrentCityWeatherOptions,
} from 'helpers/global.types';
import WeatherApi from './weatherAPI';
import { setSnackbarState } from '../app/appSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetCurrentCityData } from './weatherSlice';

export const get5dayForeCastAsync = createAsyncThunk(
  'weather_5_day/get',
  async (requestData: I5dayForeCastOptions, { rejectWithValue }) => {
    try {
      const response = await WeatherApi.get5dayForCast(requestData);
      return response?.data;
    } catch (err) {
      let error = err as IResponseErrors; // cast the error for access
      if (!error?.response) {
        throw err;
      }
      // We got validation errors, let's return those, so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCurrentCityWeatherAsync = createAsyncThunk(
  'current_city/get',
  async (
    requestData: IGetCurrentCityWeatherOptions,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await WeatherApi.getWeatherByCityName(requestData);
      return response?.data;
    } catch (err) {
      let error = err as IResponseErrors; // cast the error for access
      if (!error?.response) {
        throw err;
      }
      dispatch(
        setSnackbarState({
          message: error.response.data.message,
          isSnackbarVisible: true,
        }),
      );
      dispatch(resetCurrentCityData());
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCurrentCityHistoricalWeatherDataAsync = createAsyncThunk(
  'current_city_historical_data/get',
  async (
    requestData: IHistoricalWeatherRequest,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await WeatherApi.getWeatherHistoryByCityCoords(
        requestData,
      );

      return response?.data;
    } catch (err) {
      let error = err as IResponseErrors; // cast the error for access
      if (!error?.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);
