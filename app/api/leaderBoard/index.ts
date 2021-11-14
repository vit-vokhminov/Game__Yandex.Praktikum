import axios from '../../utils/axios-instance';
import type {
    UserLeaderBoardProps,
    AllLeaderBoardProps,
    TeamLeaderBoardProps,
    UserLeaderBoardResponse,
    AllLeaderBoardResponse,
    TeamLeaderBoardResponse,
} from './types';

export const addUserLeaderBoard = (props: UserLeaderBoardProps): Promise<UserLeaderBoardResponse> => axios.post<UserLeaderBoardResponse>('/leaderboard', {
    data: props,
    ratingFieldName: 'score_charleston',
    teamName: 'charleston',
})
    .then(({ data }) => data);

export const getAllLeaderBoard = (props: AllLeaderBoardProps): Promise<AllLeaderBoardResponse> => axios.post<AllLeaderBoardResponse>('/leaderboard/all', props)
    .then(({ data }) => data);

export const getTeamLeaderBoard = (props: TeamLeaderBoardProps): Promise<TeamLeaderBoardResponse> => axios.post<TeamLeaderBoardResponse>('/leaderboard/:charleston', props)
    .then(({ data }) => data);
