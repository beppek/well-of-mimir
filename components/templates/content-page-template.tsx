import { Page } from '@common/content-types';
import { Badge } from '@components/atoms/badge';
import { Flex } from '@components/atoms/flex';
import { Heading } from '@components/atoms/typography/heading';
import { BlockContent } from '@components/molecules/block-content/block-content';

type Props = {
  page: Page;
};

export function ContentPageTemplate({ page }: Props) {
  return (
    <>
      <Flex gridGap="2">
        {Object.entries(page.targetAudience).map(([key, showBadge]) => {
          return showBadge ? (
            <Badge
              key={key}
              colorScheme={key === 'editor' ? 'green' : 'purple'}
            >
              {key}
            </Badge>
          ) : null;
        })}
      </Flex>
      <Heading>{page.title}</Heading>
      <BlockContent blocks={page.content} />
    </>
  );
}
