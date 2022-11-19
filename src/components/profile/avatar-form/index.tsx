import React from 'react';
import { useSelector } from 'react-redux';
import { ANGELS } from 'components/game/media/js/parameters';
import s from './avatarForm.module.css';

const AvatarForm = () => {

    const { user } = useSelector((state: any) => state.userReducer);

    return (
        <div className={s.avatar}>
            <form>
                <div className={s.avatar_img}>
                    <img
                        src={ANGELS[user.avatar]?.avatar || ""}
                        className={s.avatar_img__size}
                        alt='avatar'
                    />
                </div>

                <label htmlFor='avatar_file_input' className={s.btn_file_input}>
                    <input
                        id='avatar_file_input'
                        className={s.file_input__hidden}
                        type='file'
                        accept='.jpg, .jpeg, .png'
                    />
                    Загрузить
                </label>

                <button type='submit' className={s.btn_file_input}>
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default AvatarForm;
