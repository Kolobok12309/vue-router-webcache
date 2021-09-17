import path from 'path';

export default {
  rootDir: __dirname,
  buildModules: [
    ['../../../lib/nuxt/index.ts', {
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
