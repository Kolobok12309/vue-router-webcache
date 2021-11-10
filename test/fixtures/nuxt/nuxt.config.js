export default {
  rootDir: __dirname,
  server: {
    port: 3000,
  },
  buildModules: [
    ['vue-router-webcache/nuxt', {
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
