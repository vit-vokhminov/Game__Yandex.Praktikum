import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { avatarAction } from '../../../actions/users/avatar';
import Button from '../../button';
import Angel1 from '../../../assets/img/Angels1.png';
import { getUserAvatar } from '../../../selectors/collections/auth';
import type { Store } from '../../../reducers/types';
import type { Props, FormProps } from './types';

const AvatarForm = ({ avatarLink, avatar }: Props) => {
    const onSubmitHandler = (form: FormProps) => {
            const formData = new FormData();
            formData.append('avatar', form.avatar[0]);

            avatar(formData);
    };

    return (
        <div className="avatar">
            <Form
                onSubmit={onSubmitHandler}
                render={({ handleSubmit, submitting }) => (
                    <form className="avatar_edit" onSubmit={handleSubmit}>
                        <div className="avatar_img">
                            <img
                                className="avatar_img__size"
                                src={avatarLink || Angel1}
                                alt="avatar"
                            />
                        </div>

                        <Field<FileList> name="avatar">
                            {({ input: { value, onChange, ...input } }) => (
                                <label htmlFor="file-input" className="btn-file-input">
                                    <input
                                        {...input}
                                        onChange={({ target }) => onChange(target.files)}
                                        id="file-input"
                                        className="file-input__hidden"
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                    />
                                    Загрузить
                                </label>
                            )}
                        </Field>
                        <Button
                            type="submit"
                            className="btn-file-input"
                            disabled={submitting}
                        >
                            Сохранить
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

const mapStateToProps = (store: Store) => ({
    avatarLink: getUserAvatar(store),
});

const mapDispatchToProps = {
    avatar: avatarAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarForm);
