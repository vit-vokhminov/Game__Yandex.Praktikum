export type TypeLogin = {
    email: string,
    password: string,
};

export type TypeRegistration = {
    confirm: string,
    email: string,
    login: string,
    password: string,
};

export interface Iuser {
    id: number;
    email: string;
    login: string;
    level: string;
    record: number;
    avatar: string;
    isActivated: boolean;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: Iuser;
}