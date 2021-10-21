import { Page } from '@common/content-types';
import { fetchLayout, fetchPage } from '@lib/content/content-fetcher';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { withRequireAuth } from '@hoc/with-auth';
import config from 'config';
import { ContentPageTemplate } from '@components/templates/content-page-template';

type Props = {
  page: Page;
};

function Home({ page }: Props) {
  return (
    <>
      <Head>
        <title>{config.site.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentPageTemplate page={page} />
    </>
  );
}

export default withRequireAuth(Home);

export const getStaticProps: GetStaticProps = async (context) => {
  const [page, globalLayout] = await Promise.all([
    fetchPage({ slug: 'index' }),
    fetchLayout(),
  ]);
  return {
    props: {
      key: 'index',
      page,
      globalLayout,
    },
  };
};
