import * as VueRouter from 'vue-router';
import type { RouterOptions, createRouter, createMemoryHistory } from 'vue-router4';

import { getCache } from './utils';
import { defaultCacheUrls, CacheUrl } from './config';

export default (routerOptions: RouterOptions, additionalCacheList: CacheUrl[] = []) => {
  const cacheUrls = [
    ...defaultCacheUrls,
    ...additionalCacheList,
  ];
  const currentUrl = window.location.href;

  const cache = getCache(currentUrl, cacheUrls);

  if (!cache) return ((VueRouter as any).createRouter as typeof createRouter)(routerOptions);

  const history = ((VueRouter as any).createMemoryHistory as typeof createMemoryHistory)();

  const router = ((VueRouter as any).createRouter as typeof createRouter)({
    ...routerOptions,
    history,
  });

  const realUrl = cache.getRealUrl(currentUrl);

  if (realUrl) {
    const parsed = new URL(realUrl);
    const realFullPath = parsed.pathname + parsed.search + parsed.hash;

    history.replace(realFullPath);
  }

  return router;
}
