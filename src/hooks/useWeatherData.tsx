import { useMemo } from 'react';
import { IGroupInterface, I5dayForeCastListItem } from 'helpers/global.types';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { DATE_FORMATS } from 'helpers/constants';
import { weatherSelector } from 'store/weather/weatherSlice';

const useWeatherData = () => {
  const { list } = useSelector(weatherSelector);

  const groupedList = useMemo(() => {
    let data: any = list?.length ? [...list] : [];

    data = data?.reduce((acc: any, currentValue: I5dayForeCastListItem) => {
      let dateProp = moment(currentValue.dt_txt).format(
        DATE_FORMATS.NUMERIC_DATE,
      );

      let current = {
        [dateProp]: acc[dateProp]
          ? {
              ...acc[dateProp],
              [currentValue.sys.pod]: acc[dateProp][currentValue.sys.pod]
                ?.length
                ? [...acc[dateProp][currentValue.sys.pod], currentValue][0]
                : currentValue,
            }
          : {
              [currentValue.sys.pod]: currentValue,
            },
      };

      return {
        ...acc,
        ...current,
      };
    }, {});

    return data;
  }, [list]);

  const grouped: IGroupInterface[] = useMemo(() => {
    return Object.values(groupedList);
  }, [groupedList]);

  const historicalData = useMemo(() => {
    let data: any = list?.length ? [...list] : [];

    data = data?.reduce((acc: any, currentValue: I5dayForeCastListItem) => {
      let dateProp = moment(currentValue.dt_txt).format(
        DATE_FORMATS.NUMERIC_DATE,
      );

      let current = {
        [dateProp]: acc[dateProp]
          ? [...acc[dateProp], currentValue]
          : [currentValue],
      };

      return {
        ...acc,
        ...current,
      };
    }, {});

    return data;
  }, [list]);

  return { grouped, groupedList, historicalData };
};

export default useWeatherData;
