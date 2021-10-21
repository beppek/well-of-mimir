import { ComponentProps } from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import SanityBlockContent from '@sanity/block-content-to-react';
import { Box } from '@components/atoms/box';
import { Image } from '@components/atoms/image';
import { getUrlForImage } from '@lib/content/content-fetcher';
import { Link } from '@components/atoms/link';
import config from 'config';
import { CMSImage } from '@common/content-types';

type BlockNode = {
  language?: string;
  code?: string;
  asset?: CMSImage['asset'];
  caption?: string;
  alt?: string;
};

type Block = {
  node: BlockNode;
};

type Props = {
  blocks: Block[] | any[];
  foregroundColor?: string;
};

const serializers = {
  types: {
    code: ({ node }: Block) => (
      <pre data-language={node.language}>
        <code>{node.code}</code>
      </pre>
    ),
    imageAlt: ({ node }: Block) => {
      const width = 500;
      const height =
        width / (node?.asset?.metadata?.dimensions?.aspectRatio || 1);

      return (
        <figure>
          <Image
            py="2"
            placeholder="blur"
            w={`${width}px`}
            h={`${height}px`}
            htmlWidth={width}
            blurDataURL={getUrlForImage(node).size(10, 10).url()}
            htmlHeight={height || width}
            display="inline-block"
            src={getUrlForImage(node)
              .width(Math.floor(width))
              .height(Math.floor(height))
              .url()}
            alt={node.alt}
          />
          <figcaption>{node?.caption || node?.alt}</figcaption>
        </figure>
      );
    },
    youtube: ({ node }: { node: { url: string } }) => {
      const { url } = node;
      const id = getYouTubeId(url) as string | undefined;
      return <YouTube videoId={id} />;
    },
  },
  marks: {
    link: ({ children, mark }: any) => (
      <Link isExternal={mark.linkType !== 'internal'} href={mark.href}>
        {children}
      </Link>
    ),
    internalLink: ({ children, mark }: any) => {
      const slug =
        mark.slug.current === 'index' ? '/' : `/${mark.slug.current}`;
      const href = mark.anchor ? `${slug}${mark.anchor}` : slug;
      return <Link href={href}>{children}</Link>;
    },
  },
};

export function BlockContent({ foregroundColor, blocks }: Props) {
  return (
    <Box
      sx={{
        p: {
          marginY: 4,
        },
        ul: {
          marginY: 4,
          paddingInlineStart: '40px',
          p: 'revert',
        },
        ol: {
          marginY: 4,
          paddingInlineStart: '40px',
          p: 'revert',
        },
        a: {
          _hover: {
            textColor: 'brand.200',
          },
          textColor: foregroundColor || 'link',
        },
        h1: {
          // fontFamily: font.heading,
          fontSize: '3xl',
        },
        h2: {
          // fontFamily: fonts.heading,
          fontSize: { base: 'lg', md: 'xl', lg: '2xl' },
        },
        h3: {
          // fontFamily: fonts.heading,
          fontSize: { base: 'md', md: 'lg' },
        },
        h4: {
          // fontFamily: fonts.heading,
          fontSize: { base: 'md', md: 'lg' },
        },
        h5: {
          // fontFamily: fonts.heading,
          fontSize: 'md',
        },
        h6: {
          // fontFamily: fonts.heading,
          fontSize: 'md',
        },
      }}
    >
      <SanityBlockContent
        dataset={config.cms.dataset}
        projectId={config.cms.projectId}
        blocks={blocks}
        serializers={serializers}
      />
    </Box>
  );
}
