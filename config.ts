const config = {
  site: {
    title: 'Well of Mimir',
  },
  cookies: {
    authSession: {
      name: 'well_of_mimir_auth',
    },
  },
  cms: {
    dataset: 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  },
};

export default config;
