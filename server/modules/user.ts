import express from 'express';
import axios from 'axios';

export default (app, store) => {
    app.use('/api/auth/user', express.urlencoded({ extended: true }));
    app.use('/api/auth/user', express.json());

    app.get('/api/auth/user', (req, res) => {
        axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
            withCredentials: true,
            headers: {
                cookie: req.headers.cookie,
            },
        }).then((response) => {
            if (response.status === 200) {
                res.send(response.data);
            }
        }).catch((err) => {
            res.send(err);
        });
    });
    return app;
};
