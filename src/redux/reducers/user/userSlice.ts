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
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.accessToken);
                state.user = action.payload.user;
                state.userAuth = true;
                state.isLoading = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state, action: any) => {
                state.isLoading = false;
                state.serverMessage = action.payload?.message;
                localStorage.removeItem('token');
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('token');
                state.user = null;
                state.userAuth = false;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.rejected, (state, action: any) => {
                state.isLoading = false;
                state.serverMessage = action.payload?.message;
            });
    }
});

export const { setServerMessage, setGameStart } = userSlice.actions;
export default userSlice.reducer;
