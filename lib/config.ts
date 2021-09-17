export interface CacheUrl {
  hostname: string;
  pathname: string;
}

export const defaultCacheUrls: CacheUrl[] = [
  {
    hostname: 'yandexwebcache.net',
    pathname: '/yandbtm',
  },
  {
    hostname: 'webcache.googleusercontent.com',
    pathname: '/search',
  },
];
