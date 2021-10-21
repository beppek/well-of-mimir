import { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import { api } from '@utils/api';
import { useToast } from '@chakra-ui/toast';

type Props = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export function useAuth(
  { redirectTo, redirectIfFound }: Props = {
    redirectTo: '',
    redirectIfFound: false,
  },
) {
  const toast = useToast();
  const { data: { data: user } = {}, mutate: mutateUser } = useSWR('/api/user');
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      console.log('redirectTo :>> ', redirectTo);
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  const login = async (email: string, password: string) => {
    try {
      await mutateUser(await api().login({ email, password }));
    } catch (error: any) {
      console.error(error);
      toast({
        status: 'error',
        description: error.message,
      });
    }
  };

  const logout = async () => {
    try {
      await mutateUser(await api().logout());
    } catch (error: any) {
      console.error(error);
      toast({
        status: 'error',
        description: error.message,
      });
    }
  };

  return { user, mutateUser, login, logout };
}
