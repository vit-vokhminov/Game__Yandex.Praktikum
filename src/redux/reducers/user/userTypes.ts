export interface Iuser {
    id: number;
    email: string;
    login: string;
    level: string;
    record: number;
    avatar: string;
    isActivated: boolean;
}

export interface IactionUser {
    accessToken: string;
    refreshToken: string;
    user: Iuser;
}
