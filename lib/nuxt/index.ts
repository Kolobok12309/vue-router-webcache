import { resolve } from 'path';
import type { Module } from '@nuxt/types';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import defu from 'defu';
import lodashTemplate from 'lodash.template';

import { defaultCacheUrls, CacheUrl } from '../config';
import { AUTO_UPDATE_FLAG } from './config';

const logger = require('consola').withScope('vue-router-webcache');

interface ModuleOptions {
  cacheList?: CacheUrl[];
  replacePush?: boolean;
  urlGetter?: () => string;
  forceVuexRouterSync?: boolean;
}

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

  const routerFilePath = resolve(this.options.srcDir, './router.js');
  let needWriteFile = true;

  if (existsSync(routerFilePath)) {
    const currentRouterFile = readFileSync(routerFilePath, { encoding: 'utf-8' });
    const isGenerated = currentRouterFile.startsWith(AUTO_UPDATE_FLAG);

    if (isGenerated) logger.info('Update auto-generated "router.js" file');
    else logger.info('Cannot change manually updated "router.js" file');

    needWriteFile = isGenerated;
  }

  if (needWriteFile) {
    logger.info(`Creating new router configuration in "${this.options.srcDir}"`)

    const template = readFileSync(resolve(__dirname, './router.js'), { encoding: 'utf-8' });
    const compiler = lodashTemplate(template);
    const compiled = compiler({ options });

    writeFileSync(routerFilePath, AUTO_UPDATE_FLAG + compiled);
  }
}

export default nuxtModule;

module.exports.meta = require('../../package.json');
