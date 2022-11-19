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

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        login: string;
        isActivated: boolean;
    };
}