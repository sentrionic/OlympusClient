import useSWR from 'swr';

export const useGetCurrentUser = () => {
  const { data, error } = useSWR('user', { refreshInterval: 1000000 });
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
