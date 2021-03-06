import React, { Component } from 'react';
import * as api from '../api';

class CommentsCounter extends Component {

    state = {
        id: this.props.id,
        startingVotes: this.props.votes,
        voteChange: 0,
        likeDisabled: false,
        dislikeDisabled: false,
        type: '',
        user: ''
    }

    componentDidMount () {
        this.fetchVotes();
    }

    componentDidUpdate (prevProps) {
        if (prevProps !== this.props) {
            this.fetchVotes()
        }
    }

    render () {
        const { startingVotes, voteChange } = this.state;
        const { user } = this.props;
        return (
            <>
                <p className="VoteCounter__Likes">Likes: {startingVotes + voteChange}</p>
                {
                    user === '' ? <></> :
                    <>
                    <button
                    disabled={voteChange === 1}
                    onClick={(() => {
                        this.handleClick(1)
                    })}
                    className="FullArticle__voteButton"
                    >
                    <img
                    src="https://icons-for-free.com/iconfiles/png/512/thumbs+thumbs+up+up+vote+icon-1320184637569349118.png"
                    alt="thumbs up"
                    className="FullArticle__Thumb" />   
                </button>
                <button
                    disabled={voteChange === 0}
                    onClick={(() => {
                        this.handleClick(0)
                    })}
                    className="FullArticle__voteButton">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/400px-Question_mark_%28black%29.svg.png"
                    alt="no comment"
                    className="FullArticle__Thumb" /></button>
                <button
                    disabled={voteChange === -1}
                    onClick={(() => {
                        this.handleClick(-1)
                    })}
                    className="FullArticle__voteButton">
                    <img
                    src="https://cdn0.iconfinder.com/data/icons/communication-183/80/thumbs-down-512.png"
                    alt="thumbs down"
                    className="FullArticle__Thumb" />
                            </button>
                        </>
                }
            </>
        );
    }

    handleClick = (voteIncrement) => {
        const { id, voteChange } = this.state;
        const { type } = this.props;
        let votes = voteIncrement;
        if (voteChange >= 1 && voteIncrement === 1) votes = 0;
        if (voteChange <= -1 && voteIncrement === -1) votes = 0;
        if (voteIncrement === 0 && voteChange === -1) votes = 1;
        if (voteIncrement === 0 && voteChange === 1) votes = -1;
        this.setState((current) => {
            return { voteChange: current.voteChange + votes };
        });
        api.voteOnArticle(id, votes, type)
            .then(() => {
                localStorage.setItem(`articleVotes${id}`, JSON.stringify(this.state));
        })
    }

    fetchVotes = () => {
        const { id } = this.state;
        const storedVotes = JSON.parse(localStorage.getItem(`articleVotes${id}`))
        if (storedVotes){
            this.setState(() => {
                return { voteChange: storedVotes.voteChange, startingVotes: storedVotes.startingVotes };
            });
        }
    }
}

export default CommentsCounter;