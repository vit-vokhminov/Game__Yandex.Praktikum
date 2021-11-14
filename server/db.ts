import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export default new Sequelize(
        process.env.POSTGRES_DB,        // Название БД
        process.env.POSTGRES_USER,        // Пользователь
        process.env.POSTGRES_PASSWORD,    // ПАРОЛЬ
        {
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: process.env.POSTGRES_PORT,
                logging: false,
        },
);
