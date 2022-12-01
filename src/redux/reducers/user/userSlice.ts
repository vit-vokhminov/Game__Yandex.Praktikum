import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, editUser, editUserPassword } from './userActions';
import { IactionUser, Iuser } from './userTypes';

export type TypeState = {
    user: Iuser | null;
    userAuth: boolean;
    isLoading: boolean;
    loadingEditUser: boolean;
    loadingEditPassword: boolean;
    serverMessage: string;
    gameRunner: boolean;
};

const initialState: TypeState = {
    user: null,
    userAuth: false,
    isLoading: true,
    loadingEditUser: false,
    loadingEditPassword: false,
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
            // авторизация - регистрация
            .addCase(login.fulfilled, (state, action: PayloadAction<IactionUser>) => {
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
            // логоут
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
            })
            // изменение данных пользователя
            .addCase(editUser.fulfilled, (state, action: PayloadAction<Iuser>) => {
                if(state.user){
                    state.user.login = action.payload.login;
                    state.user.email = action.payload.email;
                }
                state.loadingEditUser = false;
                state.serverMessage = "Ваши данные, успешно изменены";
            })
            .addCase(editUser.pending, (state) => {
                state.loadingEditUser = true;
            })
            .addCase(editUser.rejected, (state, action: any) => {
                state.loadingEditUser = false;
                state.serverMessage = action.payload?.message;
            })
            // смена пароля
            .addCase(editUserPassword.fulfilled, (state, action: PayloadAction<IactionUser>) => {
                state.loadingEditPassword = false;
                state.serverMessage = "Ваш пароль, успешно изменен";
            })
            .addCase(editUserPassword.pending, (state) => {
                state.loadingEditPassword = true;
            })
            .addCase(editUserPassword.rejected, (state, action: any) => {
                state.loadingEditPassword = false;
                state.serverMessage = action.payload?.message;
            });
    }
});

export const { setServerMessage, setGameStart } = userSlice.actions;
export default userSlice.reducer;
