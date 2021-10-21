import { FcOpenedFolder } from 'react-icons/fc';

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FcOpenedFolder,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
