import React from 'react';
import '../../Frontpage.css'
import VotesCounter from './VotesCounter';

const SingleComment = ({
    author,
    body,
    comment_id,
    created_at,
    votes,
    handleDelete,
    user
}) => {
    return (
        <section className="SingleArticle__comment">
            <p
                className="SingleComment__author">Author: {author} at {`Created: ${created_at.slice(0, 10)} at ${created_at.slice(11, 19)}`}</p>
            <p className="SingleComment__body">{body}</p>
            <VotesCounter
                type={"comments"}
                votes={votes}
                id={comment_id}
                user={user}
            />
            { author === user ?
                <button onClick={() => {
                    handleDelete(comment_id);
                }}>remove comment</button>
                : <></>}
        </section>
    );
};

export default SingleComment;