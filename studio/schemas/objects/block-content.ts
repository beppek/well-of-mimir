import { FaPaperclip } from 'react-icons/fa';
import ExternalLinkRenderer from '../../src/components/external-link-renderer';
import ImageRenderer from '../../src/components/image';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            blockEditor: {
              render: ExternalLinkRenderer,
            },
            fields: [
              {
                title: 'Select the type of link',
                description:
                  'External links go to other websites using the format `https://www.google.com`. Internal links are restricted to other pages in the SANITY database. ☝️ If you change this type remember to remove the old value to remove bugs ☝️',
                name: 'linkType',
                type: 'string',
                options: {
                  list: [
                    { title: 'External', value: 'external' },
                    { title: 'Internal', value: 'internal' },
                  ],
                  layout: 'radio',
                },
              },
              {
                title: 'Page',
                name: 'page',
                hidden: ({ parent }) => parent?.linkType !== 'internal',
                type: 'reference',
                to: [
                  {
                    type: 'page',
                  },
                ],
              },
              {
                title: 'Internal anchor link',
                name: 'anchorLink',
                type: 'string',
                hidden: ({ parent }) => parent?.linkType !== 'internal',
                description:
                  'Example: #my-anchor. Can be used together with page link above.',
              },
              {
                title: 'External link',
                name: 'href',
                type: 'url',
                hidden: ({ parent }) => parent?.linkType !== 'external',
                description: 'Example: https://www.sanity.io',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'imageAlt',
    },
    {
      type: 'youtube',
    },
    {
      type: 'videoEmbed',
    },
  ],
};
