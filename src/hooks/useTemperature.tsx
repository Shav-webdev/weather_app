import { useCallback, useContext } from 'react';
import { KELVIN_TEMP } from 'helpers/constants';
import { TemperatureContext } from 'contexts/TemperatureContext';

const useTemperature = () => {
  const { temperature } = useContext(TemperatureContext);

  const getTemperature = (temp: number) => {
    return temperature === 'celsius'
      ? `${Math.round(temp - KELVIN_TEMP)}°C`
      : `${temp} K`;
  };

  const getTemperatureMeasurement = () => {
    return temperature === 'celsius' ? `°C` : ` K`;
  };

  const getTemperatureNumber = useCallback(
    (temp: number) => {
      return temperature === 'celsius' ? Math.round(temp - KELVIN_TEMP) : temp;
    },
    [temperature],
  );

  return { getTemperature, getTemperatureNumber, getTemperatureMeasurement };
};

export default useTemperature;
