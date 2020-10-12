import useSWR from 'swr';

import { ProfileResponse } from './models';

interface User {
  user: ProfileResponse;
  isLoading: boolean;
  isError: boolean;
}

export const useGetCurrentUser = (): User => {
  const { data, error } = useSWR('/user', {
    refreshInterval: 1000000,
    onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
      if (error.status === 403) return;
    },
  });
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
