import Router from 'vue-router';
import { isCacheUrl, patchNuxtRouter } from 'vue-router-webcache';

const cacheList = [
  {
    hostname: 'localhost',
    pathname: '/search',
  }
];

const getRealUrl = () => {
  if (!window.__NUXT__) return '/';

  // Example with module `nuxt-vuex-router-sync`
  const { fullPath = '/' } = window.__NUXT__.state.route;

  return fullPath;
};

export function createRouter(ssrContext, createDefaultRouter, routerOptions, config) {
  const defaultRouter = createDefaultRouter(ssrContext, config);
  const options = routerOptions || defaultRouter.options;

  // Here we can change options or do something else

  if (process.server) return defaultRouter;

  const isCache = isCacheUrl(window.location.href, cacheList);

  if (!isCache) return defaultRouter;

  const router = new Router({
    ...options,
    mode: 'abstract',
  });

  patchNuxtRouter(router, getRealUrl());

  return router;
};

