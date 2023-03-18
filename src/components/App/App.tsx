import React, { useState } from 'react';
import './App.scss';
import Layout from 'hoc/Layout';
import Snackbar from '../Snackbar';
import CurrentWeather from '../CurrentWeather';
import { ThemeContext } from 'contexts/ThemeContext';
import { useGeoLocation } from 'hooks/useGeoLocation';
import Weather5DayForCast from '../Weather5DayForCast';
import ForeCastWeatherChart from '../ForeCastWeatherChart';
import { TemperatureContext } from 'contexts/TemperatureContext';

function App() {
  const geoLocation = useGeoLocation(false);
  const isBrowserDefaultDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const getDefaultTemp = () => {
    const localStorageTemp = localStorage.getItem('default-temp');
    return localStorageTemp || 'kelvin';
  };

  const [theme, setTheme] = useState(getDefaultTheme());
  const [temperature, setTemperature] = useState<string>(getDefaultTemp());
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <TemperatureContext.Provider value={{ temperature, setTemperature }}>
        <div className={`theme-${theme}`}>
          <Layout>
            <div className={'main-section'}>
              <CurrentWeather />
              <ForeCastWeatherChart />
            </div>
            {!geoLocation.error ? (
              <Weather5DayForCast />
            ) : (
              'For displaying 5 day weather forecast allow geolocation detection from your browser'
            )}
            <Snackbar />
          </Layout>
        </div>
      </TemperatureContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
