import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_AUTH } from 'api/auth';

type TPropsLogin = {
    username: string;
    password: string;
};

export const login = createAsyncThunk("user/login", async ({values}: any, thunkApi) => {
    const response: any = await API_AUTH.login(values);
    return response.data;
});

export const registration = createAsyncThunk("user/login", async ({values}: any, thunkApi) => {
    const response: any = await API_AUTH.registration(values);
    return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
    const response: any = await API_AUTH.logout();
    return response.data;
});

export const checkAuth = createAsyncThunk("user/login", async () => {
    const response: any = await API_AUTH.checkAuth();
    return response.data;
});