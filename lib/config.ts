export interface CacheUrl {
  hostname: string;
  pathname: string;
  getRealUrl?: (url: string) => string,
}

const googleRegex = /^cache:[^:]+:(.+)/

export const defaultCacheUrls: CacheUrl[] = [
  {
    hostname: 'yandexwebcache.net',
    pathname: '/yandbtm',
    getRealUrl: (url) => {
      const parsed = new URL(url);

      return parsed.searchParams.get('url');
    },
  },
  {
    hostname: 'webcache.googleusercontent.com',
    pathname: '/search',
    getRealUrl: (url) => {
      const parsed = new URL(url);
      const q = parsed.searchParams.get('q');

      const matched = q.match(googleRegex);

      if (!matched) throw new Error(`Can't extract realUrl from "${url}"`);

      const extracted = matched[1].trim();

      if (!extracted.startsWith('https://')) return `http://${extracted}`;

      return extracted;
    },
  },
];
