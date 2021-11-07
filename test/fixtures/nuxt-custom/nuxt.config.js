export default {
  rootDir: __dirname,
  server: {
    port: 3001,
  },
  buildModules: [
    'nuxt-vuex-router-sync',
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/search': {
      target: 'http://localhost:3001',
      pathRewrite: () => '/test',
    },
  },
};
