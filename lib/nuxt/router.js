import Router from 'vue-router';
import { isCacheUrl, patchNuxtRouter } from 'vue-router-webcache';

const cacheList = <%= JSON.stringify(options.cacheList) %>;
const cacheUrlGetter = <%= options.urlGetter.toString() %>;

export function createRouter(ssrContext, createDefaultRouter, routerOptions, config) {
  const defaultRouter = createDefaultRouter(ssrContext, config);
  const options = routerOptions || defaultRouter.options;

  if (process.server) return defaultRouter;

  const isCache = isCacheUrl(window.location.href, cacheList);

  if (!isCache) return defaultRouter;

  const mode = isCache
    ? 'abstract'
    : options.mode;
  const router = new Router({
    ...options,
    mode,
  });
  <% if (options.replacePush) { %>
  router.push = defaultRouter.push.bind(router);
  <% } %>
  const realUrl = cacheUrlGetter();

  patchNuxtRouter(router, realUrl);

  return router;
}
