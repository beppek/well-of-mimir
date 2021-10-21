import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import groq from 'groq';

import config from 'config';

const options = {
  dataset: config.cms.dataset,
  projectId: config.cms.projectId,
  useCdn: false,
  apiVersion: '2021-05-21',
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(options);
export const imageBuilder = sanityImage(client);

export const getUrlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format');

const blockContentFields = `
...,
_type == "imageAlt" => {
  ...,
  asset->,
},
markDefs[]{
  ...,
  linkType == "internal" => {

    "href": select(
      defined(anchorLink) => page->slug.current + anchorLink,
       page->slug.current
    )
  },
  _type == "internalLink" => {
    "slug": @.reference->slug,
  }
}
`;

const linkFields = `
'link': navItemAction{
  ...,
  'id': page->_id,
  "href": select(
    defined(anchorLink) => page->slug.current + anchorLink,
    linkType == "internal" && page->slug.current == 'index' => '/',
    linkType == "internal" => page->slug.current,
    href
  ),
},
subItems[]{
  'link': navItemAction{
    'id': page->_id,
    "href": select(
      defined(anchorLink) => page->slug.current + anchorLink,
      linkType == "internal" && page->slug.current == 'index' => '/',
      linkType == "internal" => page->slug.current,
      href
    ),
  },
  text,
  _key,
}
`;

const navFields = `
  text,
  _key,
  'kind': navItemAction.kind,
  style,
  'icon': icon{
    alt,
    asset->{...}
  },
  'triggerFunction': navItemAction.triggerFunction,
  ${linkFields}
`;

const navItems = `
items[]{
  ${navFields}
}
`;

const pageFields = `
  ...,
  targetAudience{
    editor,
    developer,
  },
  content[]{
    ${blockContentFields}
  }
`;

export async function fetchPage({ slug }: { slug: string }) {
  const query = groq`
    *[_type == 'page' && slug.current == $slug && !(_id in path("drafts.**"))] {
      ${pageFields}
    }
  `;
  const data = await client.fetch(query, { slug });
  console.log('data :>> ', data);
  return data[0];
}

export async function fetchAllPageSlugs() {
  const query = groq`
    *[_type == 'page' && slug.current != 'index' && !(_id in path("drafts.**"))] {
      'slug': slug.current
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export async function fetchLayout() {
  const query = groq`
    *[_id == "globalSiteLayout"][0]{
      ...,
      'id': _id,
      'header': tabs.header{
        ...,
        primaryNav->{
          items[]{
            _type,
            title,
            ${navFields}
          }
        },
        
        'logo': logo{
          ...,
          'asset': asset->{...}
        }
      },

      'footer': tabs.footer{
        ...,
        'logo': logo{
          ...,
          'asset': asset->{...}
        },
        nav->{
          items[]{
            _type,
            title,
            ${navFields},
            ${navItems},
          },
        }
      },

      'banner': tabs.banner{
        ...
      },
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export async function verifyUser({ email }: { email: string }) {
  const query = groq`
    *[_type == 'user' && email == $email][0] {
      email,
      name,
    }
  `;
  const data = await client.fetch(query, { email });
  return data;
}

export async function fetchUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const query = groq`
    *[_type == 'user' && email == $email && password == $password][0] {
      email,
      name,
    }
  `;
  const data = await client.fetch(query, { email, password });
  return data;
}
