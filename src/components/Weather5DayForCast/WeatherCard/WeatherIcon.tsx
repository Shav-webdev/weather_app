import { useEffect, useState } from 'react';

const WeatherIcon = ({ iconCode }: { iconCode: string }) => {
  const [iconUrl, setIconUrl] = useState('');

  useEffect(() => {
    if (!iconCode) return;
    setIconUrl('http://openweathermap.org/img/w/' + iconCode + '.png');
  }, [iconCode]);

  return <div>{iconUrl && <img src={iconUrl} alt="weather icon" />}</div>;
};

export default WeatherIcon;
