import { FcGlobe } from 'react-icons/fc';
import Tabs from 'sanity-plugin-tabs';

export default {
  name: 'globalSiteLayout',
  title: 'Global Site Layout',
  type: 'document',
  icon: FcGlobe,
  fields: [
    {
      name: 'tabs',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'header', title: 'Header', options: { sortOrder: 10 } },
        { name: 'footer', title: 'Footer', options: { sortOrder: 20 } },
        { name: 'banner', title: 'Banner', options: { sortOrder: 30 } },
      ],
      fields: [
        {
          name: 'header',
          title: 'Header',
          type: 'header',
          fieldset: 'header',
        },
        {
          name: 'footer',
          title: 'Footer',
          type: 'footer',
          fieldset: 'footer',
        },
        {
          name: 'banner',
          title: 'Banner',
          type: 'banner',
          fieldset: 'banner',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Layout Settings (changes require rebuild)',
      };
    },
  },
};
