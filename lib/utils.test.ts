import type Router from 'vue-router';

import { defaultCacheUrls } from './config';
import { isCacheUrl, patchNuxtRouter } from './utils';

describe('Utils: isCacheUrl', () => {
  it('Default cacheList', () => {
    defaultCacheUrls.forEach(({ hostname, pathname }) => {
      const url = `https://${hostname}${pathname}`;
      const res = isCacheUrl(url);

      expect(res).toEqual(true);
    });

    const wrongUrl = `https://localhost/search`;

    expect(isCacheUrl(wrongUrl)).toEqual(false);
  });

  it('Custom cacheList', () => {
    const cacheList = [
      {
        hostname: 'localhost',
        pathname: '/search'
      },
      {
        hostname: 'localhost',
        pathname: '/foo'
      },
      {
        hostname: 'bar',
        pathname: '/baz',
      },
    ];

    cacheList.forEach(({ hostname, pathname }) => {
      const url = `https://${hostname}${pathname}`;
      const res = isCacheUrl(url, cacheList);

      expect(res).toEqual(true);
    });

    defaultCacheUrls.forEach(({ hostname, pathname }) => {
      const url = `https://${hostname}${pathname}`;
      const res = isCacheUrl(url, cacheList);

      expect(res).toEqual(false);
    });
  });
});

describe('Utils: patchNuxtRouter', () => {
  it('Replace default resolve', () => {
    const fakeRealUrl = Symbol('real url');
    const fakeResolveResult = Symbol('route');
    const resolve = jest.fn(() => fakeResolveResult);
    const router = { resolve } as unknown as Router;

    patchNuxtRouter(router, fakeRealUrl as unknown as string);

    expect(resolve).not.toHaveBeenCalled();
    expect(router.resolve).not.toEqual(resolve);

    const firstResolveResult = router.resolve(null);

    expect(resolve).toHaveBeenCalled();
    // PatchNuxtRouter use `bind`
    expect((resolve.mock.instances[0] as unknown as Router).resolve)
      .toEqual(router.resolve);
    expect(resolve).toHaveBeenCalledWith(fakeRealUrl);
    expect(firstResolveResult).toEqual(fakeResolveResult);
  });

  it('Replace only first call', () => {
    const fakeResolveResult = Symbol('route');
    const uniqHref = Symbol('uniq href');
    const resolve = jest.fn(() => fakeResolveResult);
    const router = { resolve } as unknown as Router;

    patchNuxtRouter(router, 'foo');

    router.resolve(null);
    router.resolve(uniqHref as unknown as string);

    expect(resolve).toHaveBeenCalledTimes(2);
    expect(resolve).toHaveBeenLastCalledWith(uniqHref);
    expect((resolve.mock.instances[1] as unknown as Router).resolve)
      .toEqual(router.resolve);
  });
});
