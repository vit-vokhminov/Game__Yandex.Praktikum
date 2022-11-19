import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { sagaFetchLogin } from 'redux/store/userReducer';
import { Main, ServerMessage } from 'components';
import './signin.css';

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: 'user@email.ru',
            password: '123456'
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().email('Укажите почту').required('Укажите почту'),
            password: Yup.string().min(6, 'Не менее 6 символов').required('Не менее 6 символов')
        }),
        onSubmit: (values) => {
            const user = dispatch(sagaFetchLogin({ values }));
            if (user.payload.values) {
                console.log(user);
                navigate('/');
                console.log('----');
            }
        }
    });

    return (
        <Main
            title='GAME'
            style={{ width: '360px' }}
            offBtnIcon>
            <div className='signin'>
                <FormikProvider value={formik}>
                    <Form>
                        <div className='form'>
                            <Field
                                name='email'
                                type='text'
                                placeholder='Почта'
                                className='input'
                            />
                            <Field
                                name='password'
                                type='password'
                                placeholder='Пароль'
                                className='input'
                            />
                            <div className='form__redirect'>
                                <Link to='/signup'>Регистрация</Link>
                            </div>
                            <button
                                type='submit'
                                className='btn fullwidth'>
                                Вход
                            </button>
                            <p className='description_user'>
                                Авторизация нужна только для рейтинга и доступа к форуму. Ваши данные не нужно подтверждать. Можете их
                                просто придумать.
                            </p>
                            <ServerMessage />
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </Main>
    );
}

export default SignIn;
