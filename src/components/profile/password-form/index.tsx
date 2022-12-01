import React from 'react';
import { useFormik, FormikProvider, Field, Form, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { editUserPassword } from 'redux/reducers/user/userActions';
import * as Yup from 'yup';
import { Button, ButtonSpinner } from 'components/UI/Button';
import { Input } from 'components/UI/Input';
import { ErrorText } from 'components/UI/ErrorText';
import CN from 'classnames';
import s from './passwordForm.module.css';

interface passwordForm {
    id: string;
    oldPassword: string;
    newPassword: string;
    confirm: string;
}

const PasswordForm = () => {
    const [edit, setEdit] = React.useState(false);
    const { user, loading } = useAppSelector((store: any) => store.userSlice);
    const dispatch = useAppDispatch();

    const formik = useFormik<passwordForm>({
        initialValues: {
            id: user.id,
            oldPassword: '',
            newPassword: '',
            confirm: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Поле не может быть пустым'),
            newPassword: Yup.string().min(3, 'Не менее 3 символов').max(8, 'Не более 8 символов').required('Не менее 3 символов'),
            confirm: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают')
                .required('Введите новый пароль')
        }),
        onSubmit: async (values) => {
            const newValues = {
                id: values.id,
                password: values.newPassword
            };
            const result = await dispatch(editUserPassword(newValues));

            if (result.meta.requestStatus === 'fulfilled') {
                setEdit(!edit);
            }
        }
    });

    const handleCancel = React.useCallback(() => {
        formik.resetForm();
        setEdit(!edit);
    }, [formik, setEdit]);

    const handleEdit = () => {
        setEdit(!edit);
    };

    const formButton = () => {
        return loading ? (
            <ButtonSpinner />
        ) : (
            <div className={s.button_line}>
                <Button
                    type='submit'
                    className={s.button_line_elem}
                    disabled={!(formik.isValid && formik.dirty)}>
                    Сохранить
                </Button>
                <Button
                    type='button'
                    className={s.button_line_elem}
                    onClick={handleCancel}>
                    Отменить
                </Button>
            </div>
        );
    };

    return (
        <FormikProvider value={formik}>
            <Form>
                <div className={s.password_form}>
                    <Field
                        name='oldPassword'
                        type='password'
                        placeholder='Старый пароль'
                        className={CN({ [s.edit_input]: !edit })}
                        disabled={!edit}
                        as={Input}
                    />

                    <Field
                        name='newPassword'
                        type='password'
                        placeholder='Новый пароль'
                        className={CN({ [s.edit_input]: !edit })}
                        disabled={!edit}
                        as={Input}
                    />
                    <ErrorText>
                        <ErrorMessage name='newPassword' />
                    </ErrorText>

                    <Field
                        name='confirm'
                        type='password'
                        placeholder='Новый пароль (ещё раз)'
                        className={CN({ [s.edit_input]: !edit })}
                        disabled={!edit}
                        as={Input}
                    />
                    <ErrorText>
                        <ErrorMessage name='confirm' />
                    </ErrorText>

                    {edit ? (
                        formButton()
                    ) : (
                        <Button
                            type='button'
                            onClick={handleEdit}>
                            Изменить пароль
                        </Button>
                    )}
                </div>
            </Form>
        </FormikProvider>
    );
};

export default PasswordForm;
