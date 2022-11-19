import React from 'react';
import { API } from 'api';
import { Main, HeaderMenu } from 'components';
import { Link } from 'react-router-dom';
import './forum.css';
import { PostType } from './type';

function ForumPosts() {
    const [posts, setPosts] = React.useState<PostType[] | null>(null);

    React.useEffect(() => {
        API.getPosts().then(response => {
            setPosts(response.data);
        });
    }, []);

    return (
        <>
            <HeaderMenu />
            <Main title='Форум'>
                <div className='forum'>
                    <div className='forum-content'>
                        <div className='forum-add-topic'>
                            <Link to='/forum-add-topic'>
                                Создать новый раздел
                            </Link>
                        </div>
                        <div className='forum-title'>темы</div>
                        <div className='forum-themes'>
                            {!!posts &&
                                posts.map(elem => (
                                    <div className='forum--theme' key={elem.id}>
                                        <Link to={`/forum-topic/${elem.id}`}>
                                            <div className='forum--main'>
                                                <div className='forum-themes-title'>
                                                    {elem.title}
                                                </div>
                                            </div>
                                            <div className='info'>
                                                <span>
                                                    <b>{elem.author}</b>
                                                </span>
                                                <span>
                                                    {new Date(
                                                        elem.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default ForumPosts;
