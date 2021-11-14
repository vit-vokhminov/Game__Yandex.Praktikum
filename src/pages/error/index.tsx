import React from 'react';
import { Link } from 'react-router-dom';
import type { ErrorPageProps, Errors } from './types';
import Main from '../../components/main';
import './error.css';

const errors: Errors[] = [
    {
        number: 404,
        description: 'Упс, куда-то вы забрели..',
        message: 'К сожалению, запрашиваемая страница не найдена',
    },
    {
        number: 500,
        description: 'Ошибка сервера!',
        message: 'Мы о ней знаем и скоро исправим!',
    },
];

const getError = (number: 404 | 500): Errors => {
    const error = errors.find((item) => item.number === number);

    if (error) {
        return error;
    }
}

const ErrorPage = ({ number }: ErrorPageProps) => {
    const error = getError(number);

    return (
        <Main title="Ошибка!" offBtnIcon>
            <div className="main">
                <div className="error">
                    <div className="error__number">{number}</div>
                    <div className="error__decription">{error.description}</div>
                    <div className="error__message">{error.message}</div>
                </div>
                <Link to="/"><button type="button" className="btn fullwidth">Вернуться</button></Link>
            </div>
        </Main>
    );
};

export default ErrorPage;
