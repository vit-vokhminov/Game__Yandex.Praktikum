import React from 'react';
import { useFormik, FormikProvider, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, ButtonSpinner } from 'components/UI/Button';
import { Input } from 'components/UI/Input';
import { ErrorText } from 'components/UI/ErrorText';
import s from './passwordForm.module.css';

interface passwordForm {
    oldPassword: string;
    newPassword: string;
    confirm: string;
}

const PasswordForm = () => {
    const [shipment, setShipment] = React.useState(false);

    const formik = useFormik<passwordForm>({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirm: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Поле не может быть пустым'),
            newPassword: Yup.string().min(6, 'Не менее 6 символов').required('Не менее 6 символов'),
            confirm: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают')
                .required('Введите новый пароль')
        }),
        onSubmit: (values) => {
            setShipment(true);
            console.log(values);
        }
    });

    return (
        <FormikProvider value={formik}>
            <Form>
                <div className={s.password_form}>
                    <Field
                        name='oldPassword'
                        type='password'
                        placeholder='Старый пароль'
                        as={Input}
                    />
                    <Field
                        name='newPassword'
                        type='password'
                        placeholder='Новый пароль'
                        as={Input}
                    />
                    <Field
                        name='confirm'
                        type='password'
                        placeholder='Новый пароль (ещё раз)'
                        as={Input}
                    />
                    <ErrorText>
                        <ErrorMessage name='confirm' />
                    </ErrorText>

                    {shipment ? (
                        <ButtonSpinner />
                    ) : (
                        <Button
                            type='submit'
                            disabled={!(formik.isValid && formik.dirty)}>
                            Изменить пароль
                        </Button>
                    )}
                </div>
            </Form>
        </FormikProvider>
    );
};

export default PasswordForm;
