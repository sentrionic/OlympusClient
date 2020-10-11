import useSWR from 'swr';
import { ProfileResponse } from './models';

interface User {
  user: ProfileResponse;
  isLoading: boolean;
  isError: boolean;
}

export const useGetCurrentUser = (): User => {
  const { data, error } = useSWR('/user', { refreshInterval: 1000000 });
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
