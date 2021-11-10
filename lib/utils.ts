import Router from 'vue-router';

import { defaultCacheUrls } from './config';

export const isCacheUrl = (fullUrl: string, cacheList = defaultCacheUrls) => {
  const parsedUrl = new URL(fullUrl);

  return cacheList
    .some(({ hostname, pathname }) =>
      parsedUrl.hostname === hostname && parsedUrl.pathname === pathname
    );
};

export const patchNuxtRouter = (router: Router, href: string) => {
  const origRouterResolve = router.resolve.bind(router);

  router.resolve = () => {
    router.resolve = origRouterResolve;
    return origRouterResolve(href);
  };
};
