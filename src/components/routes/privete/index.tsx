import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../loading';
import { fetchUser } from '../../../actions/auth/user';
import {
    getLoading,
    getAuthorized,
    getUnauthorized,
    getUnexpectedError,
} from '../../../selectors/widgets/app';
import type { Store } from '../../../reducers/types';
import type { Props } from './types';
import { isServer } from '../../../utilities/isServer';

const PrivateRoute = ({
    children,
    isAuthorized,
    isLoading,
    isUnauthorized,
    isUnexpectedError,
    user,
    ...props
}: Props) => {
    useEffect(() => {
        if (!isAuthorized && !isServer && !isUnauthorized) {
            user();
        }
    }, [isAuthorized]);

    return (
        <Route
            {...props}
            render={() => {
                if (isAuthorized) {
                    return children;
                }

                if (isLoading) {
                    return <Loading />;
                }

                if (isUnauthorized) {
                    return <Redirect to="/signin" />;
                }

                if (isUnexpectedError) {
                    return <Redirect to="/500" />;
                }

                return <Loading />;
            }}
        />
    );
};

const mapStateToProps = (store: Store) => ({
    isLoading: getLoading(store),
    isAuthorized: getAuthorized(store),
    isUnauthorized: getUnauthorized(store),
    isUnexpectedError: getUnexpectedError(store),
});

const mapDispatchToProps = {
    user: fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
