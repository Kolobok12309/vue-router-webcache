import { createWebHistory } from 'vue-router';
import getRouter from 'vue-router-webcache';

import routes from './routes';

const additionalCacheUrls = [
  {
    hostname: 'localhost',
    pathname: '/search',
    getRealUrl(url) {
      const parsed = new URL(url);

      return parsed.searchParams.get('url');
    },
  },
];

const options = {
  routes,
  history: createWebHistory(),
};

export default getRouter(options, additionalCacheUrls);
