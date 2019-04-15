import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FlexContainer } from '../../../../UI/Container/Container';
import UserAvatar from '../../../pages/User/UserAvatar/UserAvatar';
import uerAvatarPlaceholderImg from '../../../../assets/hari.jpg';
import './Comment.css';

class Comment extends Component{
    render(){
        const { currentUserId } = this.props;
        const { userId } = this.props;
        const { username } = this.props;
        // console.log("currentUserId ", currentUserId);
        // console.log("userId ", userId);
        // console.log(this.props.username)
        return(
            <div style={{padding: '10px'}}>
                <FlexContainer>
                    <div style={{width: '20%'}}>
                        <UserAvatar 
                            userId={userId}
                            src={uerAvatarPlaceholderImg} 
                            alt={username}
                            userName={username}/>
                    </div>
                    <div style={{width: '75%', border: '1px solid rgba(81, 54, 41, .2)', padding: '0 2%'}}>
                        <p>{ this.props.body }</p>
                    </div>
                    {currentUserId === userId? <div className="comment-btns">
                        <button className="comment-btn comment-btn-green">izmeni</button>
                        <button className="comment-btn comment-btn-red">obriši</button>
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