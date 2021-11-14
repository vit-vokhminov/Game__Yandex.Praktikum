import React from 'react';
import HeaderMenuItem from '../header-menu-item';
import { HeaderMenuProps } from './types';

import './header-menu.css';

const HeaderMenu = ({ headerMenu }: HeaderMenuProps) => (
    <div className="header-menu">
        {
            headerMenu.map(({ imgLink, imgAlt, link }) => (
                <HeaderMenuItem
                    key={imgAlt}
                    imgLink={imgLink}
                    imgAlt={imgAlt}
                    link={link}
                />
            ))
        }
    </div>
);

export default HeaderMenu;
