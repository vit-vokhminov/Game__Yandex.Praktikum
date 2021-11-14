import express from 'express';
import type { Application } from 'express';
import setCookie from 'set-cookie-parser';
import { oauthYandex } from '../../../app/api/oauth';

export default (app: Application) => {
    app.use('/api/oauth/yandex', express.urlencoded({ extended: true }));
    app.use('/api/oauth/yandex', express.json());

    app.get('/api/oauth/yandex', (req, res) => {
        oauthYandex({
            code: req.query.code,
            redirect_uri: `http://${req.headers.host}`,
        })
            .then(({ headers }) => {
                const cookies = setCookie.parse(headers['set-cookie'], {
                    decodeValues: true,
                    map: true,
                });

                res
                    .cookie(cookies.uuid.name, cookies.uuid.value)
                    .cookie(cookies.authCookie.name, cookies.authCookie.value)
                    .redirect(302, `http://${req.headers.host}`);

                return;
            })
            .catch((error) => {
                const { headers } = error.response;

                const cookies = setCookie.parse(headers['set-cookie'], {
                    decodeValues: true,
                    map: true,
                });

                res
                    .cookie(cookies.uuid.name, cookies.uuid.value)
                    .cookie(cookies.authCookie.name, cookies.authCookie.value)
                    .redirect(302, `http://${req.headers.host}`);
            });
    });

    return app;
};
