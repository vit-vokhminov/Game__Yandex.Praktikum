import express from 'express';
import axios from 'axios';
import setCookie from 'set-cookie-parser';
import { setAuthorized } from '../../src/actions/app';

export default (app, store) => {
    app.use('/api/auth/signin', express.urlencoded({ extended: true }));
    app.use('/api/auth/signin', express.json());

    app.post('/api/auth/signin', (req, res) => {
        axios.post('https://ya-praktikum.tech/api/v2/auth/signin', {
            login: req.body.login,
            password: req.body.password,
        }, { withCredentials: true })
            .then((response) => {
                const cookies = setCookie.parse(response, {
                    decodeValues: true,
                    map: true,
                });
                if (response.status === 200) {
                    res.cookie(cookies.uuid.name, cookies.uuid.value);
                    res.cookie(cookies.authCookie.name, cookies.authCookie.value);
                    res.send(response.data);
                    store.dispatch(setAuthorized(true));
                }
            }).catch((err) => {
                res.send(err);
            });
    });
    return app;
};
