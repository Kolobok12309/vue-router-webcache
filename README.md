# Vue-router-webcache
[![npm](https://img.shields.io/npm/v/vue-router-webcache)](https://www.npmjs.com/package/vue-router-webcache)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/kolobok12309/vue-router-webcache/Jest%20tests?label=tests)](https://github.com/Kolobok12309/vue-router-webcache/actions/workflows/tests.yml)
[![npm](https://img.shields.io/npm/dw/vue-router-webcache)](https://www.npmjs.com/package/vue-router-webcache)
[![license](https://img.shields.io/npm/l/vue-router-webcache)](https://github.com/Kolobok12309/vue-router-webcache/blob/master/LICENSE)

> A set of helpers for `vue-router` to working with google webcache and similar

## Table of Contents
- [Install](#install)
- [Nuxt basic usage](#nuxt-basic-usage)
- [Nuxt advanced usage](#nuxt-advanced-usage)
- [Vue-router usage](#vue-router-usage)
- [Api](#api)
- [How it work](#how-it-work)
- [URL](#url)

## Install
```
yarn add vue-router-webcache # npm i vue-router-webcache
```

## Nuxt basic usage
1. Install package
2. Install `@nuxtjs/router`
3. Add `vue-router-webcache` and `@nuxtjs/router` to `nuxt.config.js`
```js
export default {
  buildModules: [
    'vue-router-webcache/dist/nuxt',
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
  ]
};
```
After first build package create `router.js` in root of project nuxt-community/router-module#107

By default `vue-router-webcache` use `nuxt-vuex-router-sync` to get real url

Example in [test/fixtures/nuxt](https://github.com/Kolobok12309/vue-router-webcache/tree/master/test/fixtures/nuxt)

## Nuxt advanced usage
If you use custom router or you need more caches, you can customize options or use only helpers without module
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
`cacheList` - list of caches, checks work through `URL`

`replacePush` - default `@nuxtjs/router` replace `router.push`, you can disable it

`urlGetter` - function that return `fullPath` or current real url, serialized by `Function.toString`, exec in browser

---

Default `vue-router-webcache` nuxt-module [config](https://github.com/Kolobok12309/vue-router-webcache/blob/master/lib/nuxt/index.ts#L17-L27)

Full example in [test/fixtures/nuxt-custom](https://github.com/Kolobok12309/vue-router-webcache/tree/master/test/fixtures/nuxt-custom)

If you don't change `urlGetter`, `vue-router-webcache` add `nuxt-vuex-router-sync` module to save `realUrl` in `store.state`

## Vue-router usage
1. Install package
2. Create `Router` by helper
```js
import createRouter from 'vue-router-webcache';

const router = createRouter(routerOptions);
```
3. Get and set real url
```js
router.replace(realUrl);
```

For example while `NuxtJs` used, we can get route from context state, with `nuxt-vuex-router-sync` it `window.__NUXT__.state.route.fullPath`

## How it work
- Check if `window.location.href` is url of some caches
- Change mode of router to `abstract`
- Get real url of cached page
  - Nuxt, add `nuxt-vuex-router-sync`(or analogs) and get `window.__NUXT__.state.route.fullPath`
  - Vue, get url from window.location.query for example
- After `Router` created, set current route
  - Nuxt, mock first `router.resolve` call [patchNuxtRouter](https://github.com/Kolobok12309/vue-router-webcache/blob/c289d3d77ae917c70f81f898a3e018ae3da10894/lib/utils.ts#L15-L22)
  - Call `router.replace(realUrl)`

## Api
### createRouter

> Helper that create `vue-router` instance with `routerOptions`, but change mode to `abstract` if page in caches list

```js
import createRouter from 'vue-router-webcache';

const router = createRouter(routerOptions, [
  {
    hostname: '',
    pathname: '',
  },
]);
```
`routerOptions` - simple `vue-router` options

`additionalCacheList` - caches that will be added to the defaults (optional)

### defaultCacheUrls

> Array of default cache urls

```js
import { defaultCacheUrls } from 'vue-router-webcache';
```

### isCacheUrl

> Url checker

```js
import { isCacheUrl } from 'vue-router-webcache';

const isCache = isCacheUrl(window.location.href, [
  {
    hostname: '',
    pathname: '',
  },
]);
```

`fullUrl` - url of checked page

`cacheList` - list of caches to check (optional)

### patchNuxtRouter

> Router patcher for nuxt, mock first `router.resolve`

```js
import { patchNuxtRouter } from 'vue-router-webcache';

...

patchNuxtRouter(router, realUrl);
```

`router` - instance of `vue-router`
`href` - real url of current page

## URL
Util `isCacheUrl` use `URL` constructor to parse url's. Mb you need install polyfill to use it.
