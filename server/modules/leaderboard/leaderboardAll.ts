import express, { Application } from 'express';
import setCookie from 'set-cookie-parser';
import axios from 'axios';

export default (app: Application) => {
    app.use('/api/leaderboard/all', express.urlencoded({ extended: true }));
    app.use('/api/leaderboard/all', express.json());

    app.post('/api/leaderboard/all', (req, res) => {
        axios.post('https://ya-praktikum.tech/api/v2/leaderboard/all', {
            ratingFieldName: 'score_charleston',
            cursor: 0,
            limit: 10,
        }, {
            withCredentials: true,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
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
