// AUTO UPDATE VUE-ROUTER-WEBCACHE FLAG
// Remove this strings if you manually change file
import Router from 'vue-router';
import { getCache, patchNuxtRouter, getFullPath } from 'vue-router-webcache';

const cacheList = [
  
  {
    hostname: 'yandexwebcache.net',
    pathname: '/yandbtm',
    getRealUrl: function (url) {
    var parsed = new URL(url);
    return parsed.searchParams.get('url');
  },
  },
  
  {
    hostname: 'webcache.googleusercontent.com',
    pathname: '/search',
    getRealUrl: function (url) {
    var parsed = new URL(url);
    var q = parsed.searchParams.get('q');
    var matched = q.match(googleRegex);
    if (!matched) throw new Error("Can't extract realUrl from \"" + url + "\"");
    var extracted = matched[1].trim();
    if (!extracted.startsWith('https://')) return "http://" + extracted;
    return extracted;
  },
  },
  
  {
    hostname: 'my-second-random-host',
    pathname: '/search',
    getRealUrl: () => 'http://my-second-random-host:3008/test',
  },
  
];
const cacheUrlGetter = function () {
    if (!window.__NUXT__) return '/';
    var _a = (window.__NUXT__.state.route || {}).fullPath,
        fullPath = _a === void 0 ? '/' : _a;
    return fullPath;
  };

export function createRouter(ssrContext, createDefaultRouter, routerOptions, config) {
  const defaultRouter = createDefaultRouter(ssrContext, config);
  const options = routerOptions || defaultRouter.options;

  if (process.server) return defaultRouter;

  const cache = getCache(window.location.href, cacheList);

  if (!cache) return defaultRouter;

  const router = new Router({
    ...options,
    mode: 'abstract',
  });
  
  router.push = defaultRouter.push.bind(router);
  
  
  const realUrl = cache.getRealUrl?.(window.location.href);
  let realFullPath;

  if (realUrl) {
    realFullPath = getFullPath(realUrl, options.base);
  }

  if (!realFullPath) realFullPath = cacheUrlGetter();
  

  patchNuxtRouter(router, realFullPath);

  return router;
}
