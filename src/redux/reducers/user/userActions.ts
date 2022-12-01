import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from 'api/routerUser';

type ThunkLoginProps = {
    email: string;
    password: string;
};

export const login = createAsyncThunk('user/login', async ({ values }: any, thunkApi) => {
    const response: any = await API.login(values);
    return response.data;
});

export const registration = createAsyncThunk('user/login', async ({ values }: any, thunkApi) => {
    const response: any = await API.registration(values);
    return response.data;
});

export const logout = createAsyncThunk('user/logout', async () => {
    const response: any = await API.logout();
    return response.data;
});

export const checkAuth = createAsyncThunk('user/login', async () => {
    const response: any = await API.checkAuth();
    return response.data;
});

export const editUser = createAsyncThunk('user/editUser', async (values: any, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const response: any = await API.editUser(values);   // type response.data = Iuser
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data?.message);
    }
});

export const editUserPassword = createAsyncThunk('user/editUserPassword', async (values: any, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    
    try {
        const response: any = await API.editUserPassword(values);
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response?.data?.message);
    }
});