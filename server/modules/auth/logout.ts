import express from 'express';
import type { Application } from 'express';
import setCookie from 'set-cookie-parser';
import { logout } from '../../../app/api/auth';

export default (app: Application) => {
    app.use('/api/auth/logout', express.urlencoded({ extended: true }));
    app.use('/api/auth/logout', express.json());

    app.post('/api/auth/logout', (req, res) => {
        logout()
            .then(({ headers, status, data }) => {
                const cookies = setCookie.parse(headers['set-cookie'], {
                    decodeValues: true,
                    map: true,
                });

                res
                    .status(status)
                    .cookie(cookies.uuid.name, cookies.uuid.value)
                    .cookie(cookies.authCookie.name, cookies.authCookie.value)
                    .send(data);
            })
            .catch((error) => {
                const { status, data, headers } = error.response;

                const cookies = setCookie.parse(headers['set-cookie'], {
                    decodeValues: true,
                    map: true,
                });

                res
                    .cookie(cookies.uuid.name, cookies.uuid.value)
                    .cookie(cookies.authCookie.name, cookies.authCookie.value)
                    .status(status)
                    .send(data);
            });
    });

    return app;
};
