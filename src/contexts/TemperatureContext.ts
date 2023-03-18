import { createContext } from 'react';

export const TemperatureContext = createContext({
  temperature: 'kelvin',
  setTemperature: (temperature: 'kelvin' | 'celsius') => {},
});
