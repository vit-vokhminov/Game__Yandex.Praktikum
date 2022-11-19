import React from 'react';
import { useDispatch } from 'react-redux';
import { sagaFetchLogout } from 'redux/store/userReducer';
import LogoutIcon from 'assets/svg/logout.svg';
import s from './headerMenu.module.css';

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleExit = () => {
        const conf = window.confirm(`Беги. Я всё равно тебя убью. А торт, кстати, уже съели.`);
        if (conf) {
            const user = dispatch(sagaFetchLogout());
            console.log(user);
        }
    };

    return (
        <LogoutIcon
            onClick={handleExit}
            className={s.header_menu__img}
        />
    );
};

export default LogoutButton;
