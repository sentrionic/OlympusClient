import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetCurrentUser } from '../api/useGetCurrentUser';

export const useIsAuth = () => {
  const { user, isLoading } = useGetCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [isLoading, user, router]);
};
