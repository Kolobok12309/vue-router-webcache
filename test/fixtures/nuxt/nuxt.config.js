export default {
  rootDir: __dirname,
  buildModules: [
    ['vue-router-webcache/dist/nuxt', {
      cacheList: [{
        hostname: 'localhost',
        pathname: '/search',
      }],
    }],
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/search': {
      target: 'http://localhost:3000',
      pathRewrite: () => '/test',
    },
  },
};
