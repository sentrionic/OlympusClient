import useSWR from 'swr';
import { BASE_URL } from '../utils/constants';

export const useGetArticles = () => {
  const { data, error } = useSWR(`${BASE_URL}/articles`);
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
};
