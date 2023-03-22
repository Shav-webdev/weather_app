import {
  I5dayForeCastOptions,
  IHistoricalWeatherRequest,
  IGetCurrentCityWeatherOptions,
} from 'helpers/global.types';
import Api from 'service/api';

export default class WeatherApi {
  static get5dayForCast(params: I5dayForeCastOptions) {
    try {
      const api = new Api('data/2.5/forecast');
      return api.get('', { params });
    } catch (e) {
      throw e;
    }
  }

  static getWeatherByCityName(params: IGetCurrentCityWeatherOptions) {
    const api = new Api('data/2.5/weather');
    return api.get('', { params });
  }

  static getWeatherHistoryByCityCoords(params: IHistoricalWeatherRequest) {
    const api = new Api('data/2.5/climate');
    return api.get('', { params });
  }
  // static getWeatherHistoryByCityCoords(params: IHistoricalWeatherRequest) {
  //   const api = new Api('data/2.5/climate');
  //   return api.get('', { params });
  // }
}
