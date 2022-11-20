import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './userActions';

export type TypeUser = {
    email: string;
    login: string;
    isActivated: boolean;
};
export type TypeState = {
    user: TypeUser | null;
    userAuth: boolean;
    isLoading: boolean;
    serverMessage: string;
    gameRunner: boolean;
};

const initialState: TypeState = {
    user: null,
    userAuth: false,
    isLoading: true,
    serverMessage: '',
    gameRunner: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setServerMessage(state, action) {
            state.serverMessage = action.payload;
        },
        setGameStart(state, action) {
            state.gameRunner = action.payload;
        }
    },
    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<any>) => {
            localStorage.setItem('token', action.payload.accessToken);
            state.user = action.payload.user;
            state.userAuth = true;
            state.isLoading = false;
        },
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.serverMessage = action.payload?.message;
            localStorage.removeItem('token');
        },
        [logout.fulfilled.type]: (state, action: PayloadAction<any>) => {
            localStorage.removeItem('token');
            state.user = null;
            state.userAuth = false;
        },
        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.rejected.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.serverMessage = action.payload?.message;
        }
    }
});

export default userSlice.reducer;
