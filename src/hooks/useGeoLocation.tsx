import { useState, useEffect, SetStateAction } from 'react';
import { useAppDispatch } from 'store';
import { ICoordsInterface } from 'helpers/global.types';
import { setLocation } from 'store/geoLocation/geoLocationSlice';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const useGeoLocation = (watch = false, userSettings = {}) => {
  const settings = {
    ...defaultSettings,
    ...userSettings,
  };

  const dispatch = useAppDispatch();
  const [error, setError] = useState<null | string>(null);

  const onChange = ({
    coords,
    timestamp,
  }: {
    coords: ICoordsInterface;
    timestamp: number | null;
  }) => {
    dispatch(
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        speed: coords.speed,
        heading: coords.heading,
        timestamp,
      }),
    );
  };

  const onError = (error: { message: SetStateAction<string | null> }) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    if (watch) {
      const watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
        settings,
      );
      return () => navigator.geolocation.clearWatch(watcher);
    }

    navigator.geolocation.getCurrentPosition(onChange, onError, settings);
  }, [
    settings.enableHighAccuracy,
    settings.timeout,
    settings.maximumAge,
    watch,
  ]);

  return { error };
};
