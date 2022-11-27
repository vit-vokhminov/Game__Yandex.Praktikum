import React from 'react';
import { useFormik, FormikProvider, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, ButtonSpinner } from 'components/UI/Button';
import ServerMessage from 'components/UI/ServerMessage';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { setServerMessage } from 'redux/reducers/user/userSlice';
import { editUser } from 'redux/reducers/user/userActions';
import { Input } from 'components/UI/Input';
import CN from 'classnames';
import s from './profile-form.module.css';

interface profileForm {
    id: Id;
    email: string;
    login: string;
}

const ProfileForm = () => {
    const [edit, setEdit] = React.useState(false);
    const { user, loading } = useAppSelector((store: any) => store.userSlice);
    const dispatch = useAppDispatch();

    const formik = useFormik<profileForm>({
        initialValues: {
            id: user.id,
            email: user.email,
            login: user.login
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().required('Поле не может быть пустым'),
            login: Yup.string().required('Поле не может быть пустым')
        }),
        onSubmit: async (values) => {
            const result = await dispatch(editUser({ values }));

            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(setServerMessage("Ваши данные, успешно изменены"));
                setEdit(!edit);
            } else {
                dispatch(setServerMessage(result.payload));
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
                <Field
                    name='email'
                    type='email'
                    placeholder='Почта'
                    className={CN({ [s.edit_input]: !edit })}
                    disabled={!edit}
                    as={Input}
                />
                <Field
                    name='login'
                    type='text'
                    placeholder='Логин'
                    className={CN({ [s.edit_input]: !edit })}
                    disabled={!edit}
                    as={Input}
                />

                <ServerMessage />

                {edit ? (
                    formButton()
                ) : (
                    <Button
                        type='button'
                        onClick={handleEdit}>
                        Изменить
                    </Button>
                )}
            </Form>
        </FormikProvider>
    );
};

export default ProfileForm;
