const path = require('path');

module.exports = {
  devServer: {
    host: 'localhost',
    port: 3008,
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue-router-webcache': path.resolve(__dirname, '../../..'),
      },
    },
  },
};
