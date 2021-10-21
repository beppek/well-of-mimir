/* eslint-disable react/destructuring-assignment */
import { Center } from '@components/atoms/center';
import { PuffLoader } from '@components/atoms/spinners';
import { useAuth } from '@hooks/use-auth';
import { ComponentType, FC } from 'react';

type Props = any;

export const withRequireAuth =
  <P extends object>(Component: ComponentType<P>): FC<P & Props> =>
  (props: Props) => {
    const slug =
      props.page.slug.current === 'index' ? '/' : props.page.slug.current;
    const { user } = useAuth({
      redirectTo: `/login?redirect=${encodeURIComponent(slug)}`,
    });
    return !user?.isLoggedIn ? (
      <Center minH="100vh">
        <PuffLoader />
      </Center>
    ) : (
      <Component {...props} />
    );
  };
