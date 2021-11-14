import React, { ReactElement } from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/routes/privete';
import ErrorPage from './pages/error';
import LeaderboardPage from './pages/leaderboard';
import Profile from './pages/profile';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Posts from './pages/Forum/Posts';
import Post from './pages/Forum/Post';
import AddPost from './pages/Forum/AddPost';
import ErrorBoundary from './utilities/ErrorBoundary';
import { isServer } from './utilities/isServer';
import './assets/style.css';

const GameRunner = loadable(() => import('./components/game/gameRunner'), { ssr: false });
const Start = loadable(() => import('./pages'), { ssr: false });

export default function App(): ReactElement {
    const gameRunner = useSelector(({ widgets }) => widgets.app.gamaRunner);

    return (
        <ErrorBoundary>
            <div className="app">
                {
                    !gameRunner && !isServer
                        ? (
                            <Switch>
                                <PrivateRoute exact path="/" exact><Start /></PrivateRoute>
                                <Route path="/signin" component={Signin} />
                                <Route path="/signup" component={Signup} />
                                <PrivateRoute path="/profile"><Profile /></PrivateRoute>
                                <PrivateRoute exact path="/forum"><Posts /></PrivateRoute>
                                <PrivateRoute path="/forum/:id"><Post /></PrivateRoute>
                                <PrivateRoute path="/forum-add-topic"><AddPost /></PrivateRoute>
                                <PrivateRoute path="/leaderboard"><LeaderboardPage /></PrivateRoute>
                                <Route component={() => (<ErrorPage number={404} />)} />
                            </Switch>
                        )
                        : null
                }
                <GameRunner />
            </div>
        </ErrorBoundary>
    );
}
