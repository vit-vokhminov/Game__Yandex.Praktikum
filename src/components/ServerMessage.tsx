import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setServerMessage } from 'redux/store/userReducer';

import { RootStateType } from 'types/ReduxTypes';

function ServerMessage() {
    const serverMessage = useSelector(
        (state: RootStateType) => state.userReducer.serverMessage
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(setServerMessage(''));
        }, 3000);
    }, [serverMessage, dispatch]);

    return (
        <>
            {serverMessage && <div className='form-error'>{serverMessage}</div>}
        </>
    );
}

export default ServerMessage;