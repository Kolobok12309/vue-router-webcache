import VueService from '@vue/cli-service';
import { chromium } from 'playwright';

const service = new VueService(__dirname);

service.init('development');

describe('Simple vue-router-4 app (SPA) with custom base', () => {
  let browser, server, baseUrl;

  const getUrl = (path = '') => new URL(path, baseUrl);

  beforeAll(async () => {
    ({ server, url: baseUrl } = await service.run('serve'));

    browser = await chromium.launch();
  }, 6e4);

  it('Render test page by /sub/test url', async () => {
    const onError = jest.fn();
    const page = await browser.newPage();

    page.on('pageerror', (err) => onError(err));

    await page.goto(getUrl('/sub/test').toString());
    await page.waitForLoadState();

    const html = await page.innerHTML('body');

    expect(onError).not.toHaveBeenCalled();
    expect(html).toContain('Test page');
  });

  it('Render test page by /sub/search?url=http://localhost:3007/sub/test url', async () => {
    const onError = jest.fn();
    const page = await browser.newPage();

    page.on('pageerror', (err) => onError(err));

    await page.goto(getUrl('/sub/search?url=http://localhost:3007/sub/test').toString());
    await page.waitForLoadState();

    const html = await page.innerHTML('body');

    expect(onError).not.toHaveBeenCalled();
    expect(html).toContain('Test page');
  });

  it('Render error page by /sub/foo url', async () => {
    const page = await browser.newPage();

    await page.goto(getUrl('/foo').toString());
    await page.waitForLoadState();

    const html = await page.innerHTML('body');

    expect(html).toContain('Error page');
  });

  afterAll(async () => {
    await Promise.all([
      browser.close(),
      server.close(),
    ]);
  }, 2e4);
});
