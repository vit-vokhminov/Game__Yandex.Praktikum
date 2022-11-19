import React from "react";
import { PropsPostType } from "./type";

function Topic({ post }: PropsPostType) {
    return (
        <>
            {!!post && (
                <div className="forum--theme">
                    <div className="forum--theme-content">
                        <div className="forum--main">
                            <div className="forum-themes-title">
                                <b>{post.title}</b>
                            </div>
                            <div className="forum-themes-text">{post.text}</div>
                        </div>

                        <div className="info">
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
