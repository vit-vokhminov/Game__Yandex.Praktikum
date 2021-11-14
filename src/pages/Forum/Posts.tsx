import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../components/main';
import { PostType } from './type';
import { fetchPosts } from '../../actions/forum';
import './forum.css';

function Posts() {
    const dispatch = useDispatch();
    const forumData: PostType[] = useSelector(({ widgets }) => widgets.forum.posts);
    React.useEffect(() => {
        dispatch(fetchPosts());
    }, []);
    return (
        <Main title="Форум">
            <div className="forum">
                <div className="forum-content">
                    <div className="forum-add-topic">
                        <Link to="/forum-add-topic">Создать новый раздел</Link>
                    </div>
                    <div className="forum-title">темы</div>
                    <div className="forum-themes">
                        {!!forumData
                            && forumData.map((elem) => (
                                <div className="forum--theme" key={elem.id}>
                                    <Link to={`/forum/${elem.id}`}>
                                        <div className="forum--main">
                                            <div className="forum-themes-title">
                                                {elem.title}
                                            </div>
                                        </div>
                                        <div className="info">
                                            <span>
                                                <b>{elem.author}</b>
                                            </span>
                                            <span>
                                                {new Date(elem.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default Posts;
