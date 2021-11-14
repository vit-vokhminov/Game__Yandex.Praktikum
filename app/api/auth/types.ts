export type SignupProps = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type SigninProps = {
    login: string;
    password: string;
};

export type SignupResponse = {
    id: number;
};

export type SigninResponse = string;

export type UserResponse = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: null | string;
};

export type LogoutResponse = string;
