import useSWR from 'swr';

export const useGetMe = () => {
  const { data, error } = useSWR(`/api/user/`);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
