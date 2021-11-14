import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from '../../../../mocks/store';
import { fetchServiceId } from '../../../actions/oauth/service-id';

import YaOauthButton from '..';

describe('<YaOauthButton />', () => {
    let store;
    let wrapper;

    it('рендерится кнопка для входа через OAuth Yandex', () => {
        store = mockStore({
            collections: {
                serviceId: {
                    data: null,
                },
            },
        });
    
        wrapper = mount(
            <Provider store={store}>
                <YaOauthButton />
            </Provider>,
        );

        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('img').props().alt).toEqual('Signin Yandex ID');
    });

    it('при клике по кнопке диспатчим экшн для получения serviceId', () => {
        process.env.APP_URL = 'http://localhost:5000';

        store = mockStore({
            collections: {
                serviceId: {
                    data: null,
                },
            },
        });
    
        wrapper = mount(
            <Provider store={store}>
                <YaOauthButton />
            </Provider>,
        );
        
        wrapper.find('img').props().onClick();

        expect(store.getActions()).toEqual([fetchServiceId('http://localhost:5000')]);
    });

    it('после получения serviceId редиректим на oauth.yandex.ru/authorize', () => {
        const serviceId = 'service_id_test';
        
        const location = new URL('http://localhost:5000');
        location.assign = jest.fn();
        location.replace = jest.fn();
        location.reload = jest.fn();

        delete window.location;
        window.location = location;

        store = mockStore({
            collections: {
                serviceId: {
                    data: serviceId,
                },
            },
        });
    
        wrapper = mount(
            <Provider store={store}>
                <YaOauthButton />
            </Provider>,
        );

        expect(window.location.href).toMatch(serviceId);
    });
});
