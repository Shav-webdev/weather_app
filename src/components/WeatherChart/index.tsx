import { useMemo } from 'react';
import moment from 'moment';
import Highcharts from 'highcharts';
import { DATE_FORMATS } from 'helpers/constants';
import useWeatherData from 'hooks/useWeatherData';
import useTemperature from 'hooks/useTemperature';
import HighchartsReact from 'highcharts-react-official';
import { I5dayForeCastListItem } from 'helpers/global.types';

type ITitle = {
  text: string;
};
interface ISeries {
  name: string;
  data: number[];
}

type ITAxis = {
  title?: ITitle;
  categories?: string[];
};
type IStyle = {
  pointerEvents: 'auto';
};

type ITooltip = {
  formatter?: () => string;
  style?: IStyle;
  shared?: boolean;
};

type IAccessibility = {
  enabled: boolean;
};

interface IWeatherOptions {
  title: ITitle;
  series: ISeries[];
  xAxis: ITAxis;
  yAxis: ITAxis;
  tooltip?: ITooltip;
  accessibility: IAccessibility;
}

const WeatherChart = () => {
  const { historicalData } = useWeatherData();
  const { getTemperatureNumber, getTemperatureMeasurement } = useTemperature();

  const chartOptions = useMemo(() => {
    const entries: [string, I5dayForeCastListItem[]][] =
      Object.entries(historicalData);

    const options: IWeatherOptions = {
      title: {
        text: '5 day forecast',
      },
      series: [],
      xAxis: {
        categories: [],
      },
      yAxis: {
        title: {
          text: 'Temperature ' + getTemperatureMeasurement(),
        },
      },
      tooltip: {
        formatter() {
          return (
            'The value for <b>' +
            // @ts-ignore
            this?.x +
            '</b> is <b>' +
            // @ts-ignore
            this.y +
            // @ts-ignore
            getTemperatureMeasurement() +
            ' '
          );
        },
        shared: true,
      },
      accessibility: {
        enabled: false,
      },
    };

    for (const dataKey in entries) {
      const seriesItem: [name: string, data: I5dayForeCastListItem[]] =
        entries[dataKey];
      options.series.push({
        name: seriesItem[0],
        data: seriesItem[1].map((el: I5dayForeCastListItem) =>
          getTemperatureNumber(el?.main?.temp),
        ),
      });
      if (
        options.xAxis.categories?.length === 0 &&
        seriesItem[1]?.length === 8
      ) {
        options.xAxis.categories = seriesItem[1].map(
          (el: I5dayForeCastListItem) =>
            moment(el.dt_txt).format(DATE_FORMATS.TIME),
        );
      }
    }

    return options;
  }, [historicalData, getTemperatureNumber, getTemperatureMeasurement]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default WeatherChart;
