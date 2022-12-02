import React from 'react';
import { Link } from 'react-router-dom';
import ForwardBtn from 'components/UI/ForwardBtn';
import CN from 'classnames';
import s from './main.module.css';

type MainProps = {
    title: React.ReactNode | string;
    offBtnIcon?: boolean;
    children: React.ReactNode;
    style?: any;
};

const Main = ({ children, title, offBtnIcon = false, ...props }: MainProps) => (
    <div className={`${s.box_content} ${s.main_font_family}`}>
        <div
            className={s.content}
            {...props}>
            <div className={s.header}>
                {offBtnIcon === false ? (
                    <Link
                        to='/'
                        className={s.btn_back_link}>
                        <ForwardBtn />
                    </Link>
                ) : null}
                <div className={CN(s.header_title, s.title_page)}>{title}</div>
            </div>

            {children}
        </div>
    </div>
);

export default Main;
