import React from 'react';
import { mount } from 'enzyme';

import ErrorPage from '..';

jest.mock('../../../components/main', () => function Main({ children }) {
    return children;
});

jest.mock('react-router-dom', () => ({
    Link(props) {
        return <a {...props}>Вернуться</a>;
    },
}));

describe('<ErrorPage />', () => {
    let wrapper;

    describe('показываем ошибку 404, если', () => {
        it('аргумент number равен 404', () => {
            wrapper = mount(
                <ErrorPage number={404} />
            );

            expect(wrapper.find({ children: 'Упс, куда-то вы забрели..' })).toHaveLength(1);
            expect(wrapper.find({ children: 'К сожалению, запрашиваемая страница не найдена' })).toHaveLength(1);
        });
    });

    describe('показываем ошибку 500, если', () => {
        it('аргумент number равен 500', () => {
            wrapper = mount(
                <ErrorPage number={500} />
            );

            expect(wrapper.find({ children: 'Ошибка сервера!' })).toHaveLength(1);
            expect(wrapper.find({ children: 'Мы о ней знаем и скоро исправим!' })).toHaveLength(1);
        });
    });

    describe('при клике по кнопке Вернуться', () => {
        it('переходим на главную страницу', () => {
            wrapper = mount(
                <ErrorPage number={500} />
            );

            expect(wrapper.find({ children: 'Вернуться' }).props()).toEqual({
                to: '/',
                children: 'Вернуться',
            });
        })
    });
});
