import { NavIcon } from '../../src/components/icons';

export default {
  type: 'document',
  name: 'navigation',
  title: 'Navigation',
  icon: NavIcon,
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'navItem' }, { type: 'navSection' }],
    },
  ],
};
