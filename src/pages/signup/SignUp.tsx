import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { sagaFetchRegistration } from 'redux/store/userReducer';
import { Main, ServerMessage } from 'components';
import './signup.css';

function SignUp() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: 'user@email.ru',
            login: 'test-user',
            password: '123456',
            confirm: '123456'
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().email('Укажите почту').required('Укажите почту'),
            login: Yup.string().min(3, 'Не менее 3 символов').max(20, 'Не более 20 символов').required('Укажите логин'),
            password: Yup.string().min(6, 'Не менее 6 символов').required('Не менее 6 символов'),
            confirm: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
                .required('Пароли не совпадают')
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(sagaFetchRegistration({ values }));
        }
    });

    return (
        <Main
            title='GAME'
            style={{ width: '360px' }}>
            <div className='signin'>
                <FormikProvider value={formik}>
                    <Form>
                        <div className='form'>
                            <Field
                                name='email'
                                type='email'
                                placeholder='Почта'
                                className='input'
                            />
                            <Field
                                name='login'
                                type='text'
                                placeholder='Имя в игре'
                                className='input'
                            />
                            <Field
                                name='password'
                                type='password'
                                placeholder='Пароль'
                                className='input'
                            />
                            <Field
                                name='confirm'
                                type='password'
                                placeholder='Пароль (ещё раз)'
                                className='input'
                            />
                            <div className='form__redirect'>
                                <Link to='/signin'>Войти</Link>
                            </div>
                            <button
                                type='submit'
                                className='btn fullwidth'>
                                Регистрация
                            </button>
                            <p className='description_user'>
                                Регистрация нужна только для рейтинга и доступа к форуму. Ваши данные не нужно подтверждать. Можете их
                                просто придумать.
                            </p>
                        </div>
                    </Form>
                </FormikProvider>

                <ServerMessage />
            </div>
        </Main>
    );
}

export default SignUp;
