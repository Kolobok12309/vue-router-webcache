import path from 'path';

import { createPage, setupTest, url } from '@nuxt/test-utils'

describe('Module with default "@nuxtjs/router" and custom "base"', () => {
  setupTest({
    testDir: path.resolve(__dirname, '../../'),
    fixture: 'fixtures',
    rootDir: __dirname,
    browser: true,
    config: {
      alias: {
        'vue-router-webcache': path.resolve(__dirname, '../../..'),
      },
    },
  });

  it('Render test page by /sub/test url', async () => {
    const page = await createPage('/sub/test');
    const html = await page.innerHTML('body');

    expect(html).toContain('Test page');
  });

  it('Render test page by /sub/search url', async () => {
    const onError = jest.fn();
    const page = await createPage();

    page.on('pageerror', (err) => onError(err));

    await page.goto(url('/sub/search'));
    const html = await page.innerHTML('body');

    expect(onError).not.toHaveBeenCalled();
    expect(html).toContain('Test page');
  });

  it('Render error page by /sub/foo url', async () => {
    const page = await createPage('/sub/foo');
    const html = await page.innerHTML('body');

    expect(html).toContain('error');
  });
});
