// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './objects/block-content';
import category from './documents/category';
import author from './documents/author';
import page from './documents/page';
import cta from './objects/sections/cta/cta';
import form from './objects/form';
import hero from './objects/sections/hero';
import imageGallery from './objects/image-gallery';
import textWithIllustration from './objects/text-with-illustration';
import video from './objects/video';
import imageAlt from './objects/image-alt';
import navigation from './documents/navigation';
import siteSettings from './documents/site-settings';
import { videoEmbed } from './objects/embeds';
import link from './objects/link';
import localeString from './objects/locale-string';
import openGraph from './objects/open-graph';
import simpleBlockContent from './objects/simple-block-content';
import variation from './objects/variation';
import infoRows from './plugs/info-rows';
import navItem from './objects/nav-item';
import pageBuilderColumn from './objects/page-builder-column';
import pageBuilderColumns from './objects/page-builder-columns';
import bodyContent from './objects/body-content';
import globalSiteLayout from './documents/global-site-layout';
import footer from './objects/footer';
import header from './objects/header';
import pageSettings from './objects/page-settings';
import background from './objects/background';
import navItemAction from './objects/nav-item-action';
import section from './objects/section';
import sectionHeading from './objects/section-heading';
import blurb from './objects/blurb';
import latestStories from './objects/latest-stories';
import ctaButton from './objects/sections/cta/cta-button';
import listing from './objects/sections/listing';
import pageNav from './objects/sections/page-nav';
import text from './objects/sections/text';
import icon from './objects/icon';
import redirect from './documents/redirect';
import navSection from './objects/nav-section';
import cookieConsent from './objects/cookie-consent';
import cookiePreference from './objects/cookie-preference';
import cookieDetails from './objects/cookie-details';
import teamSection from './objects/sections/team-section';
import teamMember from './objects/team-member';
import podcastSection from './objects/sections/podcast-section';
import youtube from './objects/youtube';
import banner from './objects/banner';
import user from './documents/user';
import targetAudience from './objects/target-audience';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    author,
    category,
    navigation,
    page,
    siteSettings,
    globalSiteLayout,
    redirect,
    user,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    background,
    blockContent,
    blurb,
    cta,
    ctaButton,
    cookieConsent,
    cookiePreference,
    cookieDetails,
    listing,
    pageNav,
    text,
    icon,
    videoEmbed,
    form,
    hero,
    imageAlt,
    imageGallery,
    link,
    localeString,
    openGraph,
    simpleBlockContent,
    textWithIllustration,
    variation,
    video,
    navItem,
    navSection,
    navItemAction,
    pageBuilderColumn,
    pageBuilderColumns,
    pageSettings,
    bodyContent,
    footer,
    header,
    section,
    sectionHeading,
    latestStories,
    teamSection,
    teamMember,
    podcastSection,
    youtube,
    banner,
    targetAudience,
    // plugs
    infoRows,
  ]),
});
