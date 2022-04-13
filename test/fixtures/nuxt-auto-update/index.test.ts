import { resolve } from 'path';
import { promisify } from 'util';
import { readFile } from 'fs';

import {
  createContext,
  setContext,
  loadFixture,
  loadNuxt,
  build,
} from '@nuxt/test-utils';

const asyncReadFile = promisify(readFile);

const routerFilePath = resolve(__dirname, './router.js');
const firstHost = {
  hostname: 'my-first-random-host',
  pathname: '/search',
  getRealUrl: () => 'http://my-first-random-host:3008/test',
};
const secondHost = {
  hostname: 'my-second-random-host',
  pathname: '/search',
  getRealUrl: () => 'http://my-second-random-host:3008/test',
};

describe('Auto-update "router.js" generated file', () => {
  const buildNuxt = async (cacheList: any[] = []) => {
    const ctx = createContext({
      testDir: resolve(__dirname, '../../'),
      fixture: 'fixtures',
      rootDir: __dirname,
      config: {
        alias: {
          'vue-router-webcache': resolve(__dirname, '../../..'),
        },
        webcache: {
          cacheList,
        },
      },
    })

    setContext(ctx);

    await loadFixture();
    await loadNuxt();
    await ctx.nuxt.ready();
    await build();
  }

  it('Check first generated "router.js"', async () => {
    await buildNuxt([firstHost]);

    const routerFileContent = await asyncReadFile(routerFilePath, { encoding: 'utf-8' });

    expect(routerFileContent).toContain(firstHost.hostname);
    expect(routerFileContent).toContain(firstHost.getRealUrl());
    expect(routerFileContent).not.toContain(secondHost.hostname);
    expect(routerFileContent).not.toContain(secondHost.getRealUrl());
  }, 6e4);

  it('Check updated "router.js"', async () => {
    await buildNuxt([secondHost]);

    const routerFileContent = await asyncReadFile(routerFilePath, { encoding: 'utf-8' });

    expect(routerFileContent).not.toContain(firstHost.hostname);
    expect(routerFileContent).not.toContain(firstHost.getRealUrl());
    expect(routerFileContent).toContain(secondHost.hostname);
    expect(routerFileContent).toContain(secondHost.getRealUrl());
  }, 6e4);
});
