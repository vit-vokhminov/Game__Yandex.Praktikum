import React from 'react';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FormCommentAdd } from './types';
import s from './forum.module.css';


type propsTypes = {
    handleAddMessages: (arg: FormCommentAdd)=> void
}

function CommentAdd(props: propsTypes) {
    const { handleAddMessages } = props;

    const formik = useFormik({
        initialValues: {
            author: 'testAuthor',
            text: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            text: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(500, 'Не более 500 символов')
                .required('Не заполнен текст поста'),
        }),
        onSubmit: (value, { resetForm }) => {
            handleAddMessages(value);
            resetForm();
        },
    });

    return (
        <>
            <div className={s.message_form}>
                <FormikProvider value={formik}>
                    <Form>
                        <label>Добавить комментарий</label>
                        <div className={s.form_text}>
                            <Field
                                as='textarea'
                                type='text'
                                name='text'
                            ></Field>
                            <div className={s.form_button}>
                                <button
                                    type='submit'
                                    disabled={!(formik.isValid && formik.dirty)}
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </>
    );
}

export default CommentAdd;
