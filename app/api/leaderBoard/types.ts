export type FetchData = {
    id: number,
    login: string,
    avatar: string,
    score_charleston: number,
};

export type UserLeaderBoardProps = {
    data: FetchData,
    ratingFieldName: 'score_charleston',
    teamName: 'charleston'
};

export type AllLeaderBoardProps = {
    ratingFieldName: 'score_charleston',
    cursor: 0,
    limit: 10
};

export type TeamLeaderBoardProps = {
    ratingFieldName: 'score_charleston',
    cursor: 0,
    limit: 10
};

export type UserLeaderBoardResponse = string;

export type AllLeaderBoardResponse = { data: FetchData }[];

export type TeamLeaderBoardResponse = { data: FetchData }[];
