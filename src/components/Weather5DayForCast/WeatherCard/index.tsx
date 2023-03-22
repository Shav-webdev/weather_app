import '../styles.scss';
import moment from 'moment';
import { DATE_FORMATS } from 'helpers/constants';
import useTemperature from 'hooks/useTemperature';
import { I5dayForeCastListItem } from 'helpers/global.types';
import { SunIcon, RainIcon, CloudsIcon, MoonIcon } from 'assets/icons';
import WeatherIcon from './WeatherIcon';

export type WeatherCardProps = {
  item: {
    d: I5dayForeCastListItem;
    n: I5dayForeCastListItem;
  };
};
const WeatherCard = ({ item }: WeatherCardProps) => {
  const { getTemperature } = useTemperature();
  const weatherIcon = (item: I5dayForeCastListItem, isNight = false) => {
    switch (item?.weather[0].main) {
      case 'Rain':
        return <RainIcon />;
      case 'Clouds':
        return <CloudsIcon />;
      case 'Clear':
        return isNight ? <MoonIcon /> : <SunIcon />;
      default:
        return '';
    }
  };

  return (
    <div className={'weather-card-item'}>
      <div className={`weather-card day`}>
        <div className={'weather-card-head'}>
          {item.d?.dt_txt && (
            <h3>
              <strong>
                {moment(item.d?.dt_txt).format(DATE_FORMATS.WEEKDAY_DATE)}
              </strong>
            </h3>
          )}
          <div className={'icon-wrapper'}>
            <WeatherIcon iconCode={item.d?.weather[0]?.icon} />
          </div>
        </div>
        <div className={'weather-card-body'}>
          {item.d?.main.temp && (
            <div className={'space'}>
              <strong>Temperature</strong> {getTemperature(item.d?.main.temp)}
            </div>
          )}
          {item.d?.main.feels_like && (
            <div className={'space'}>
              <strong>Feels like </strong>
              {getTemperature(item.d?.main.feels_like)}
            </div>
          )}
          {item.d?.main.humidity && (
            <div className={'space'}>
              <strong>Humidity </strong>
              {item.d?.main.humidity} %
            </div>
          )}
        </div>
        <div className={'weather-card-footer'}>
          {item.d?.main.pressure && (
            <div className={'space'}>
              <strong>Pressure </strong>
              {item.d?.main.pressure} hPa
            </div>
          )}
          {item.d?.wind.speed && (
            <div className={'space'}>
              <strong>Wind speed </strong>
              {item.d?.wind.speed} meter/sec
            </div>
          )}
        </div>
      </div>
      <div className={`weather-card night`}>
        <div className={'weather-card-head'}>
          <h3>
            <strong>
              {moment(item.n?.dt_txt).format(DATE_FORMATS.WEEKDAY_DATE)}
            </strong>
          </h3>
          <div className={'icon-wrapper'}>
            <WeatherIcon iconCode={item.n?.weather[0]?.icon} />
          </div>
        </div>
        <div className={'weather-card-body'}>
          {item.n?.main.temp && (
            <div className={'space'}>
              <strong>Temperature</strong> {getTemperature(item.n?.main.temp)}
            </div>
          )}
          {item.n?.main.feels_like && (
            <div className={'space'}>
              <strong>Feels like </strong>
              {getTemperature(item.n?.main.feels_like)}
            </div>
          )}
          {item.n?.main.humidity && (
            <div className={'space'}>
              <strong>Humidity </strong>
              {item.n?.main.humidity} %
            </div>
          )}
        </div>
        <div className={'weather-card-footer'}>
          {item.n?.main.pressure && (
            <div className={'space'}>
              <strong>Pressure </strong>
              {item.n?.main.pressure} hPa
            </div>
          )}
          {item.d?.wind.speed && (
            <div className={'space'}>
              <strong>Wind speed </strong>
              {item.d?.wind.speed} meter/sec
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
