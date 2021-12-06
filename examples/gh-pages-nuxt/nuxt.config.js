export default {
  rootDir: __dirname,
  target: 'static',
  buildModules: [
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
    '@nuxtjs/proxy',
  ],
  router: {
    base: process.env.NUXT_ENV_BASE_PATH || '/',
  },
  proxy: {
    '/search': {
      target: 'http://localhost:3000',
      pathRewrite: () => '/about',
    },
  },
  head: {
    title: 'Vue-router-webcache example',
    meta: [
      {
        hid: 'charset',
        charset: 'utf-8',
      },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Vue-router-webcache example of package working and an example of a bug that this package fixes',
      },
      process.env.NUXT_ENV_GOOGLE_VERIFICATION
        ? {
            hid: 'google-site-verification',
            name: 'google-site-verification',
            content: process.env.NUXT_ENV_GOOGLE_VERIFICATION,
          }
        : {},
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
        integrity: 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh',
        crossorigin: 'anonymous',
      },
    ],
  },
};
