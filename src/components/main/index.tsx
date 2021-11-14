import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import ForwardIcon from '../../assets/svg/forward.svg';

type MainProps = {
    title: string;
    offBtnIcon?: boolean;
    children: React.ReactNode;
};

const Main = ({ children, title, offBtnIcon = false }: MainProps) => (
    <div className="box-content main-font-family">
        <div className="content">

            <div className="header">
                {offBtnIcon === false
                    ? (
                        <div className="btn-back">
                            <Link to="/"><img className="btn-back-icon" src={ForwardIcon} alt="forward" /></Link>
                        </div>
                    )
                    : null}
                <div className="header-title title-page">{title}</div>
            </div>

            {children}
        </div>
    </div>
);

export default Main;
