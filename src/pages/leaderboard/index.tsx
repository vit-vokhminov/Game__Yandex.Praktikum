import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './leaderboard.css';
import Main from '../../components/main';
import LeaderboardItem from './leaderboardItem';
import { getLeaderboard } from '../../selectors/widgets/app';
import type { Store } from '../../reducers/types';
import { getLeaderboardList } from '../../actions/app';
import { FetchData } from '../../../app/api/leaderBoard/types';

type Props = {
    leaderboardList: { data: FetchData }[],
    fetchLeaderboard: typeof getLeaderboardList,
};

const LeaderboardPage = ({ leaderboardList, fetchLeaderboard }: Props) => {
    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <Main title="Лидеры">
            <div className="table-loaderboard">
                {
                    leaderboardList.length > 0
                        ? leaderboardList.map((item, index) => {
                            const {
                                id, avatar, login, score_charleston,
                            } = item.data;
                            return (
                                <LeaderboardItem
                                    key={id}
                                    avatar={avatar}
                                    index={index + 1}
                                    login={login}
                                    score={score_charleston}
                                />
                            );
                        })
                        : <div className="empty__list">Список пуст</div>
                }
            </div>
        </Main>
    );
};

const mapStateToProps = (store: Store) => ({
    leaderboardList: getLeaderboard(store),
});
const mapDispatchToProps = {
    fetchLeaderboard: getLeaderboardList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage);
