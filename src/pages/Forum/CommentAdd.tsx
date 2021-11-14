import React, { useState, useRef } from 'react';
import loadable from '@loadable/component';
import { useFormik, FormikProvider, Form } from 'formik';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import EmojiIcon from '../../assets/svg/emoji-emotions.svg';

const Picker = loadable(() => import('emoji-picker-react'), { ssr: false });

type FormValueType = {
    author: string,
    text: string,
};
type HandleAddMessagesType = {
    handleAddMessages: (arg: FormValueType) => void,
    mainComment?: boolean,
};

function CommentAdd(props: HandleAddMessagesType) {
    const login = useSelector(({ collections }) => collections.user.login);
    const [emojiPicker, setEmojiPicker] = useState(false);
    const refTextarea = useRef(null);

    const { handleAddMessages, mainComment } = props;

    const handlerPicker = () => {
        setEmojiPicker((prev) => !prev);
    };
    const formik = useFormik({
        initialValues: {
            author: login,
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

    const onEmojiClick = (e, emojiObject) => {
        const cursor = refTextarea.current.selectionStart;
        const messageUser = formik.values.text;
        const result = messageUser.slice(0, cursor)
            + emojiObject.emoji + messageUser.slice(cursor);

        formik.setValues((prev) => {
            return { ...prev, text: result };
        });
        refTextarea.current.focus();
    };

    const styleEmoji = classNames(mainComment ? 'emoji_picker' : 'emoji_picker_2', { 'picker-show': emojiPicker });
    return (
        <>
            <div className="message_form">
                <FormikProvider value={formik}>
                    <Form>
                        <label>Добавить комментарий</label>
                        <div className={styleEmoji}>
                            <div className="emoji_picker_main">
                                <Picker
                                    preload
                                    onEmojiClick={onEmojiClick}
                                    pickerStyle={{ width: '100%', height: '200px', border: '2px solid #9e9e9e' }}
                                    disableSearchBar
                                    groupVisibility={{
                                        flags: false,
                                        animals_nature: false,
                                        food_drink: false,
                                        travel_places: false,
                                        activities: false,
                                        objects: false,
                                        symbols: false,
                                        recently_used: false,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-text">
                            <textarea
                                ref={refTextarea}
                                name="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.text}
                            />
                            <button className="btn-emoji-picker" type="button" onClick={handlerPicker}><img src={EmojiIcon} alt="Emoji" /></button>

                            <div className="form-button">
                                <button
                                    type="submit"
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
