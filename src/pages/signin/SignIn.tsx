import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from "redux/store";
import { login } from "redux/reducers/user/userActions";
import { Button, ButtonSpinner } from 'components/UI/Button';
import { Input } from 'components/UI/Input';
import { Main, ServerMessage } from 'components';
import s from './signin.module.css';

function SignIn() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [shipment, setShipment] = React.useState(false);

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
        onSubmit: async (values) => {
            setShipment(true);
            try{
                const user = await dispatch(login({ values }));
                if (user) {
                    navigate('/');
                }
            }catch(e){
                setShipment(false);
            }
        }
    });

    return (
        <Main
            title='GAME'
            style={{ width: '360px' }}
            offBtnIcon>
            <div className={s.signin}>
                <FormikProvider value={formik}>
                    <Form>
                        <Field
                            name='email'
                            type='text'
                            placeholder='Почта'
                            as={Input}
                        />
                        <Field
                            name='password'
                            type='password'
                            placeholder='Пароль'
                            as={Input}
                        />
                        <div className={s.form__redirect}>
                            <Link to='/signup'>Регистрация</Link>
                        </div>
                        {shipment ? (
                            <ButtonSpinner />
                        ) : (
                            <Button
                                type='submit'
                                disabled={!(formik.isValid)}>
                                Вход
                            </Button>
                        )}
                        <p className={s.description_user}>
                            Авторизация нужна только для рейтинга и доступа к форуму. Ваши данные не нужно подтверждать. Можете их
                            просто придумать.
                        </p>
                        <ServerMessage />
                    </Form>
                </FormikProvider>
            </div>
        </Main>
    );
}

export default SignIn;
