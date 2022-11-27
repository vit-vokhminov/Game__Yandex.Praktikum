import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { setServerMessage } from 'redux/reducers/user/userSlice';
import s from './serverMessage.module.css'

function ServerMessage() {

	const { serverMessage } = useAppSelector((store: any) => store.userSlice);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if(serverMessage != ""){
            setTimeout(() => {
                dispatch(setServerMessage(''));
            }, 3000);
        }
    }, [serverMessage, dispatch]);

    return (
        <>
            {serverMessage && <div className={s.server_message}>{serverMessage}</div>}
        </>
    );
}

export default ServerMessage;
