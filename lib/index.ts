import Router from 'vue-router';

export { defaultCacheUrls, CacheUrl } from './config';

import type createRouter3 from './get-router-3';
import type createRouter4 from './get-router-4';

export * from './utils';

const { version = '4.0.0' } = Router || {};
const majorVersion = version.split('.').map(Number)[0];

const getRouter = majorVersion === 4
  ? (require('./get-router-4').default as typeof createRouter4)
  : (require('./get-router-3').default as typeof createRouter3);

export default getRouter;
