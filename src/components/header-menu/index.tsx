import React from 'react';
import HeaderMenuItem from '../header-menu-item';
import type { HeaderMenuProps } from './types';
import LogoutButton from '../logout-button';
import './header-menu.css';

const HeaderMenu = ({ headerMenu }: HeaderMenuProps) => {
    return (
        <div className="header-menu">
            <div>
                {
                    headerMenu.map((item) => (
                        <HeaderMenuItem
                            key={item.id}
                            imgLink={item.imgLink}
                            imgAlt={item.imgAlt}
                            link={item.link}
                        />
                    ))
                }
            </div>
            <div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default HeaderMenu;
