const path = require('path');

module.exports = {
  devServer: {
    host: 'localhost',
    port: 3007,
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue-router-webcache': path.resolve(__dirname, '../../..'),
        'vue$': 'vue3/dist/vue.esm-browser.prod.js',
        'vue-router$': 'vue-router4',
      },
    },
  },
};
