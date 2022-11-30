import React from 'react';
import * as API from 'api/routerForum';
import { Main, HeaderMenu } from 'components';
import { Link } from 'react-router-dom';
import { PostType } from './type';
import s from './forum.module.css';

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
                <div className={s.forum}>
                    <div className={s.forum_content}>
                        <div className={s.forum_add_topic}>
                            <Link to='/forum-add-topic'>
                                Создать новый раздел
                            </Link>
                        </div>
                        <div className={s.forum_title}>темы</div>
                        <div className={s.forum_themes}>
                            {!!posts &&
                                posts.map(elem => (
                                    <div className={s.forum__theme} key={elem.id}>
                                        <Link to={`/forum-topic/${elem.id}`}>
                                            <div className={s.forum__main}>
                                                <div className={s.forum_themes_title}>
                                                    {elem.title}
                                                </div>
                                            </div>
                                            <div className={s.info}>
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
