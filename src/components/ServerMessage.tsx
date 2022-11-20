import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { userSlice } from 'redux/reducers/user/userSlice';
//import { RootStateType } from 'types/ReduxTypes';

function ServerMessage() {
    const { serverMessage } = useAppSelector((store: any) => store.userSlice);
    const dispatch = useAppDispatch();

    const { setServerMessage } = userSlice.actions;

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(setServerMessage(''));
        }, 3000);
    }, [serverMessage, dispatch]);

    return <>{serverMessage && <div className='form-error'>{serverMessage}</div>}</>;
}

export default ServerMessage;
