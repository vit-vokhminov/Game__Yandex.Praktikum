import express from 'express';
import path from 'path';
import cors from 'cors';
import 'babel-polyfill';
import dotenv from 'dotenv';
import singin from './modules/auth/signin';
import singup from './modules/auth/signup';
import logout from './modules/auth/logout';
import user from './modules/auth/user';
import leaderboard from './modules/leaderboard/leaderboard';
import leaderboardAll from './modules/leaderboard/leaderboardAll';
import oauthYandex from './modules/oauth/yandex';
import serviceId from './modules/oauth/service-id';
import profile from './modules/users/profile';
import avatar from './modules/users/avatar';
import password from './modules/users/password';
import serverRenderMiddleware from './middleware/server-render';
import sequelize from './db';
import models from './models/models';
import router from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;

app.use(express.static(path.join(__dirname, '../static')));

app.use(cors());
app.use(express.json());
app.use('/api', router);

singin(app);
singup(app);
logout(app);
user(app);
leaderboard(app);
leaderboardAll(app);

profile(app);
avatar(app);
password(app);

oauthYandex(app);
serviceId(app);

app.get('/*', serverRenderMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate(); // устанавливаем подключение к БД
        await sequelize.sync(); // сверяет данные БД со схемой
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
