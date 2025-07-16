import { useQuery } from '@tanstack/react-query';
import { dashboardApi, DashboardResponse } from '@/services/api';

export const useDashboardData = (dateRange: string = '30d', location: string = 'metro-area') => {
  return useQuery<DashboardResponse, Error>({
    queryKey: ['dashboard', dateRange, location],
    queryFn: () => dashboardApi.getDashboardData(dateRange, location),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};