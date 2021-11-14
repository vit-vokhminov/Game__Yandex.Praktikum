import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/auth/logout';
import { getLogout } from '../../selectors/collections/auth';
import './logout-btn.css';
import LogoutIcon from '../../assets/svg/logout.svg';

const LogoutButton = ({ isLogout, logoutAction }) => {
    const handleOnClick = () => {
        logoutAction();
    };

    if (isLogout.data === 'OK') {
        return <Redirect to="/signin" />;
    }

    return (
        <img
            onClick={handleOnClick}
            className="header-menu__img"
            src={LogoutIcon}
            alt="logout"
        />
    );
};

const mapStateToProps = (store) => {
    return {
        isLogout: getLogout(store),
    };
};

export default connect(mapStateToProps, { logoutAction })(LogoutButton);
