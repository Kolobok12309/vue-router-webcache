export default {
  rootDir: __dirname,
  server: {
    port: 3000,
  },
  buildModules: [
    ['vue-router-webcache/dist/nuxt', {
      cacheList: [
        {
          hostname: 'localhost',
          pathname: '/search',
          getRealUrl: () => 'http://localhost:3000/test',
        },
        {
          hostname: 'example.com',
          pathname: '/dsfdsf/sdfdfsfd',
          getRealUrl: () => 'http://example.com',
        },
      ],
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
