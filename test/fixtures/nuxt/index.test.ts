import path from 'path';

import { createPage, setupTest } from '@nuxt/test-utils'

describe('Module with default "@nuxtjs/router"', () => {
  setupTest({
    testDir: path.resolve(__dirname, '../../'),
    fixture: 'fixtures',
    rootDir: __dirname,
    browser: true,
    config: {
      server: {
        port: 3000,
      },
      alias: {
        'vue-router-webcache': path.resolve(__dirname, '../../..'),
      },
    },
  });

  it('Render test page by /test url', async () => {
    const page = await createPage('/test');
    const html = await page.innerHTML('body');

    expect(html).toContain('Test page');
  });

  it('Render test page by /search url', async () => {
    const page = await createPage('/search');
    const html = await page.innerHTML('body');

    expect(html).toContain('Test page');
  });

  it('Render error page by /foo url', async () => {
    const page = await createPage('/search');
    const html = await page.innerHTML('body');

    expect(html).toContain('error');
  });
});
