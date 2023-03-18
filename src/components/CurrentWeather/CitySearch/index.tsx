import './styles.scss';
import { CONFIG } from 'configs';
import {
  get5dayForeCastAsync,
  getCurrentCityWeatherAsync,
} from 'store/weather/weatherThunks';
import { useAppDispatch } from 'store';
import {
  currentCityDataSelector,
  currentCityLoadingSelector,
} from 'store/weather/weatherSlice';
import { useSelector } from 'react-redux';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { ICurrentCity, LoadStatus } from 'helpers/global.types';

const CitySearch = () => {
  const dispatch = useAppDispatch();
  const [city, setCity] = useState('');
  const debouncedCityName = useDebounce(city, 1000);
  const loadingData = useSelector(currentCityLoadingSelector);
  const cityData: ICurrentCity = useSelector(currentCityDataSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  useEffect(
    () => {
      if (debouncedCityName) {
        dispatch(
          getCurrentCityWeatherAsync({
            q: debouncedCityName,
            appid: CONFIG.WEATHER_API_KEY,
          }),
        );
      }
    },
    [debouncedCityName], // Only call effect if debounced search term changes
  );

  useEffect(() => {
    if (!cityData.hasOwnProperty('coord')) return;
    dispatch(
      get5dayForeCastAsync({
        lat: cityData?.coord?.lat!,
        lon: cityData?.coord?.lon!,
        appid: CONFIG.WEATHER_API_KEY,
      }),
    );
  }, [cityData]);

  return (
    <div className={'search-container'}>
      <span>
        <input
          value={city}
          onChange={handleChange}
          className="balloon"
          id="city"
          type="text"
          placeholder="Search city"
        />
        <label htmlFor="city">City</label>
      </span>
      {loadingData === LoadStatus.Loading ? (
        <div className={'search-loading'}>Searching ...</div>
      ) : null}
    </div>
  );
};

export default CitySearch;
