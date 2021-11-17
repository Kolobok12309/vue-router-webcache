import path from 'path';
import type { Module } from '@nuxt/types';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import defu from 'defu';
import lodashTemplate from 'lodash.template';

import { defaultCacheUrls, CacheUrl } from '../config';

const logger = require('consola').withScope('vue-router-webcache');

interface ModuleOptions {
  cacheList?: CacheUrl[];
  replacePush?: boolean;
  urlGetter?: () => string;
  forceVuexRouterSync?: boolean;
};

const defaultOptions: ModuleOptions = {
  cacheList: defaultCacheUrls,
  replacePush: true,
  urlGetter: function() {
    if (!(window as any).__NUXT__) return '/';

    const { fullPath = '/' } = (window as any).__NUXT__.state.route || {};

    return fullPath;
  },
  forceVuexRouterSync: false,
};

const nuxtModule: Module<ModuleOptions> = function (moduleOptions) {
  const options: ModuleOptions = defu(
    this.options.webcache,
    moduleOptions,
    defaultOptions,
  );
  const isAllCachesHasGetters = options.cacheList
    .every(({ getRealUrl }) => getRealUrl);
  const isDefaultUrlGetter = options.urlGetter === defaultOptions.urlGetter;

  if (!isAllCachesHasGetters && isDefaultUrlGetter) {
    logger.warn('Not all caches have a "getRealUrl" function, adding "nuxt-vuex-router-sync"');

    options.forceVuexRouterSync = true;
  }

  if (options.forceVuexRouterSync) {
    options.urlGetter = defaultOptions.urlGetter;

    this.requireModule('nuxt-vuex-router-sync');
  }

  const routerFile = path.join(this.options.srcDir, 'router.js');
  if (!existsSync(routerFile)) {
    logger.info(`Creating new router configuration in ${this.options.srcDir}`)

    const template = readFileSync(path.resolve(__dirname, 'router.js'), { encoding: 'utf-8' });
    const compiled = lodashTemplate(template);
    writeFileSync(routerFile, compiled({ options }));
  }
}

export default nuxtModule;

module.exports.meta = require('../../package.json');
