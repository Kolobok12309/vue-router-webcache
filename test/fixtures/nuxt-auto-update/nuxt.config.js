export default {
  rootDir: __dirname,
  server: {
    port: 3008,
  },
  buildModules: [
    'vue-router-webcache/dist/nuxt',
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
  ],
};
