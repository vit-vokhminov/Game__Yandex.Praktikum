import express from 'express';
import setCookie from 'set-cookie-parser';
import type { Application } from 'express';
import { user } from '../../../app/api/auth';

export default (app: Application) => {
    app.use('/api/auth/user', express.urlencoded({ extended: true }));
    app.use('/api/auth/user', express.json());

    app.get('/api/auth/user', (req, res) => {
        user({
            headers: {
                cookie: req.headers.cookie || '',
            },
        })
            .then(({ status, data }) => {
                res
                    .status(status)
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
