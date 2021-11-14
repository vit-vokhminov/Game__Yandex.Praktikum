export type FetchData = {
    id: number,
    login: string,
    avatar: string,
    score_charleston: number,
};

export type GetPostsResponse = {
    [string]: any,
};

export type GetPostProps = string;

export type GetPostResponse = string;

export type AddPostProps = string;

export type GetMessagesProps = string;

export type AddMessageProps = string;

export type AddMessageToMessageProps = string;

export type GetMessageToMessageProps = string;

export type AllLeaderBoardResponse = { data: FetchData }[];

export type TeamLeaderBoardResponse = { data: FetchData }[];
