import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { validateFormValues } from '../../utilities/validator';
import { signinAction } from '../../actions/auth/signin';
import Main from '../../components/main';
import { getSignin } from '../../selectors/collections/auth';
import type { Store } from '../../reducers/types';
import type { Props } from './types';
import type { SigninProps } from '../../../app/api/auth/types';
import Field from '../../components/field';
import YaOauthButton from '../../components/ya-oauth-button';

import './signin.css';

const SigninSchema: SchemaOf<SigninProps> = Yup.object().shape({
    login: Yup.string().required('Пожалуйста, укажите логин'),
    password: Yup.string().required('Пожалуйста, укажите пароль'),
});

const validate = validateFormValues(SigninSchema);

const Signin = ({ signinStore, signin }: Props) => {
    const onSubmitHandler = (values: SigninProps) => {
        signin(values);
    };

    if (signinStore.data === 'OK' || signinStore.error === 'User already in system') {
        return <Redirect to="/" />;
    }
    return (
        <>
            <Main title="GAME" offBtnIcon>
                <div className="signin">
                    <Form
                        onSubmit={onSubmitHandler}
                        validate={validate}
                        render={({ handleSubmit, submitting }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                <Field name="login" type="text" placeholder="Логин" />
                                <Field name="password" type="password" placeholder="Пароль" />
                                <div className="form__redirect">
                                    <Link to="/signup">Регистрация</Link>
                                </div>
                                <button
                                    type="submit"
                                    className="btn fullwidth"
                                    disabled={submitting}
                                >
                                    Вход
                                </button>
                                <YaOauthButton />
                                {
                                    (signinStore.error === 'Login or password is incorrect')
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
    signinStore: getSignin(store),
});

const mapDispatchToProps = {
    signin: signinAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
