export type PostType = {
    author: string,
    createdAt: string,
    id: number,
    text: string,
    title: string,
    updatedAt: string,
}

export type PropsPostType = {
    post: PostType | null
}

export type MessageType = {
    author: string,
    createdAt: string,
    id: number,
    messageId: null,
    postId: number
    text: string,
    updatedAt: string,
}

export type PropsCommentType = {
    message: MessageType
}
