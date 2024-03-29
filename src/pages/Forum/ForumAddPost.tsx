import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, Field, Form } from 'formik';
import * as Yup from 'yup';
import * as API from 'api/routerForum';
import{ Main, HeaderMenu } from 'components';
import s from './forum.module.css';

function ForumAddPost() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            author: 'testAuthor',
            text: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(150, 'Не более 150 символов')
                .required('Не указан заголовок'),
            text: Yup.string()
                .min(3, 'Не менее 3 символов')
                .max(500, 'Не более 500 символов')
                .required('Не заполнен текст поста'),
        }),
        onSubmit: values => {
            API.addPost(JSON.stringify(values))
                .then(response => {
                    if (response.status === 200) {
                        navigate('/forum');
                    }
                })
                .catch(error => {
                    console.error(error)
                });
        },
    });

    return (
        <>
            <HeaderMenu />
            <Main title='Форум'>
                <div className={s.forum}>
                    <div className={s.forum_content}>
                        <FormikProvider value={formik}>
                            <Form>
                                <div className={s.form_info}>
                                    <label>
                                        Заголовок
                                        <Field
                                            type='text'
                                            id='title'
                                            name='title'
                                        />
                                    </label>
                                </div>
                                <div className='form-text'>
                                    <label>
                                        Описание темы
                                        <Field
                                            as='textarea'
                                            id='text'
                                            type='text'
                                            name='text'
                                        ></Field>
                                    </label>
                                </div>
                                <div className={s.form_button}>
                                    <button
                                        type='submit'
                                        disabled={
                                            !(formik.isValid && formik.dirty)
                                        }
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default ForumAddPost;
