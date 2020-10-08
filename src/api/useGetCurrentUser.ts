import useSWR from 'swr';

export const useGetCurrentUser = () => {
  const { data, error } = useSWR('user');
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
