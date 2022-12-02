import React from 'react';
import { useAppSelector } from 'redux/store';
import { ANGELS } from 'components/game/media/js/parameters';
import { Button, ButtonSpinner } from 'components/UI/Button';
import CN from 'classnames';
import s from './avatarForm.module.css';

const AvatarForm = () => {
    const { user } = useAppSelector((store: any) => store.userSlice);
    const [file, setFile] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [preview, setPreview] = React.useState<any>(null)

    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        setFile(file);

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
    };

    const handleSendFile = async (e: any) => {
        setLoading(true);
        //await callback(file, fileType);
        setLoading(false);
    };

    const handleFileDelete = async () => {
        setFile(null);
        setPreview(null);
    };

    const componentUpload = () => {
        return (
            <label
                htmlFor='avatar_file_input'
                className={s.btn_file_input}>
                <input
                    id='avatar_file_input'
                    type='file'
                    className={s.file_input__hidden}
                    onChange={handleFileChange}
                    accept='.jpg, .jpeg, .png'
                />
                Изменить
            </label>
        );
    };

    const componentUploading = () => {
        return (
            <>
                <Button
                    type='submit'
                    className={s.btn_file_input}
                    disabled={!file}
                    onClick={handleSendFile}>
                    Сохранить
                </Button>

                <Button
                    type='button'
                    className={s.btn_file_input}
                    onClick={handleFileDelete}>
                    Отменить
                </Button>
            </>
        );
    };

    return (
        <div className={s.avatar}>
            <div className={s.avatar_img}>
                <img
                    src={preview || ANGELS[user.avatar]?.avatar || ''}
                    className={s.avatar_img__size}
                    alt='avatar'
                />
            </div>

            {!file && !loading && componentUpload()}
            {file && !loading && componentUploading()}
            {loading && <ButtonSpinner className={CN(s.btn_file_input, s.btn_file_spinner)} />}
        </div>
    );
};

export default AvatarForm;
