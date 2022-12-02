export type postType = {
    author: string;
    createdAt: string;
    id: number;
    text: string;
    title: string;
    updatedAt: string;
};

export type PropsPostType = {
    post: postType | null;
};

export type MessageType = {
    author: string;
    createdAt: string;
    id: number;
    messageId: null;
    postId: number;
    text: string;
    updatedAt: string;
};

export type PropsCommentType = {
    message: MessageType;
};

export type FormCommentAdd = {
    author: string;
    text: string;
};

export type valueAddPostType = {
    title: string;
    author: string;
    text: string;
};
