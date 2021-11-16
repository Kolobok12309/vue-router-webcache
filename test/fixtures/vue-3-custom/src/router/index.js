import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
import { defaultCacheUrls, getCache } from 'vue-router-webcache';

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

const getRouter = () => {
  const cacheUrls = [
    ...defaultCacheUrls,
    ...additionalCacheUrls,
  ];
  const currentUrl = window.location.href;

  const cache = getCache(currentUrl, cacheUrls);

  if (!cache) return createRouter(options);

  const history = createMemoryHistory();

  const router = createRouter({
    ...options,
    history,
  });

  const realUrl = cache.getRealUrl(currentUrl);

  if (realUrl) {
    const parsed = new URL(realUrl);
    const realFullPath = parsed.pathname + parsed.search + parsed.hash;

    history.replace(realFullPath);
  }

  return router;
};

export default getRouter();
