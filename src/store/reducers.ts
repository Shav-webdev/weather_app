import { appSlice } from './app/appSlice';
import { weatherSlice } from './weather/weatherSlice';
import { geoLocationSlice } from './geoLocation/geoLocationSlice';

const reducers = {
  app: appSlice.reducer,
  weather: weatherSlice.reducer,
  geoLocation: geoLocationSlice.reducer,
};

export default reducers;
