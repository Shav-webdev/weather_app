import { KELVIN_TEMP } from './constants';

export const toCelsius = (temp: number) => {
  return `${Math.round(temp - KELVIN_TEMP)}°C`;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const get7DayBeforeDate = () => {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
};

export const get7daysUnixTimestamp = () => {
  return Math.floor(get7DayBeforeDate().getTime() / 1000);
};

export const getUnixTimestamp = (date: Date) => {
  return Math.floor(new Date(date).getTime() / 1000);
};
