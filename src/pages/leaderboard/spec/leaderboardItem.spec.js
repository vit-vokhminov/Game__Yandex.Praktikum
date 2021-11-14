import React from 'react';
import {mount} from 'enzyme';

import LeaderboardItem from '../leaderboardItem';

const avatarLocalPath = '/assets/svg/c30d762f2c68604b6157e1c5c76be84d.svg';

jest.mock('../../../assets/svg/account_circle.svg', () => {
    return avatarLocalPath;
});

describe('<LeaderboardItem />', () => {
    let wrapper;

    it('рендерим параметры index, login, score', () => {
        wrapper = mount(
            <LeaderboardItem
                key={0}
                avatar={null}
                index={1}
                login='test_login'
                score={243}
            />
        );

        expect(wrapper.find('.item-number').find({children: 1})).toHaveLength(1);
        expect(wrapper.find('.item-name').find({children: 'test_login'})).toHaveLength(1);
        expect(wrapper.find('.item-count').find({children: 243})).toHaveLength(1);
    });

    describe('если avatar', () => {
        it('null, рендерим картинку', () => {
            expect(wrapper.find('img')).toHaveLength(1);
            expect(wrapper.find('img').props().src).toEqual(avatarLocalPath);
        });

        //it('не null, рендерим аватар', () => {
        //    const avatarPath = 'test_avatar_path';

        //    wrapper=mount(
        //        <LeaderboardItem
        //            key={0}
        //            avatar={avatarPath}
        //            index={1}
        //            login='test_login'
        //            score={243}
        //        />
        //    );

        //    expect(wrapper.find('img')).toHaveLength(1);
        //    expect(wrapper.find('img').props().src).toMatch(avatarPath);
        //});
    });
});
