import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './default-theme';

export function ThemeProvider({ children }: any) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
