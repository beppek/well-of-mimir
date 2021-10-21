import { mode } from '@chakra-ui/theme-tools';
import { ColorMode, extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light' as ColorMode,
  useSystemColorMode: true,
};

export const colors = {
  brand: {
    50: '#4aaad3',
    100: '#277DA1',
    200: '#247294',
    300: '#206683',
    400: '#1c5973',
    500: '#184c63',
    600: '#143f52',
    700: '#103342',
    800: '#0c2631',
    900: '#081921',
  },
  link: 'red',
  linkHover: '#72EFDD',
  footer: {
    background: '#ecf0f5',
    title: '#515b69',
    linkItem: '#72849c',
    copyright: '#7f8795',
  },
  header: {
    background: '#6930c3',
    title: '#fff',
    linkItem: '#80ffdb',
    activeLinkItem: '#64dfdf',
  },
};

export const styles = {
  global: (props: any) => ({
    body: {
      color: mode('gray.800', 'white')(props),
      bg: mode('white', '#141214')(props),
      a: {
        color: colors.link,
        _hover: {
          color: colors.linkHover,
        },
      },
    },
  }),
};

type ComponentProps = {
  colorMode: string;
};

export const sizes = {
  navigation: {
    width: '250px',
  },
};

export const components = {
  // Custom components
  LogoWrapper: {
    baseStyle: (props: ComponentProps) => ({
      // py: '6',
      justifyContent: 'center',
      background: mode('gray.100', 'gray.700')(props),
      borderRadius: 'full',
      w: '24',
      h: '24',
      alignItems: 'center',
      mx: 'auto',
      my: '2',
    }),
  },
  Navigation: {
    baseStyle: (props: ComponentProps) => ({
      overflowY: 'scroll',
      flexDirection: 'column',
      w: sizes.navigation.width,
      position: 'fixed',
      h: '100vh',
      borderRightWidth: '1px',
      borderRightColor: mode('gray.100', 'whiteAlpha.200')(props),
      fontSize: 'lg',
    }),
  },
  NavItem: {
    baseStyle: (props: ComponentProps) => ({
      py: '2',
      px: '4',
      d: 'block',
      w: '100%',
      borderBottomColor: mode('gray.100', 'whiteAlpha.200')(props),
      borderBottomWidth: '1px',
    }),
  },
  SubNavItem: {
    baseStyle: (props: ComponentProps) => ({
      py: '2',
      pr: '4',
      pl: '6',
      d: 'flex',
      alignItems: 'center',
      w: '100%',
      borderBottomColor: mode('gray.100', 'whiteAlpha.200')(props),
      borderBottomWidth: '1px',
      _first: {
        borderTopWidth: '1px',
        borderTopColor: mode('gray.100', 'whiteAlpha.200')(props),
      },
    }),
  },
  ContentWrapper: {
    baseStyle: () => ({
      ml: sizes.navigation.width,
      position: 'relative',
      minH: '100vh',
      w: 'auto',
      d: 'flex',
      flexDirection: 'column',
      p: '10',
      alignItems: 'center',
    }),
  },
  Banner: {
    baseStyle: (props: ComponentProps) => ({
      position: 'fixed',
      bottom: 0,
      py: '2',
      px: '6',
      w: 'full',
      backgroundColor: 'green',
      color: 'white',
    }),
  },
};

export const theme = extendTheme({ config, colors, styles, components });
