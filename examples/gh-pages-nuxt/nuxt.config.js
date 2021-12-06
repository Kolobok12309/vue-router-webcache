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
};
