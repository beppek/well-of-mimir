import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@theme/theme-provider';
import { LayoutSelector } from '@components/templates/layouts/layout-selector';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SWRConfig
        value={{
          fetcher: axios,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <LayoutSelector
          pageLayout={pageProps.pageLayout}
          globalLayout={pageProps.globalLayout}
        >
          <Component {...pageProps} />
        </LayoutSelector>
      </SWRConfig>
    </ThemeProvider>
  );
}
export default MyApp;
