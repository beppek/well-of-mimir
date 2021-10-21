import { FcAddImage } from 'react-icons/fc';
import { RuleType } from '../../common/types';

export default {
  name: 'imageAlt',
  type: 'image',
  title: 'Image',
  icon: FcAddImage,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: (Rule: RuleType): RuleType =>
        Rule.error('You have to fill out the alternative text.').required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption',
      subtitle: 'alt',
    },
    prepare({ title, subtitle, imageUrl }) {
      return {
        title: `${title || subtitle}`,
        subtitle: title ? `${subtitle}` : null,
        imageUrl,
      };
    },
  },
};
