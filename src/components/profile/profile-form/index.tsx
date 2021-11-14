import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { validateFormValues } from '../../../utilities/validator';
import Button from '../../button';
import { profileAction } from '../../../actions/users/profile';
import { getUser } from '../../../selectors/collections/auth';
import Field from '../../field';
import type { ProfileProps } from '../../../../app/api/users/types';
import type { Store } from '../../../reducers/types';
import type { Props } from './types';

const ProfileFormSchema: SchemaOf<ProfileProps> = Yup.object().shape({
    email: Yup.string()
        .email('Пожалуйста, укажите почту')
        .required('Пожалуйста, укажите почту'),
    login: Yup.string().required('Пожалуйста, укажите логин'),
    first_name: Yup.string().required('Пожалуйста, укажите имя'),
    second_name: Yup.string().required('Пожалуйста, укажите фамилию'),
    phone: Yup.string()
        .matches(/^(\s)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, 'Пожалуйста, укажите телефон')
        .required('Пожалуйста, укажите телефон'),
    display_name: Yup.string().required(),
});

const validate = validateFormValues(ProfileFormSchema);

const ProfileForm = ({ user, profile }: Props) => {
    const initialValues = {
        email: user.email,
        login: user.login,
        first_name: user.first_name,
        second_name: user.second_name,
        phone: user.phone || '',
        display_name: `${user.first_name} ${user.second_name}`,
    };

    const onSubmitHandler = (values: ProfileProps) => {
        profile(values);
    };

    return (
        <Form
            initialValues={initialValues}
            onSubmit={onSubmitHandler}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="email" type="email" placeholder="Почта" />
                    <Field name="login" type="text" placeholder="Логин" />
                    <Field name="first_name" type="text" placeholder="Имя" />
                    <Field name="second_name" type="text" placeholder="Фамилия" />
                    <Field name="phone" type="text" placeholder="Телефон" />
                    <Button
						type="submit"
						className="btn fullwidth"
						disabled={submitting}
                    >
						Сохранить
                    </Button>
                </form>
            )}
        />
    );
};

const mapStateToProps = (store: Store) => ({
    user: getUser(store),
});

const mapDispatchToProps = {
    profile: profileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
