import { useQuery } from '@tanstack/react-query';
import { weatherApi, WeatherResponse } from '@/services/api';

export const useWeatherData = (city?: string, lat?: number, lon?: number) => {
  return useQuery<WeatherResponse, Error>({
    queryKey: ['weather', city, lat, lon],
    queryFn: () => weatherApi.getWeatherData(city, lat, lon),
    enabled: !!(city || (lat && lon)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useLocationWeather = (location: string) => {
  return useQuery<WeatherResponse, Error>({
    queryKey: ['weather', location],
    queryFn: () => weatherApi.getWeatherData(location),
    enabled: !!location,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};