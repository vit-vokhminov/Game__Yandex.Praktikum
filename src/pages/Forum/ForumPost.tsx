import React from 'react';
import { Topic, Comment, CommentAdd } from './index';
import * as API from 'api/routerForum';
import { useParams } from 'react-router-dom';
import Main from 'components/main';
import HeaderMenu from 'components/header-menu';
import { PostType, MessageType } from './type';
import s from './forum.module.css';

interface UseParamsTypes {
    id: string;
}

type addMessageValueType = {
    author: string;
    text: string;
};

function ForumPost() {
    const [post, setPost] = React.useState<PostType | null>(null);
    const [messages, setMessages] = React.useState<MessageType[]>([]);
    const { id } = useParams<UseParamsTypes>();

    const handleAddMessages = React.useCallback(
        (value: addMessageValueType) => {
            API.addMessage(id, JSON.stringify(value))
                .then(response => {
                    setMessages([...messages, response.data]);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        [id, messages]
    );

    const handleGetMessages = React.useCallback(() => {
        API.getMessages(id).then(response => {
            setMessages(response.data);
        });
    }, [id, setMessages]);

    React.useEffect(() => {
        API.getPost(id).then(response => {
            setPost(response.data);
            handleGetMessages();
        });
    }, [id, handleGetMessages]);

    return (
        <>
            <HeaderMenu />
            <Main title='Форум' style={{width: "700px"}}>
                <div className={s.forum}>
                    <div className={s.forum_content}>
                        <Topic post={post} />

                        {
                            <div className={s.messages}>
                                {messages.length ? (
                                    messages.map(elem => (
                                        <Comment key={elem.id} message={elem} />
                                    ))
                                ) : (
                                    <p>Комментариев нет</p>
                                )}
                            </div>
                        }

                        <CommentAdd handleAddMessages={handleAddMessages} />
                    </div>
                </div>
            </Main>
        </>
    );
}

export default ForumPost;
