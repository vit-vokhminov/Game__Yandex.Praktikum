export type OauthYandexProps = {
    code: string;
    redirect_uri: string;
};

export type OauthYandexResponse = 'Ok';

export type ServiceIdProps = {
    redirect_uri?: string;
};

export type ServiceIdResponse = {
    service_id: string;
};
