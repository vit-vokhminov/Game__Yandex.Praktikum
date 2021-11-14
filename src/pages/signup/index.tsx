import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { validateFormValues } from '../../utilities/validator';
import Main from '../../components/main';
import { signupAction } from '../../actions/auth/signup';
import { getSignup } from '../../selectors/collections/auth';
import Field from '../../components/field';
import type { Store } from '../../reducers/types';
import type { Props, SignupFormProps } from './types';
import './signup.css';

const SignupSchema: SchemaOf<SignupFormProps> = Yup.object().shape({
    email: Yup.string()
        .email('Пожалуйста, укажите почту')
        .required('Пожалуйста, укажите почту'),
    login: Yup.string().required('Пожалуйста, укажите логин'),
    first_name: Yup.string().required('Пожалуйста, укажите имя'),
    second_name: Yup.string().required('Пожалуйста, укажите фамилию'),
    phone: Yup.string()
        .matches(/^(\s)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, 'Пожалуйста, укажите телефон')
        .required('Пожалуйста, укажите телефон'),
    password: Yup.string()
        .min(8, 'Пожалуйста, укажите пароль длинее 8 символов')
        .required('Пожалуйста, укажите пароль длинее 8 символов'),
    confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
        .required('Пароли не совпадают'),
});

const validate = validateFormValues(SignupSchema);

const Signup = ({ signupResult, signup }: Props) => {
    const onSubmitHandler = ({
        first_name,
        second_name,
        login,
        email,
        password,
        phone,
    }: SignupFormProps) => {
        signup({
            first_name,
            second_name,
            login,
            email,
            password,
            phone,
        });
    };

    if (signupResult && signupResult.data && signupResult.data.id) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <Main title="GAME">
                <div className="registration">
                    <Form
                        onSubmit={onSubmitHandler}
                        validate={validate}
                        render={({ handleSubmit, submitting }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                <Field name="email" type="email" placeholder="Почта" />
                                <Field name="login" type="text" placeholder="Логин" />
                                <Field name="first_name" type="text" placeholder="Имя" />
                                <Field name="second_name" type="text" placeholder="Фамилия" />
                                <Field name="phone" type="tel" placeholder="Телефон" />
                                <Field name="password" type="password" placeholder="Пароль" />
                                <Field name="confirm" type="password" placeholder="Пароль (ещё раз)" />
                                <div className="form__redirect">
                                    <Link to="/signin">Войти</Link>
                                </div>
                                <button
                                    type="submit"
                                    className="btn fullwidth"
                                    disabled={submitting}
                                >
                                    Регистрация
                                </button>
                                {
                                    (signupResult.error === 'Login already exists')
                                        ? <span className="input-block__error">Не правильный логин или пароль</span>
                                        : null
                                }
                            </form>
                        )}
                    />
                </div>
            </Main>
        </>
    );
};

const mapStateToProps = (store: Store) => ({
    signupResult: getSignup(store),
});

const mapDispatchToProps = {
    signup: signupAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
