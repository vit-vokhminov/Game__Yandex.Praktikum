import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/store";
import { logout } from "redux/reducers/user/userActions";
import LogoutIcon from 'assets/svg/logout.svg';
import s from './headerMenu.module.css';

const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const handleExit = () => {
        const conf = window.confirm(`Беги. Я всё равно тебя убью. А торт, кстати, уже съели.`);
        if (conf) {
            const user = dispatch(logout());
            
            navigate("/signin");
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
