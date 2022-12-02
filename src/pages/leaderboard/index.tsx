import React from 'react';
import Main from 'components/main';
import HeaderMenu from 'components/header-menu';
import { ANGELS } from 'components/game/media/js/parameters';
import * as API from 'api/routerLeaders';
import { typeLeader } from 'types/leaderBoards';
import s from './leaderboard.module.css';

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
                <div className={s.table_loaderboard}>
                    {leaders
                        ? leaders.map((elem, i) => (
                              <div
                                  className={s.table_leaderboard_item}
                                  key={elem.id}>
                                  <div className={s.item_number}>{i + 1}</div>
                                  <div className={s.item_avatar}>
                                      <img
                                          src={ANGELS[elem.avatar]?.avatar || ''}
                                          alt='avatar'
                                      />
                                  </div>
                                  <div className={s.item_name}>{elem.name}</div>
                                  <div className={s.item_level}>{elem.level}</div>
                                  <div className={s.item_count}>{elem.record}</div>
                              </div>
                          ))
                        : null}
                </div>
            </Main>
        </>
    );
};

export default LeaderboardPage;
