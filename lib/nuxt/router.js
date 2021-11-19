import Router from 'vue-router';
import { getCache, patchNuxtRouter, getFullPath } from 'vue-router-webcache';

const cacheList = [
  <% options.cacheList.forEach((cache) => { %>
  {
    hostname: '<%= cache.hostname %>',
    pathname: '<%= cache.pathname %>',
    getRealUrl: <%= cache.getRealUrl ? cache.getRealUrl.toString() : null %>,
  },
  <% }); %>
];
const cacheUrlGetter = <%= options.urlGetter.toString() %>;

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
  <% if (options.replacePush) { %>
  router.push = defaultRouter.push.bind(router);
  <% } %>
  <% if (options.forceVuexRouterSync) { %>
  const realFullPath = cacheUrlGetter();
  <% } else { %>
  const realUrl = cache.getRealUrl?.(window.location.href);
  let realFullPath;

  if (realUrl) {
    realFullPath = getFullPath(realUrl, options.base);
  }

  if (!realFullPath) realFullPath = cacheUrlGetter();
  <% } %>

  patchNuxtRouter(router, realFullPath);

  return router;
}
