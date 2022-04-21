# Vue-router-webcache
[![npm](https://img.shields.io/npm/v/vue-router-webcache)](https://www.npmjs.com/package/vue-router-webcache)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/kolobok12309/vue-router-webcache/Jest%20tests?label=tests)](https://github.com/Kolobok12309/vue-router-webcache/actions/workflows/tests.yml)
[![npm](https://img.shields.io/npm/dw/vue-router-webcache)](https://www.npmjs.com/package/vue-router-webcache)
[![GH Pages](https://img.shields.io/github/deployments/kolobok12309/vue-router-webcache/github-pages?label=GH%20Pages)](https://kolobok12309.github.io/vue-router-webcache)
[![license](https://img.shields.io/npm/l/vue-router-webcache)](https://github.com/Kolobok12309/vue-router-webcache/blob/master/LICENSE)

> A set of helpers for `vue-router` to working with google webcache and similar

## Table of Contents
- [Install](#install)
- [Compatibility caches](#compatibility-caches)
- [Compatibility Vue](#compatibility-vue)
- [Nuxt basic usage](#nuxt-basic-usage)
- [Nuxt advanced usage](#nuxt-advanced-usage)
- [Vue-router usage](#vue-router-usage)
- [Api](#api)
- [How it work](#how-it-work)
- [Examples](#examples)
- [URL](#url)

## Install
```
yarn add vue-router-webcache # npm i vue-router-webcache
```

## Compatibility caches
From the box this package support https://webcache.googleusercontent.com/ and https://yandexwebcache.net caches for SPA/SSR. If you need more cache types, you always can reassign the `cacheList` by add cache to any of helpers as second arg.
```js
import { isCacheUrl, defaultCacheUrls } from 'vue-router-webcache';

const additionalCacheUrls = [
  {
    hostname: 'localhost',
    pathname: '/search',
    getRealUrl: (url) => url,
  },
];

const isCache = isCacheUrl(window.location.href, [
  ...defaultCacheUrls,
  ...additionalCacheUrls,
]);
```

`getRealUrl` - is optional prop, to extract `realUrl` for SPA apps or for SSR without `vuex-router-sync`.

[Example of cache](lib/config.ts#L10)

## Compatibility Vue
Current package support Vue 2 (`vue-router@3`) and Vue 3 (`vue-router@4`).

## Nuxt basic usage
1. Install package
2. Install `@nuxtjs/router`
3. Add `vue-router-webcache/nuxt` and `@nuxtjs/router` to `nuxt.config.js`
4. Add `router.js` to `.gitignore`
```js
export default {
  buildModules: [
    'vue-router-webcache/nuxt',
    ['@nuxtjs/router', {
      keepDefaultRouter: true,
    }],
  ]
};
```
After first build, package create `router.js` in root of project nuxt-community/router-module#107

> If you change generated `router.js`, don't forget remove first two lines

By default `vue-router-webcache/nuxt` use `nuxt-vuex-router-sync` to get real url

Example in [test/fixtures/nuxt](https://github.com/Kolobok12309/vue-router-webcache/tree/master/test/fixtures/nuxt)

## Nuxt advanced usage
If you use custom router or you need more caches, you can customize options or use only helpers without module
```js
export default {
  buildModules: [
    ['vue-router-webcache/nuxt', {
      cacheList: [{
        hostname: '',
        pathname: '',
        getRealUrl: (url) => url,
      }],
      replacePush: true,
      forceVuexRouterSync: false,
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

`forceVuexRouterSync` - option to force add module `nuxt-vuex-router-sync` and use `urlGetter` for it. Can be enabled automatically if some of cache's in `cacheList` hasn't `getRealUrl` and you don't reassign `urlGetter`

---

Default `vue-router-webcache/nuxt` [config](https://github.com/Kolobok12309/vue-router-webcache/blob/master/lib/nuxt/index.ts#L17-L27)

Full example in [test/fixtures/nuxt-custom](https://github.com/Kolobok12309/vue-router-webcache/tree/master/test/fixtures/nuxt-custom)

If you don't change `urlGetter`, but add some cache without `getRealUrl`, `vue-router-webcache/nuxt` add `nuxt-vuex-router-sync` module to save `realUrl` in `store.state`

## Vue-router usage
1. Install package
2. Create `Router` by helper
```js
import createRouter from 'vue-router-webcache';

const router = createRouter(routerOptions);
```

## How it work
- Check if `window.location.href` is url of some caches
- Change mode of router to `abstract`
- Get real url of cached page
  - Nuxt, add `nuxt-vuex-router-sync` (or analogs) and get `window.__NUXT__.state.route.fullPath`
  - Vue, get url from window.location.query for [example](lib/config.ts#L13)
- After `Router` created, set current route
  - Nuxt, mock first `router.resolve` call [patchNuxtRouter](lib/utils.ts#L30-L37)
  - Call `router.replace(realUrl)`

## Api
### createRouter

> Helper that create `vue-router` instance with `routerOptions`, but change mode to `abstract` and call `router.replace` if page in caches list

```js
import createRouter from 'vue-router-webcache';

const router = createRouter(routerOptions, [
  {
    hostname: '',
    pathname: '',
    getRealUrl: (url) => url,
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

### getCache

> Get cache by fullUrl

```js
import { getCache } from 'vue-router-webcache';

const cache = getCache(window.location.href, [
  {
    hostname: '',
    pathname: '',
    getRealUrl: (url) => url,
  },
]);
```

`fullUrl` - url of checked page

`cacheList` - list of caches to check (optional)

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

### getRealUrl

> Helper trying to get realUrl from cached url (use `getRealUrl` functions from `cacheList`)

```js
import { getRealUrl } from 'vue-router-webcache';

const realUrl = getRealUrl(window.location.href, [
  {
    hostname: '',
    pathname: '',
    getRealUrl: (url) => url,
  },
]);
```

`fullUrl` - url of checked page

`cacheList` - list of caches to check (optional)

### getFullPath

> Helper extract `fullPath` from realUrl and cut `base`(second argument)

```js
import { getFullPath } from 'vue-router-webcache';

const fullPath = getFullPath('http://example.com/foo/bar', '/foo');
// /bar
```

`fullUrl` - url for extracting

`base` - base url of your app (default=`/`)

### patchNuxtRouter

> Router patcher for nuxt, mock first `router.resolve`

```js
import { patchNuxtRouter } from 'vue-router-webcache';

...

patchNuxtRouter(router, realUrl);
```

`router` - instance of `vue-router`
`href` - real url of current page

## Examples
All usage examples you can see in [test/fixtures](test/fixtures)

[GH Pages example](https://kolobok12309.github.io/vue-router-webcache/)

## URL
Helpers use `URL` constructor to parse url's. Mb you need install polyfill to use it.
