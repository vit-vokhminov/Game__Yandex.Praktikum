import React, { ReactElement } from 'react';
import { Main, HeaderMenu, ProfileForm, PasswordForm, AvatarForm } from 'components';
import ServerMessage from 'components/UI/ServerMessage';
import s from './profile.module.css';

const Profile = (): ReactElement => (
    <>
        <HeaderMenu />
        <Main title='Профиль'>
            <div className={s.profile_main}>
                <div className={s.avatar}>
                    <AvatarForm />
                    <ServerMessage />
                </div>
                <div className={s.form}>
                    <ProfileForm />
                    <PasswordForm />
                </div>
            </div>
        </Main>
    </>
);

export default Profile;
