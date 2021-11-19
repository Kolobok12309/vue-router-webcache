export default {
  rootDir: __dirname,
  server: {
    port: 3006,
  },
  buildModules: [
    ['vue-router-webcache/dist/nuxt', {
      cacheList: [{
        hostname: 'localhost',
        pathname: '/sub/search',
        getRealUrl: () => 'http://localhost:3006/sub/test',
      }],
    }],
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/sub/search': {
      target: 'http://localhost:3006',
      pathRewrite: () => '/sub/test',
    },
  },
  router: {
    base: '/sub',
  },
};
