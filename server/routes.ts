import { fetchUser } from '../src/actions/auth/user';
import { getLeaderboardList } from '../src/actions/app';
import { fetchPosts } from '../src/actions/forum';

export default [
    {
        path: '/',
        exact: true,
        strict: true,
        fetchData({ dispatch, params }) {
            dispatch(fetchUser(params));
        },
    },
    {
        path: '/forum',
        exact: true,
        strict: true,
        fetchData({ dispatch, params }) {
            dispatch(fetchUser(params));
            dispatch(fetchPosts());
        },
    },
    {
        path: '/leaderboard',
        strict: true,
        exact: true,
        fetchData({ dispatch, params }) {
            dispatch(fetchUser(params));
            dispatch(getLeaderboardList());
        },
    },
    {
        path: '/profile',
        strict: true,
        fetchData({ dispatch, params }) {
            dispatch(fetchUser(params));
        },
    },
    {
        path: '/forum/:id',
        strict: true,
        fetchData({ dispatch, params }) {
            dispatch(fetchUser(params));
        },
    },
];
