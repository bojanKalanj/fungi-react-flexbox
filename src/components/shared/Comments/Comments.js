import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, deleteComment } from '../../../actions';

import { Card, CardBody } from '../../../UI/Card/Card';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';

class Comments extends Component{
    state = {
        shouldRerender: false
    }
    componentDidMount = () => {
        this.props.fetchComments(this.props.observationId);
    }

    deleteComment = (currentUserToken, commentID) => {
        this.props.deleteComment(currentUserToken, this.props.observationId, commentID);
    }

    renderComments = () => {
        if(this.props.fetchedComments){
            console.log(this.props.fetchedComments.data)
            const comments = this.props.fetchedComments.data;
            return(
                comments.map(comment => {
                    return <Comment 
                            key={comment.id}
                            id={comment.id}
                            body={comment.attributes.body}
                            userId={comment.relationships.user.data.id}
                            username={comment.attributes.username}
                            deleteComment={this.deleteComment}/>
                })
            )
        }
    }

    render(){
        console.log("Comments render");
        return(
            <Card>
                <CardBody>
                    { this.renderComments() }
                </CardBody>
                <CommentForm observationId={this.props.observationId}/>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchedComments: state.fetchedComments.comments
    };
};

export default connect(mapStateToProps, { fetchComments, deleteComment })(Comments);