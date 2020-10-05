import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetMe } from '../api/useGetMe';

export const useIsAuth = () => {
  const { user, isLoading, isError } = useGetMe();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [isLoading, user, router]);
};
