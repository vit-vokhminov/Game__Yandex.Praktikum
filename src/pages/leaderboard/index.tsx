import React from 'react';
import Main from 'components/main';
import HeaderMenu from 'components/header-menu';
import { ANGELS } from 'components/game/media/js/parameters';
import './leaderboard.css';
import * as API from 'api/routerLeaders';
import { typeLeader } from 'types/leaderBoards';

const LeaderboardPage = () => {
    const [leaders, setLeaders] = React.useState<typeLeader[]>([]);

    React.useEffect(() => {
        API.getLeaders().then((response) => {
            const sortLeaders = response.data.sort(function (a: typeLeader, b: typeLeader) {
                return b.record - a.record;
            });
            setLeaders(sortLeaders);
        });
    }, []);

    return (
        <>
            <HeaderMenu />
            <Main title='Топ 10 лидеров'>
                <div className='table_loaderboard'>
                    {leaders
                        ? leaders.map((elem, i) => (
                              <div
                                  className='table_leaderboard_item'
                                  key={elem.id}>
                                  <div className='item_number'>{i + 1}</div>
                                  <img
                                      src={ANGELS[elem.avatar]?.avatar || ''}
                                      alt='avatar'
                                      className='item_avatar'
                                  />
                                  <div className='item_name'>{elem.name}</div>
                                  <div className='item_level'>{elem.level}</div>
                                  <div className='item_count'>{elem.record}</div>
                              </div>
                          ))
                        : null}
                </div>
            </Main>
        </>
    );
};

export default LeaderboardPage;
