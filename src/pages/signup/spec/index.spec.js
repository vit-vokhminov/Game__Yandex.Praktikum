import React from 'react';
import { waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from '../../../../mocks/store';
import { signupAction } from '../../../actions/auth/signup';

import Signup from '..';

jest.mock('../../../components/main', () => function Main({ children }) {
    return children;
});

jest.mock('react-router-dom', () => ({
    Link(props) {
        return <a {...props}>Войти</a>;
    },
    Redirect(props) {
        return <span {...props} />;
    },
}));

describe('<Signup />', () => {
    let store;
    let wrapper;



    describe('при сабмите формы', () => {
        it('диспатчим экшн для авторизации', async () => {
            store = mockStore({
                collections: {
                    signup: {
                        data: null,
                        error: null,
                    },
                },
            });
    
            wrapper = mount(
                <Provider store={store}>
                    <Signup />
                </Provider>,
            );

            wrapper.find('Signup').find('ReactFinalForm').props().onSubmit({
                email: 'admin@email.com',
                login: 'admin',
                first_name: 'Admin',
                second_name: 'Root',
                phone: '70000000000',
                password: '12345678',
                confirm: '12345678',
            });
    
            await waitFor(() => {
                expect(store.getActions()).toEqual([
                    signupAction({
                        email: 'admin@email.com',
                        login: 'admin',
                        first_name: 'Admin',
                        second_name: 'Root',
                        phone: '70000000000',
                        password: '12345678',
                    }),
                ]);
            });
        });
    
    });

    describe('редиректим на корневой роут, если', () => {
        it('успешно зарегистрировались', () => {
            store = mockStore({
                collections: {
                    signup: {
                        data: {
                            id: 2021,
                        },
                    },
                },
            });

            wrapper = mount(
                <Provider store={store}>
                    <Signup />
                </Provider>,
            );

            expect(wrapper.find('Signup').find('Redirect')).toHaveLength(1);
            expect(wrapper.find('Signup').find('Redirect').props()).toEqual({
                to: '/',
            });
        });
    });

    describe('ошибку пользователь уже зарегистрирован', () => {
        it('не показываем при загрузке страницы', async () => {
            store = mockStore({
                collections: {
                    signup: {
                        data: null,
                        error: null,
                    },
                },
            });

            wrapper = mount(
                <Provider store={store}>
                    <Signup />
                </Provider>,
            );

            await waitFor(() => {
                expect(wrapper.find({ children: 'Не правильный логин или пароль' })).toHaveLength(0);
            });
        });
        
        it('показываем, если зарегистрирован', async () => {
            store = mockStore({
                collections: {
                    signup: {
                        error: 'Login already exists',
                    },
                },
            });

            wrapper = mount(
                <Provider store={store}>
                    <Signup />
                </Provider>,
            );

            await waitFor(() => {
                expect(wrapper.find({ children: 'Не правильный логин или пароль' })).toHaveLength(1);
            });
        });
    });
});
