import React from 'react';
import { useFormik, FormikProvider, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, ButtonSpinner } from 'components/UI/Button';
import { Input } from 'components/UI/Input';

interface profileForm {
    email: string;
    login: string;
}

const ProfileForm = () => {
    const [shipment, setShipment] = React.useState(false);

    const formik = useFormik<profileForm>({
        initialValues: {
            email: '',
            login: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().required('Поле не может быть пустым'),
            login: Yup.string().required('Поле не может быть пустым')
        }),
        onSubmit: (values) => {
            setShipment(true);
            console.log(values);
        }
    });

    return (
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
                    placeholder='Логин'
                    as={Input}
                />
                {shipment ? (
                    <ButtonSpinner />
                ) : (
                    <Button
                        type='submit'
                        disabled={!(formik.isValid && formik.dirty)}>
                        Сохранить
                    </Button>
                )}
            </Form>
        </FormikProvider>
    );
};

export default ProfileForm;
