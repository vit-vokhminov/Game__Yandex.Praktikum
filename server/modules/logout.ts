import express from 'express';
import axios from 'axios';
import setCookie from 'set-cookie-parser';
import { setAuthorized } from '../../src/actions/app';

export default (app, store) => {
    app.use('/api/auth/logout', express.urlencoded({ extended: true }));
    app.use('/api/auth/logout', express.json());

    app.post('/api/auth/logout', (req, res) => {
        axios.post('https://ya-praktikum.tech/api/v2/auth/logout', {
            withCredentials: true,
            headers: {
                cookie: req.headers.cookie,
            },
        }).then((response) => {
            res.send(response);
            const cookies = setCookie.parse(response, {
                decodeValues: true, // default: true
                map: true,
            });
            res.cookie(cookies.uuid.name);
            res.cookie(cookies.authCookie.name);
            store.dispatch(setAuthorized(false));
        }).catch((err) => {
            res.send(err);
        });
    });
    return app;
};
