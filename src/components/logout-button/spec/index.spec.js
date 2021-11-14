import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from '../../../../mocks/store';
import { logoutAction } from '../../../actions/auth/logout';

import LogoutButton from '..';

jest.mock('react-router-dom', () => ({
    Redirect(props) {
        return <span {...props} />;
    },
}));

jest.mock('../../../assets/svg/logout.svg', () => <img />);

describe('<LogoutButton />', () => {
    let store;
    let wrapper;

    store = mockStore({
        collections: {
            logout: {
                data: null,
                error: null,
            },
        },
    });

    wrapper = mount(
        <Provider store={store}>
            <LogoutButton />
        </Provider>,
    );

    it('при клике по кнопке диспатчим экшн для выхода', () => {
        wrapper.find('img').props().onClick();

        expect(store.getActions()).toEqual([
            logoutAction()
        ]);
    });

    it('если пользователь вышел редиректим на страницу входа', () => {
        store = mockStore({
            collections: {
                logout: {
                    data: 'OK',
                    error: null,
                },
            },
        });
    
        wrapper = mount(
            <Provider store={store}>
                <LogoutButton />
            </Provider>,
        );

        expect(wrapper.find('Redirect')).toHaveLength(1);
        expect(wrapper.find('Redirect').props()).toEqual({
            to: '/signin',
        });
    });
});
