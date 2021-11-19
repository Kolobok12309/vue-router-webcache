import Router, { RouterOptions } from 'vue-router';

import { getCache, getFullPath } from './utils';
import { defaultCacheUrls, CacheUrl } from './config';

export default (routerOptions: RouterOptions, additionalCacheList: CacheUrl[] = []) => {
  const cacheUrls = [
    ...defaultCacheUrls,
    ...additionalCacheList,
  ];
  const currentUrl = window.location.href;

  const cache = getCache(currentUrl, cacheUrls);

  if (!cache) return new Router(routerOptions);

  const router = new Router({
    ...routerOptions,
    mode: 'abstract',
  });

  const realUrl = cache.getRealUrl?.(currentUrl);

  if (realUrl) {
    const realFullPath = getFullPath(realUrl, routerOptions.base);

    router.replace(realFullPath);
  }

  return router;
};
