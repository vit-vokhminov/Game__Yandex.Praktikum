import React from "react";
import { PropsPostType } from "./type";
import s from './forum.module.css';

function Topic({ post }: PropsPostType) {
    return (
        <>
            {!!post && (
                <div className={s.forum__theme}>
                    <div className={s.forum__theme_content}>
                        <div className={s.forum__main}>
                            <div className={s.forum_themes_title}>
                                <b>{post.title}</b>
                            </div>
                            <div className={s.forum_themes_text}>{post.text}</div>
                        </div>

                        <div className={s.info}>
                            <span>
                                <b>{post.author}</b>
                            </span>
                            <span>
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Topic;
