type HeaderMenu = {
    id: number;
    imgLink: string;
    imgAlt: string;
    link?: string;
};

export type HeaderMenuProps = {
    headerMenu: HeaderMenu[],
};
