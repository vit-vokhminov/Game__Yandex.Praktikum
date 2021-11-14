import loadable from '@loadable/component';

const CatalogPage = loadable(() => import('./pages/testpage'));

export default [
    {
        path: '/catalog',
        component: CatalogPage,
        exact: true,

    },
];