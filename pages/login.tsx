import { PageLayouts } from '@components/templates/layouts/layout-selector';
import { LoginPageTemplate } from '@components/templates/login-page-template';
import { GetStaticProps } from 'next';

export default function Login() {
  return <LoginPageTemplate />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      key: 'login',
      pageLayout: PageLayouts.login,
    },
  };
};
