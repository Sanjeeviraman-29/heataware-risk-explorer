import { useQuery } from '@tanstack/react-query';
import { mitigationApi, MitigationResponse } from '@/services/api';

export const useMitigationData = (riskLevel: string = 'moderate', category: string = 'all') => {
  return useQuery<MitigationResponse, Error>({
    queryKey: ['mitigation', riskLevel, category],
    queryFn: () => mitigationApi.getMitigationStrategies(riskLevel, category),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};