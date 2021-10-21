import { ReactElement } from 'react';
import { Box } from '@components/atoms/box';
import { GlobalLayout } from '@common/content-types';
import { Icon } from '@components/atoms/icon';
import { getUrlForImage } from '@lib/content/content-fetcher';
import { useStyleConfig } from '@hooks/use-style-config';
import { Link } from '@components/atoms/link';
import { Divider } from '@components/atoms/divider';
import { Flex } from '@components/atoms/flex';
import {
  ArrowForwardIcon,
  LockIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  calculateContrastingTextColor,
  generateColorFromString,
} from '@utils/color-utils';
import { Spacer } from '@chakra-ui/layout';
import { Button } from '@components/atoms/button';
import { useColorMode } from '@hooks/use-color-mode';
import { useAuth } from '@hooks/use-auth';

type Props = {
  children?: ReactElement | ReactElement[] | string;
  globalLayout: GlobalLayout;
};

export function DefaultLayout({ children, globalLayout }: Props) {
  const { toggleColorMode, colorMode } = useColorMode();
  const auth = useAuth();
  const navigationtyles = useStyleConfig('Navigation');
  const wrapperStyles = useStyleConfig('ContentWrapper');
  const navItemStyles = useStyleConfig('NavItem');
  const subNavItemStyles = useStyleConfig('SubNavItem');
  const logoWrapperStyles = useStyleConfig('LogoWrapper');
  return (
    <Box>
      <Flex sx={navigationtyles}>
        <Flex sx={logoWrapperStyles}>
          <Icon
            src={getUrlForImage(globalLayout.header.logo)
              .height(70)
              .width(70)
              .url()}
            height="70"
            width="70"
          />
        </Flex>
        <Divider />
        <Box overflowY="scroll">
          {globalLayout.header.primaryNav.items.map((item) => {
            const bgColor = generateColorFromString(item.text);
            const textColor = calculateContrastingTextColor(bgColor);
            return (
              <Flex
                key={item.text}
                borderLeftColor={bgColor}
                borderLeftWidth="5px"
                flexDirection="column"
                textDecoration="none"
              >
                <Link
                  _hover={{
                    background: bgColor,
                    color: textColor,
                    scaleX: 1.1,
                  }}
                  sx={navItemStyles}
                  key={item.text}
                  href={item.link.href}
                >
                  {item.text}
                </Link>
                {item.subItems?.map((subItem) => (
                  <Link
                    _hover={{
                      background: bgColor,
                      color: textColor,
                    }}
                    sx={subNavItemStyles}
                    key={subItem.text}
                    href={subItem.link.href}
                  >
                    <ArrowForwardIcon mr="1" />
                    {subItem.text}
                  </Link>
                ))}
              </Flex>
            );
          })}
        </Box>
        <Spacer />
        <Button borderRadius="0" onClick={auth.logout} leftIcon={<LockIcon />}>
          Logout
        </Button>
        <Button
          borderRadius="0"
          onClick={toggleColorMode}
          leftIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        >
          Toggle {colorMode === 'dark' ? 'light' : 'dark'} mode
        </Button>
      </Flex>
      <Box sx={wrapperStyles}>
        <Box maxW="800px">{children}</Box>
      </Box>
    </Box>
  );
}
