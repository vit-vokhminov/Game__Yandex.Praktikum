import express from 'express';
import setCookie from 'set-cookie-parser';
import axios from 'axios';
import type { Application } from 'express';
import { getAllLeaderBoard } from '../../../app/api/leaderBoard';


export default (app: Application) => {
    app.use('/api/leaderboard', express.urlencoded({ extended: true }));
    app.use('/api/leaderboard', express.json());

    app.post('/api/leaderboard', (req, res) => {
        axios.post('https://ya-praktikum.tech/api/v2/leaderboard', req.body, {
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
