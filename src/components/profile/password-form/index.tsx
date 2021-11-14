import React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { validateFormValues } from '../../../utilities/validator';
import Button from '../../button';
import { passwordAction } from '../../../actions/users/password';
import Field from '../../field';
import type { Props, PasswordFormProps } from './types';

const PasswordFormSchema: SchemaOf<PasswordFormProps> = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Пожалуйста, укажите старый пароль'),
    newPassword: Yup.string()
        .notOneOf([Yup.ref('oldPassword'), null], 'Пароли не должны сопадать')
        .min(8, 'Пожалуйста, укажите пароль длинее 8 символов')
        .required('Пожалуйста, укажите пароль длинее 8 символов'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Новые пароли не совпадают')
        .required('Новые пароли не совпадают'),
});

const validate = validateFormValues(PasswordFormSchema);

const PasswordForm = ({ password }: Props) => {
    const onSubmitHandler = ({ oldPassword, newPassword }: PasswordFormProps) => {
        password({ oldPassword, newPassword });
    };

    return (
        <Form
            onSubmit={onSubmitHandler}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="oldPassword" type="password" placeholder="Старый пароль" />
                    <Field name="newPassword" type="password" placeholder="Новый пароль" />
                    <Field name="confirmNewPassword" type="password" placeholder="Новый пароль (ещё раз)" />
                    <Button
                        type="submit"
                        className="btn fullwidth"
                        disabled={submitting}
                    >
                        Изменить пароль
                    </Button>
                </form>
            )}
        />
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    password: passwordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);
