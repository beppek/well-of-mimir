import { GlobalLayout } from '@common/content-types';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

export enum PageLayouts {
  default = 'default',
  login = 'login',
}

const Layouts = {
  [PageLayouts.default]: dynamic(
    () =>
      import('@components/templates/layouts/default-layout').then(
        (mod) => mod.DefaultLayout,
      ) as any,
  ),
  [PageLayouts.login]: dynamic(
    () =>
      import('@components/templates/layouts/login-layout').then(
        (mod) => mod.LoginLayout,
      ) as any,
  ),
};

type Props = {
  children: ReactElement | ReactElement[] | string;
  pageLayout?: PageLayouts;
  globalLayout: GlobalLayout;
};

export function LayoutSelector({
  children,
  pageLayout = PageLayouts.default,
  globalLayout,
}: Props) {
  const Layout: any = Layouts[pageLayout] || Layouts[PageLayouts.default];
  return <Layout globalLayout={globalLayout}>{children}</Layout>;
}
