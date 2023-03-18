import './styles.scss';
import {
  currentCityDataSelector,
  currentCityLoadingSelector,
} from 'store/weather/weatherSlice';
import Loader from '../../Loader';
import { useSelector } from 'react-redux';
import useTemperature from 'hooks/useTemperature';
import { ICurrentCity, LoadStatus } from 'helpers/global.types';

const CurrentCityDetails = () => {
  const { getTemperature } = useTemperature();
  const loadingData = useSelector(currentCityLoadingSelector);
  const cityData: ICurrentCity = useSelector(currentCityDataSelector);

  return (
    <div className={'current-city-details'}>
      {loadingData === LoadStatus.Loading ? (
        <Loader />
      ) : cityData?.id ? (
        <>
          {cityData?.name && (
            <h4>
              <strong>{cityData?.name}</strong>
            </h4>
          )}
          {cityData?.main ? (
            <div>
              <p>
                Temperature:
                <strong> {getTemperature(cityData?.main.temp)}</strong>{' '}
              </p>
              <p>
                Feels like:
                <strong>
                  {' '}
                  {getTemperature(cityData?.main.feels_like!)}
                </strong>{' '}
              </p>
              <p>
                Humidity:<strong> {cityData?.main.humidity}</strong>
                {' %'}
              </p>
              <p>
                Pressure:<strong> {cityData?.main.pressure}</strong>
                {' hPa'}
              </p>
              <p>
                Pressure:<strong> {cityData?.wind?.speed}</strong>
                {' meter/sec'}
              </p>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default CurrentCityDetails;
