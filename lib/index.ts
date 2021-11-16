import Router from 'vue-router';

export { defaultCacheUrls } from './config';

export * from './utils';

const { version = '4.0.0' } = Router || {};
const majorVersion = version.split('.').map(Number)[0];

export default majorVersion === 4
  ? require('./get-router-4').default
  : require('./get-router-3').default;
