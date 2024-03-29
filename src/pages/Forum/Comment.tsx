import React from 'react';
import * as API from 'api/routerForum';
import CommentAdd from './CommentAdd';
import { useParams } from 'react-router-dom';
import { PropsCommentType, MessageType, FormCommentAdd } from './types';
import s from './forum.module.css';

type ParamsType = {
    id: string;
};

type commentValueType = {
    author: string,
    text: string,
    messageId: number,
}

function Comment(props: PropsCommentType) {
    const { message } = props;
    const [answers, setAnswers] = React.useState<MessageType[]>([]);
    const [viewForn, setViewForn] = React.useState<boolean>(false);
    const { id } = useParams<ParamsType>();

    const handleAddMessagesToMessages = React.useCallback(
        (value: FormCommentAdd) => {
            const commentValue: commentValueType = {...value, messageId: message.id}

            API.addMessageToMessage(id, JSON.stringify(commentValue))
                .then((response) => {
                    setAnswers([...answers, response.data]);
                    setViewForn(!viewForn);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [id, message, answers, viewForn]
    );

    React.useEffect(() => {
        API.getMessageToMessage(id, message.id)
            .then((response) => {
                setAnswers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id, message]);

    return (
        <>
            <div className={s.message}>
                <div className={s.message_main}>
                    <div className={s.info}>
                        <span>
                            <b>{message.author || ''}</b>
                        </span>
                        <span>{message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'Без даты'}</span>
                    </div>
                    <p>{message.text}</p>
                </div>
                <div className={s.answers}>
                    <div className={s.answer_main}>
                        {!!answers.length &&
                            answers.map((elem, i) => (
                                <Comment
                                    key={i}
                                    message={elem}
                                />
                            ))}
                    </div>
                </div>
                <div
                    className={s.message_answer}
                    onClick={() => setViewForn(!viewForn)}>
                    {viewForn ? 'Скрыть' : 'Ответить'}
                </div>
                {viewForn && <CommentAdd handleAddMessages={handleAddMessagesToMessages} />}
            </div>
        </>
    );
}

export default Comment;
