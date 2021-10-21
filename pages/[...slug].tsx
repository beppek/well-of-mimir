import { Page } from '@common/content-types';
import {
  fetchAllPageSlugs,
  fetchLayout,
  fetchPage,
} from '@lib/content/content-fetcher';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { withRequireAuth } from '@hoc/with-auth';
import config from 'config';
import { ContentPageTemplate } from '@components/templates/content-page-template';

type Props = {
  page: Page;
};

function CatchAllPage({ page }: Props) {
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

export default withRequireAuth(CatchAllPage);

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = [''] } = context.params as { slug: string[] };
  const [page, globalLayout] = await Promise.all([
    fetchPage({ slug: slug.join('/') }),
    fetchLayout(),
  ]);
  return page
    ? {
        props: {
          key: page._id,
          page,
          globalLayout,
        },
      }
    : {
        notFound: true,
        globalLayout,
      };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchAllPageSlugs();
  const paths = pages.map((page: Page) => ({
    params: {
      slug: page.slug.split('/'),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
