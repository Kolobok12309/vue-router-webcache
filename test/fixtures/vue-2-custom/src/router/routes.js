export default [
  {
    path: '/',
    component: {
      render: (h) => h('div', {}, 'Index page'),
    },
  },
  {
    path: '/test',
    component: {
      render: (h) => h('div', {}, 'Test page'),
    },
  },
  {
    path: '*',
    component: {
      render: (h) => h('div', {}, 'Error page'),
    },
  },
];
