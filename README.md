# Vue-router-webcache
## Description
It is package that help you make the webcache(yandex cache and other) work. Tested with `NuxtJS`.

## How it work
- Check if `window.location.href` is url of some cache
- Change mode of router to `abstract`
- Get real url of cached page
  - Nuxt, add `nuxt-vuex-router-sync`(or analogs) and get `window.__NUXT__.state.route.fullPath`
  - Vue, get url from window.location.query for example
- After `router` creating set current route
  - Nuxt, mock first `router.resolve` call [patchNuxtRouter](https://github.com/Kolobok12309/vue-router-webcache/blob/c289d3d77ae917c70f81f898a3e018ae3da10894/lib/utils.ts#L15-L22)
  - Call `router.replace(realUrl)`

## Install
```
yarn add vue-router-webcache # or npm i vue-router-webcache
```

## Api

`vueRouterWebcache` - default export is router factory with arguments: `routerOptions` and `additionalCacheList`

`defaultCacheUrls` - Array of default cache urls

`isCacheUrl` - Url checker

`patchNuxtRouter` - Router patcher for nuxt, mock first `router.resolve`

## Nuxt usage
1. Install package
2. Install `@nuxtjs/router`
3. Configure `vue-router-webcache` and `@nuxtjs/router` in `nuxt.config.js`
```js
export default {
  buildModules: [
    ['vue-router-webcache/dist/nuxt', {
      cacheList: [{
        hostname: '',
        pathname: '',
      }],
      replacePush: true,
      urlGetter: () => '',
    }],
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
  ]
};
```
Default `vue-router-webcache` [config](https://github.com/Kolobok12309/vue-router-webcache/blob/master/lib/nuxt/index.ts#L17-L27)

Full Nuxt example in [test/fixtures/nuxt](https://github.com/Kolobok12309/vue-router-webcache/tree/master/test/fixtures/nuxt)

If you don't change `urlGetter`, `vue-router-webcache` add `nuxt-vuex-router-sync` module to save `realUrl` in `store.state`

## Vue usage
1. Install package
2. Check for cache
```js
import { isCacheUrl } from 'vue-router-webcache';

const isCache = isCacheUrl(window.location.href);
```
3. If is cache create router
```js
import createRouter from 'vue-router-webcache';

const router = createRouter(routerOptions);
```
4. Get and set real url, for example from context state, for nuxt with `nuxt-vuex-router-sync` it `window.__NUXT__.state.route.fullPath`
```js
router.replace(realUrl);
```
