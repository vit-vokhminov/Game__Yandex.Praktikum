import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import SettingsIcon from 'assets/svg/settings.svg';
import s from './headerMenu.module.css';

const HeaderMenu = () => {
    const location = useLocation();

    return (
        <div className={s.header_menu}>
            <div className={s.header_btn}>
                {location.pathname != '/profile' && (
                    <Link to={'/profile'}>
                        <SettingsIcon className={s.header_menu__img} />
                    </Link>
                )}
            </div>

            <div className={s.header_btn}>
                <LogoutButton />
            </div>
        </div>
    );
};

export default HeaderMenu;
