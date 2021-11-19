import Vue from 'vue';
import VueRouter from 'vue-router';
import getRouter from 'vue-router-webcache';

import routes from './routes';

Vue.use(VueRouter);

const additionalCacheUrls = [
  {
    hostname: 'localhost',
    pathname: '/sub/search',
    getRealUrl(url) {
      const parsed = new URL(url);

      return parsed.searchParams.get('url');
    },
  },
];

const options = {
  routes,
  mode: 'history',
  base: '/sub',
};

export default getRouter(options, additionalCacheUrls);
