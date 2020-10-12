import useSWR from 'swr';

import { ProfileResponse } from './models';

interface Profile {
  data: ProfileResponse;
  isLoading: boolean;
  error: boolean;
}

interface GetProfileProps {
  profile: ProfileResponse;
}

export const useGetProfile = ({ profile }: GetProfileProps): Profile => {
  const { data, error } = useSWR(`/profiles/${profile.username}`, {
    dedupingInterval: 60000,
    initialData: profile,
  });
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
