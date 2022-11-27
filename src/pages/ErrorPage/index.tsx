import React from 'react';
import { Link } from 'react-router-dom';
import type { ErrorPageProps, Errors } from './types';
import { Main } from 'components';
import { Button } from 'components/UI/Button';
import s from './error.module.css';

const errors: Errors[] = [
    {
        number: 404,
        description: 'Упс, куда-то вы забрели..',
        message: 'К сожалению, запрашиваемая страница не найдена'
    },
    {
        number: 500,
        description: 'Ошибка сервера!',
        message: 'Мы о ней знаем и скоро исправим!'
    }
];

function getError(number: 404 | 500): Errors {
    const error = errors.find((item) => item.number === number);
    if (error) {
        return error;
    }
    throw new Error('error not found');
}

const ErrorPage = ({ number = 404 }: ErrorPageProps) => {
    const error = getError(number);

    return (
        <Main
            title='Ошибка!'
            offBtnIcon>
            <div className={s.main}>
                <div className={s.error}>
                    <div className={s.error__number}>{number}</div>
                    <div className={s.error__decription}>{error?.description}</div>
                    <div className={s.error__message}>{error?.message}</div>
                </div>
                <Link to='/'>
                    <Button type='button'>Вернуться</Button>
                </Link>
            </div>
        </Main>
    );
};

export default ErrorPage;
