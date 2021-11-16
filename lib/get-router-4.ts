import { createRouter, RouterOptions, createMemoryHistory } from 'vue-router4';

import { getCache } from './utils';
import { defaultCacheUrls, CacheUrl } from './config';

export default (routerOptions: RouterOptions, additionalCacheList: CacheUrl[] = []) => {
  const cacheUrls = [
    ...defaultCacheUrls,
    ...additionalCacheList,
  ];
  const currentUrl = window.location.href;

  const cache = getCache(currentUrl, cacheUrls);

  if (!cache) return createRouter(routerOptions);

  const history = createMemoryHistory();

  const router = createRouter({
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
