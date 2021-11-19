import Router from 'vue-router';

import { defaultCacheUrls } from './config';

export const getCache = (fullUrl: string, cacheList = defaultCacheUrls) => {
  const parsedUrl = new URL(fullUrl);

  const found = cacheList
    .find(({ hostname, pathname }) =>
      parsedUrl.hostname === hostname && parsedUrl.pathname === pathname
  );

  return found || null;
}

export const isCacheUrl = (fullUrl: string, cacheList = defaultCacheUrls) => {
  const cache = getCache(fullUrl, cacheList);

  return !!cache;
};

export const getRealUrl = (fullUrl: string, cacheList = defaultCacheUrls) => {
  const cache = getCache(fullUrl, cacheList);

  if (!cache || !cache.getRealUrl) return null;

  return cache.getRealUrl(fullUrl);
}

export const patchNuxtRouter = (router: Router, href: string) => {
  const origRouterResolve = router.resolve.bind(router);

  router.resolve = () => {
    router.resolve = origRouterResolve;
    return origRouterResolve(href);
  };
};

export const getFullPath = (fullUrl: string, base = '/') => {
  const parsed = new URL(fullUrl);

  let fullPath = parsed.pathname + parsed.search + parsed.hash;

  if (fullPath.startsWith(base)) fullPath = fullPath.replace(base, '');
  if (!fullPath.startsWith('/')) fullPath = '/' + fullPath;

  return fullPath;
};
