import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, deleteComment, editComment } from '../../../actions';

import { Card, CardBody } from '../../../UI/Card/Card';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';
import './Comments.css';

class Comments extends Component{
    state = {
        newCommentFormValue: '',
        commentToEditId: null
    }
    componentDidMount = () => {
        this.props.fetchComments(this.props.observationId);
    }

    deleteComment = (currentUserToken, commentID) => {
        this.props.deleteComment(currentUserToken, this.props.observationId, commentID);
    }

    editComment = (commentBody, commentID) => {
        console.log(commentBody);
        const newCommentFormValue = commentBody;
        const commentToEditId = commentID;
        this.setState({
            newCommentFormValue,
            commentToEditId
        })
    }

    onEdit = e => {
        let newCommentFormValue = e.target.value;
        this.setState({
            newCommentFormValue
        })
    }

    cancelEdit = () => {
        let commentToEditId = null;
        this.setState({
            commentToEditId
        })
    }

    sendEditedComment = commentID => {
        const { currentUserToken, observationId, userID } = this.props;
        const comment = {
            observation_id: observationId, 
            user_id: userID, 
            body: this.state.newCommentFormValue 
           }
        this.props.editComment(comment, currentUserToken, observationId, commentID);
        this.cancelEdit();
    }

    renderComments = () => {
        if(this.props.fetchedComments){
            const comments = this.props.fetchedComments.data;
            return(
                comments.map(comment => {
                    let cmnt = <Comment 
                        key={comment.id}
                        id={comment.id}
                        body={comment.attributes.body}
                        userId={comment.relationships.user.data.id}
                        username={comment.attributes.username}
                        deleteComment={this.deleteComment}
                        editComment={() => this.editComment(comment.attributes.body, comment.id)}/>
                        
                        if(comment.id === this.state.commentToEditId){
                            cmnt = <div className="edit-comment-form">
                                        <textarea 
                                            rows="7" 
                                            type="textarea"
                                            value={this.state.newCommentFormValue}
                                            placeholder="Izmenite vaš komentar..."
                                            onChange={(e) => this.onEdit(e)}
                                        />
                                        <div className="edit-comments-btns">
                                            <button className="edit-btn edit-btn-red" onClick={() => this.sendEditedComment(comment.id)}>Izmeni</button>
                                            <button className="edit-btn edit-btn-green" onClick={this.cancelEdit}>Odustani</button>
                                        </div>
                                    </div>
                        }
                    return cmnt 
                })
            )
        }
    }

    render(){
        console.log(this.props.currentUserToken);
        return(
            <Card>
                <CardBody>
                    { this.renderComments() }
                </CardBody>
                <CommentForm newCommentFormValue={this.state.newCommentFormValue} observationId={this.props.observationId}/>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchedComments: state.fetchedComments.comments,
        currentUserToken: state.auth.token,
        userID: state.auth.userID,
    };
};

export default connect(mapStateToProps, { fetchComments, deleteComment, editComment })(Comments);