import { h } from 'vue';

const IndexPage = {
  render() {
    return h('div', {}, 'Index page');
  },
};

const TestPage = {
  render() {
    return h('div', {}, 'Test page');
  },
};

const ErrorPage = {
  render() {
    return h('div', {}, 'Error page');
  },
};

export default [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/test',
    component: TestPage,
  },
  {
    path: '/:path(.*)*',
    component: ErrorPage,
  },
];
