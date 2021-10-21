import { ReactElement } from 'react';
import { Box } from '@components/atoms/box';
import { GlobalLayout } from '@common/content-types';
import { Center } from '@components/atoms/center';

type Props = {
  children?: ReactElement | ReactElement[] | string;
  globalLayout: GlobalLayout;
};

export function LoginLayout({ children, globalLayout }: Props) {
  return (
    <Center h="100vh" w="full">
      {children}
    </Center>
  );
}
