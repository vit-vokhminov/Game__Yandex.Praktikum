import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, ButtonSpinner } from 'components/UI/Button';
import { Input } from 'components/UI/Input';
import { useAppDispatch } from "redux/store";
import { registration } from "redux/reducers/user/userActions";
import { Main } from 'components';
import ServerMessage from "components/UI/ServerMessage";
import s from './signup.module.css';

function SignUp() {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
        onSubmit: async (values) => {
            setLoading(true);
            try{
                const user = await dispatch(registration({ values }));
                if (user) {
                    navigate('/');
                }
            }catch(e){
                setLoading(false);
            }
        }
    });

    return (
        <Main
            title='GAME'
            style={{ width: '360px' }}>
            <div className='signin'>
                <FormikProvider value={formik}>
                    <Form>
                        <Field
                            name='email'
                            type='email'
                            placeholder='Почта'
                            as={Input}
                        />
                        <Field
                            name='login'
                            type='text'
                            placeholder='Имя в игре'
                            as={Input}
                        />
                        <Field
                            name='password'
                            type='password'
                            placeholder='Пароль'
                            as={Input}
                        />
                        <Field
                            name='confirm'
                            type='password'
                            placeholder='Пароль (ещё раз)'
                            as={Input}
                        />
                        <div className={s.form__redirect}>
                            <Link to='/signin'>Войти</Link>
                        </div>
                        {loading ? (
                            <ButtonSpinner />
                        ) : (
                            <Button
                                type='submit'
                                disabled={!(formik.isValid)}>
                                Регистрация
                            </Button>
                        )}
                        <p className={s.description_user}>
                            Регистрация нужна только для рейтинга и доступа к форуму. Ваши данные не нужно подтверждать. Можете их
                            просто придумать.
                        </p>
                    </Form>
                </FormikProvider>

                <ServerMessage />
            </div>
        </Main>
    );
}

export default SignUp;
