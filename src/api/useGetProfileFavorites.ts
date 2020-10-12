import useSWR from 'swr';

import { ArticleResponse, ProfileResponse } from './models';

interface Articles {
  articles: ArticleResponse[];
  isLoading: boolean;
  isError: boolean;
}

interface GetProfileFavoritesProps {
  profile: ProfileResponse;
  articles: ArticleResponse[];
}

export const useGetProfileFavorites = ({
  profile,
  articles,
}: GetProfileFavoritesProps): Articles => {
  const { data, error } = useSWR(`/articles?author=${profile.username}`, {
    initialData: articles,
  });
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
};
