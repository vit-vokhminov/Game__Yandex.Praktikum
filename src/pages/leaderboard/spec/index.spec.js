import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { mockStore } from '../../../../mocks/store';
import { getLeaderboardList } from '../../../actions/app';

import LeaderboardPage from '..';

jest.mock('../../../components/main', () => function Main({ children }) {
    return children;
});

jest.mock('../leaderboardItem', () => function LeaderboardItem() {
    return <div></div>;
});

describe('<LeaderboardPage />', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore({
            widgets: {
                app: {
                    leaderboard: [],
                },
            },
        });
    });


    it('в useEffect диспатч fetchLeaderboard', () => {
        wrapper = mount(
            <Provider store={store}>
                <LeaderboardPage />
            </Provider>,
        );

        expect(store.getActions()).toEqual([
            getLeaderboardList()
        ]);
    });

    describe('leaderboardList', () => {
        it('пустой массив, показываем сообщение', () => {
            expect(wrapper.find({ children: 'Список пуст' })).toHaveLength(1);
        });

        it('непустой массив, рендерим компонет LeaderboardItem', () => {
            store = mockStore({
                widgets: {
                    app: {
                        leaderboard: [
                            {
                                "data": {
                                    "id": 8772,
                                    "login": "ewq",
                                    "avatar": null,
                                    "score_charleston": 243
                                }
                            },
                            {
                                "data": {
                                    "id": 8013,
                                    "login": "alexgavr8989",
                                    "avatar": null,
                                    "score_charleston": 98
                                }
                            }
                        ],
                    },
                },
            });

            wrapper = mount(
                <Provider store={store}>
                    <LeaderboardPage />
                </Provider>,
            );
            
            expect(wrapper.find('LeaderboardItem')).toHaveLength(2);
        });
    });
});
