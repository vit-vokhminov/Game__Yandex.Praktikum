import express from 'express';
import type { Application } from 'express';
import axios from 'axios';
import setCookie from 'set-cookie-parser';
import { serviceId } from '../../../app/api/oauth';

export default (app: Application) => {
    app.use('/api/oauth/yandex/service-id', express.urlencoded({ extended: true }));
    app.use('/api/oauth/yandex/service-id', express.json());

    app.get('/api/oauth/yandex/service-id', (req, res) => {
        serviceId({
            headers: {
                cookie: req.headers.cookie || '',
            },
            params: req.query,
        })
            .then(({ status, data }) => {
                res
                    .status(status)
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
