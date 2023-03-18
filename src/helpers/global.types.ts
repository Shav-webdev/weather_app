export type IObjectKeys = {
  [key: string]: any;
};

export enum LoadStatus {
  Idle,
  Loading,
  Failed,
  Success,
}

export interface ICoordsInterface {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
}
export interface IPositionInterface extends ICoordsInterface {
  timestamp: number | null;
}

export type ICoord = {
  lat: number | null;
  lon: number | null;
};

export type I5dayForeCastListItemMain = {
  temp: number;
  feels_like?: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
};

export type I5dayForeCastListItemWeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type I5dayForeCastListItemClouds = {
  all: number;
};

export type I5dayForeCastListItemRain = {
  '3h': number;
};

interface I5dayForeCastListItemSnow extends I5dayForeCastListItemRain {}

export type I5dayForeCastListItemSys = {
  pod: 'd' | 'n';
};

export type I5dayForeCastListItemWind = {
  all: number;
  speed: number;
  deg: number;
  gust: number;
};

export type I5dayForeCastCity = {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type IChartDataListItem = [string, I5dayForeCastListItem[]];

export type IWeatherChartData = {
  [key: string]: IChartDataListItem;
};

export interface IGroupInterface {
  d: I5dayForeCastListItem;
  n: I5dayForeCastListItem;
}

export interface I5dayForeCastListItem {
  dt: number;
  main: I5dayForeCastListItemMain;
  weather: I5dayForeCastListItemWeatherItem[];
  clouds: I5dayForeCastListItemClouds;
  wind: I5dayForeCastListItemWind;
  visibility: number;
  pop: number;
  rain: I5dayForeCastListItemRain;
  snow: I5dayForeCastListItemSnow;
  sys: I5dayForeCastListItemSys;
  dt_txt: string;
}

export type ICurrentCityWeatherSys = {
  id: number;
  type: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export interface ICurrentCity {
  coord?: ICoord;
  weather?: I5dayForeCastListItemWeatherItem[];
  base?: string;
  main?: I5dayForeCastListItemMain;
  visibility?: number;
  wind?: I5dayForeCastListItemWind;
  clouds?: I5dayForeCastListItemClouds;
  dt?: number;
  sys?: ICurrentCityWeatherSys;
  id?: number;
  name?: string;
  cod?: number;
}

export interface I5dayForeCast {
  status: LoadStatus;
  list: I5dayForeCastListItem[] | null;
  city: I5dayForeCastCity | null;
}

export interface IResponseErrors {
  response: {
    status: number;
    data: IResponseDataErrors;
    [key: string]: unknown;
  };
}

export interface IResponseDataErrors {
  cod: string;
  message: string;
}

export interface IWeatherStore extends I5dayForeCast {
  currentCityData: ICurrentCity;
  currentStatus: LoadStatus;
  curError: IResponseDataErrors | {};
  foreCastError: IResponseDataErrors | {};
}
export interface I5dayForeCastOptions {
  lat: number | null;
  lon: number | null;
  appid: string;
  cnt?: number;
}

export interface IHistoricalWeatherRequest extends I5dayForeCastOptions {
  start: number;
  end: number;
}
export interface IGetCurrentCityWeatherOptions {
  appid: string;
  q: string;
}

export interface IAppStore {
  isSnackbarVisible: boolean;
  message: string;
}
