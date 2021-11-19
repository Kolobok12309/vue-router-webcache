import { createWebHistory } from 'vue-router';
import getRouter from 'vue-router-webcache';

import routes from './routes';

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
  history: createWebHistory('/sub'),
};

export default getRouter(options, additionalCacheUrls);
