import type Router from 'vue-router';

import { defaultCacheUrls } from './config';
import { getCache, getRealUrl, isCacheUrl, patchNuxtRouter } from './utils';

describe('Utils: getCache', () => {
  it('Default cacheList', () => {
    defaultCacheUrls.forEach(({ hostname, pathname }, index) => {
      const url = `https://${hostname}${pathname}`;
      const res = getCache(url);

      expect(res).toEqual(defaultCacheUrls[index]);
    });

    const wrongUrl = `https://localhost/search`;

    expect(getCache(wrongUrl)).toEqual(null);
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

    cacheList.forEach(({ hostname, pathname }, index) => {
      const url = `https://${hostname}${pathname}`;
      const res = getCache(url, cacheList);

      expect(res).toEqual(cacheList[index]);
    });

    defaultCacheUrls.forEach(({ hostname, pathname }) => {
      const url = `https://${hostname}${pathname}`;
      const res = getCache(url, cacheList);

      expect(res).toEqual(null);
    });
  });
});

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

describe('Utils: getRealUrl', () => {
  it('Call getRealUrl', () => {
    const cacheList = [
      {
        hostname: 'example',
        pathname: '/foo',
        getRealUrl: jest.fn(),
      },
      {
        hostname: 'example',
        pathname: '/bar',
        getRealUrl: jest.fn(),
      },
    ];

    expect(cacheList[0].getRealUrl).not.toHaveBeenCalled();
    expect(cacheList[1].getRealUrl).not.toHaveBeenCalled();

    getRealUrl('http://example/bar', cacheList);

    expect(cacheList[0].getRealUrl).not.toHaveBeenCalled();
    expect(cacheList[1].getRealUrl).toHaveBeenCalled();
    expect(cacheList[1].getRealUrl).toHaveBeenCalledWith('http://example/bar');

    getRealUrl('http://example/foo', cacheList);

    expect(cacheList[0].getRealUrl).toHaveBeenCalled();
    expect(cacheList[0].getRealUrl).toHaveBeenCalledWith('http://example/foo');
    expect(cacheList[1].getRealUrl).toHaveBeenCalledTimes(1);
  });

  it('Return null', () => {
    expect(getRealUrl('http://example.com')).toEqual(null);

    const cacheList = [
      {
        hostname: 'localhost',
        pathname: '/search',
      }
    ];

    expect(getRealUrl('https://localhost/search', cacheList)).toEqual(null);
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
