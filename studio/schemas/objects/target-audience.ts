export default {
  name: 'targetAudience',
  title: 'Target audience',
  type: 'object',
  options: {
    columns: '2',
  },
  fields: [
    {
      name: 'editor',
      title: 'Content Editor',
      type: 'boolean',
      initialValue: () => true,
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'developer',
      title: 'Developer',
      type: 'boolean',
      initialValue: () => false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
};
