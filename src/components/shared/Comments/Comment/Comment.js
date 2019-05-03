import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';

import { FlexContainer } from '../../../../UI/Container/Container';
import UserAvatar from '../../../pages/User/UserAvatar/UserAvatar';
import uerAvatarPlaceholderImg from '../../../../assets/hari.jpg';
import './Comment.css';

class Comment extends Component{
    deleteComment = (id) => {
        const { currentUserToken } = this.props;
        this.props.deleteComment(currentUserToken, id)
    }

    render(){
        const { currentUserId } = this.props;
        const { userId } = this.props;
        const { username } = this.props;
        const { id } = this.props;
        // console.log("currentUserId ", currentUserId);
        // console.log("userId ", userId);
        console.log(this.props.id)
        return(
            <div style={{padding: '10px', borderBottom: '1px solid rgba(81, 54, 41, .2)'}}>
                <FlexContainer>
                    <div style={{width: '20%'}}>
                        <UserAvatar 
                            userId={userId}
                            src={uerAvatarPlaceholderImg} 
                            alt={username}
                            userName={username}/>
                    </div>
                    <div style={{width: '75%'}}>
                        <p>{ this.props.body }</p>
                    </div>
                    {currentUserId === userId? <div className="comment-btns">
                        <button 
                            className="comment-btn comment-btn-green"
                            onClick={this.props.editComment}>
                                izmeni
                        </button>
                        <button 
                            className="comment-btn comment-btn-red"
                            onClick={() => this.deleteComment(id)}>
                                obriši
                        </button>
                    </div>: null}
                    
                </FlexContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.auth.userID,
        currentUserToken: state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Comment);