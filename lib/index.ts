import Router, { RouterOptions } from 'vue-router';

import { isCacheUrl } from './utils';
import { defaultCacheUrls, CacheUrl } from './config';

export * from './utils';
export {
  defaultCacheUrls,
};

export default (routerOptions: RouterOptions, additionalCacheList: CacheUrl[] = []) => {
  const cacheList = [
    ...defaultCacheUrls,
    ...additionalCacheList,
  ];

  const isCache = isCacheUrl(window.location.href, cacheList);
  const mode = isCache
    ? 'abstract'
    : routerOptions.mode;

  return new Router({
    ...routerOptions,
    mode,
  });
};
