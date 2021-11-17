import Vue from 'vue';
import VueRouter from 'vue-router';
import { defaultCacheUrls, getCache } from 'vue-router-webcache';

import routes from './routes';

Vue.use(VueRouter);

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
  mode: 'history',
};

const getRouter = () => {
  const cacheUrls = [
    ...defaultCacheUrls,
    ...additionalCacheUrls,
  ];
  const currentUrl = window.location.href;

  const cache = getCache(currentUrl, cacheUrls);

  if (!cache) return new VueRouter(options);

  const router = new VueRouter({
    ...options,
    mode: 'abstract',
  });

  const realUrl = cache.getRealUrl(currentUrl);

  if (realUrl) {
    const parsed = new URL(realUrl);
    const realFullPath = parsed.pathname + parsed.search + parsed.hash;

    router.replace(realFullPath);
  }

  return router;
};

export default getRouter();
