import { useCallback, useContext } from 'react';
import { KELVIN_TEMP, MEASUREMENT_TYPES } from 'helpers/constants';
import { TemperatureContext } from 'contexts/TemperatureContext';

const useTemperature = () => {
  const { temperature = 'kelvin' } = useContext(TemperatureContext);

  const getTemperature = useCallback(
    (temp: number) => {
      switch (temperature) {
        case MEASUREMENT_TYPES.KELVIN:
          return `${temp} K`;
        case MEASUREMENT_TYPES.CELSIUS:
          return `${Math.round(temp - KELVIN_TEMP)}°C`;
        case MEASUREMENT_TYPES.FAHRENHEIT:
          return `${(Math.round(temp - KELVIN_TEMP) * 9) / 5 + 32}°F`;
        default:
          return `${temp} K`;
      }
    },
    [temperature],
  );

  const getTemperatureMeasurement = useCallback(() => {
    switch (temperature) {
      case MEASUREMENT_TYPES.KELVIN:
        return `K`;
      case MEASUREMENT_TYPES.CELSIUS:
        return `°C`;
      case MEASUREMENT_TYPES.FAHRENHEIT:
        return `°F`;
      default:
        return `K`;
    }
  }, [temperature]);

  const getTemperatureNumber = useCallback(
    (temp: number) => {
      switch (temperature) {
        case MEASUREMENT_TYPES.KELVIN:
          return temp;
        case MEASUREMENT_TYPES.CELSIUS:
          return Math.round(temp - KELVIN_TEMP);
        case MEASUREMENT_TYPES.FAHRENHEIT:
          return (Math.round(temp - KELVIN_TEMP) * 9) / 5 + 32;
        default:
          return temp;
      }
    },
    [temperature],
  );

  return { getTemperature, getTemperatureNumber, getTemperatureMeasurement };
};

export default useTemperature;
