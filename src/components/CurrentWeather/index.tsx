import React from 'react';
import './styles.scss';
import CitySearch from './CitySearch';
import CurrentCityDetails from './CurrentCityDetails';

const CurrentWeather = () => {
  return (
    <div className={'current-weather-wrapper'}>
      <CitySearch />
      <CurrentCityDetails />
    </div>
  );
};

export default CurrentWeather;
