import express from 'express';
import type { Application } from 'express';
import setCookie from 'set-cookie-parser';
import { signup } from '../../../app/api/auth';

export default (app: Application) => {
    app.use('/api/auth/signup', express.urlencoded({ extended: true }));
    app.use('/api/auth/signup', express.json());

    app.post('/api/auth/signup', (req, res) => {
        signup(req.body)
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
                const { status, data } = error.response;

                res
                    .status(status)
                    .send(data);
            });
    });

    return app;
};
