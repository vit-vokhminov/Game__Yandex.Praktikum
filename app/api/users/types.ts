export type ProfileProps = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

export type ProfileResponse = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    display_name: string;
    avatar: null | string;
    status: null | string;
};

export type AvatarProps = FormData;

export type AvatarResponse = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: null | string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
};

export type PasswordProps = {
    oldPassword: string;
    newPassword: string;
};

export type PasswordResponse = string;
