import * as VueRouter from 'vue-router';

import { getCache } from './utils';
import { defaultCacheUrls, CacheUrl } from './config';

export default (routerOptions: VueRouter.RouterOptions, additionalCacheList: CacheUrl[] = []) => {
  const cacheUrls = [
    ...defaultCacheUrls,
    ...additionalCacheList,
  ];
  const currentUrl = window.location.href;

  const cache = getCache(currentUrl, cacheUrls);

  if (!cache) return (VueRouter as any).createRouter(routerOptions);

  const history = (VueRouter as any).createMemoryHistory();

  const router = (VueRouter as any).createRouter({
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
