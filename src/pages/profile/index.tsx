import React, { ReactElement } from 'react';
import { Main, HeaderMenu, ProfileForm, PasswordForm, AvatarForm } from 'components';
import s from './profile.module.css';

const Profile = (): ReactElement => (
    <>
        <HeaderMenu />
        <Main title='Профиль'>
            <div className={s.profile_main}>
                <AvatarForm />
                <div className={s.form}>
                    <ProfileForm />
                    <PasswordForm />
                </div>
            </div>
        </Main>
    </>
);

export default Profile;
