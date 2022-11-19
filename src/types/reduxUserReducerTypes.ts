import { TypeLogin, TypeRegistration } from 'types/ApiAuthTypes';

export type TypeUser = {
    email: string,
    login: string,
    isActivated: boolean
}
export type TypeState = {
    user: TypeUser | null,
    userAuth: boolean,
    isLoading: boolean,
    serverMessage: string,
    gameRunner: boolean;
}

export interface ActionType<T> {
    type: string;
    payload: T;
}

export type SignInPayloadType = {
    values: TypeLogin
}

export type SignUpPayloadType = {
    values: TypeRegistration
}


