import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Center } from '@components/atoms/center';
import { Text } from '@components/atoms/typography/text';
import { fetchLayout } from '@lib/content/content-fetcher';
import config from 'config';

function NotFoundPage() {
  return (
    <>
      <Head>
        <title>{config.site.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Text>Sorry, the page you're looking for could not be found</Text>
      </Center>
    </>
  );
}

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const globalLayout = await fetchLayout();
  console.log('globalLayout :>> ', globalLayout);
  return {
    props: {
      key: 404,
      globalLayout,
    },
  };
};
