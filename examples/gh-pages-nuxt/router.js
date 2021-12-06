import Router from 'vue-router';
import { getCache, patchNuxtRouter, getFullPath, defaultCacheUrls } from '../../dist';

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

const cacheUrls = process.env.NODE_ENV === 'production'
  ? defaultCacheUrls
  : [...defaultCacheUrls, ...additionalCacheUrls];

export function createRouter(ssrContext, createDefaultRouter, routerOptions, config) {
  const defaultRouter = createDefaultRouter(ssrContext, config);
  const options = routerOptions || defaultRouter.options;

  if (process.server) return defaultRouter;

  const cache = getCache(window.location.href, cacheUrls);

  if (!cache) return defaultRouter;

  const router = new Router({
    ...options,
    mode: 'abstract',
  });

  const realUrl = cache.getRealUrl(window.location.href);
  const realFullPath = realUrl
    ? getFullPath(realUrl, options.base)
    : '/';

  patchNuxtRouter(router, realFullPath);

  router.cache = cache;
  router.isCache = true;

  return router;
};
