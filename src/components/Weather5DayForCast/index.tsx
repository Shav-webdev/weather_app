import { useEffect, useId } from 'react';
import './styles.scss';
import Loader from '../Loader';
import { CONFIG } from 'configs';
import { useAppDispatch } from 'store';
import WeatherCard from './WeatherCard';
import { useSelector } from 'react-redux';
import useWeatherData from 'hooks/useWeatherData';
import { weatherSelector } from 'store/weather/weatherSlice';
import { LoadStatus, IGroupInterface } from 'helpers/global.types';
import { get5dayForeCastAsync } from 'store/weather/weatherThunks';
import { geoLocationSelector } from 'store/geoLocation/geoLocationSlice';

const Weather5DayForCast = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const { grouped } = useWeatherData();
  const { city, status } = useSelector(weatherSelector);
  const { latitude, longitude } = useSelector(geoLocationSelector);

  useEffect(() => {
    if (!latitude || !longitude) return;
    dispatch(
      get5dayForeCastAsync({
        lat: latitude,
        lon: longitude,
        appid: CONFIG.WEATHER_API_KEY,
      }),
    );
  }, [dispatch, latitude, longitude]);

  return (
    <div className={'weather-cards-container'}>
      {status === LoadStatus.Loading ? (
        <Loader />
      ) : (
        <>
          <div className={'city-details'}>
            <div className={'city-name space'}>
              <strong>
                {city?.name}/{city?.country}
              </strong>
            </div>
          </div>
          <div className={'weather-cards-wrapper'}>
            {grouped?.length
              ? grouped.map((item: IGroupInterface, index: number) => {
                  return <WeatherCard key={`${id}-${index}`} item={item} />;
                })
              : 'No data'}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather5DayForCast;
