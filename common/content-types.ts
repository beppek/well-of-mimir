export type CMSIcon = {
  dark: CMSImage;
  light: CMSImage;
};

export type NavItemAction = {
  linkType: 'internal' | 'external' | 'feature';
  page?: Page;
  anchorLink?: string;
  link: string;
  feature?: string;
  kind?: 'button' | 'link';
  href: string;
};

export type NavItem = {
  text: string;
  icon?: CMSIcon;
  style?: 'icon' | 'text' | 'both';
  navItemAction: NavItemAction;
  subItems: NavItem[];
  link: {
    href: string;
  };
};

export type Navigation = {
  items: NavItem[];
};

export type HeaderData = {
  logo: CMSImage;
  title: string;
  showTitle: boolean;
  primaryNav: Navigation;
  secondaryNav: Navigation;
};

export type FooterData = {};

export type GlobalLayout = {
  header: HeaderData;
  footer: FooterData;
};

export type BlockContent = {
  _key: string;
  _type: string;
  style: string;
  children: unknown[];
  markdefs: unknown[];
};

export type Page = {
  slug: string;
  title: string;
  content: BlockContent[];
  targetAudience: {
    developer: boolean;
    editor: boolean;
  };
};

export type CMSImage = {
  alt: string;
  asset: {
    extension: string;
    metadata: CMSImageMetadata;
    url: string;
  };
  caption?: string;
};

export type CMSImageMetadata = {
  hasAlpha: boolean;
  isOpaque: boolean;
  lqip: string;
  dimensions: ImageDimensions;
  palette: {
    darkMuted: CMSPalette;
    darkVibrant: CMSPalette;
    dominant: CMSPalette;
    lightMuted: CMSPalette;
    lightVibrant: CMSPalette;
    muted: CMSPalette;
    vibrant: CMSPalette;
  };
};

export type ImageDimensions = {
  aspectRatio: number;
  height: number;
  width: number;
};

export type PaletteVariant = {
  background: string;
  foreground: string;
  population: number;
  title: string;
};

export type Palette = {
  darkMuted: PaletteVariant;
  darkVibrant: PaletteVariant;
  dominant: PaletteVariant;
  lightMuted: PaletteVariant;
  lightVibrant: PaletteVariant;
  muted: PaletteVariant;
  vibrant: PaletteVariant;
};

export type CMSPalette = {
  background: string;
  foreground: string;
  population: number;
  title: string;
  _type: string;
};
