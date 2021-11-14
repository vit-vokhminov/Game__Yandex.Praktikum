import express, { Application } from 'express';
import setCookie from 'set-cookie-parser';
import { password } from '../../../app/api/users';

export default (app: Application) => {
    app.use('/api/user/password', express.urlencoded({ extended: true }));
    app.use('/api/user/password', express.json());

    app.put('/api/user/password', (req, res) => {
        password(req.body, {
            headers: { cookie: req.headers.cookie || '' },
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
