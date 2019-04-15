import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../../actions';

import { Card, CardBody } from '../../../UI/Card/Card';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';

class Comments extends Component{
    componentWillMount = () => {
        this.props.fetchComments(this.props.observationId);
    }

    renderComments = () => {
        if(this.props.fetchedComments){
            console.log(this.props.fetchedComments.data)
            const comments = this.props.fetchedComments.data;
            return(
                comments.map(comment => {
                    return <Comment 
                            key={comment.id}
                            body={comment.attributes.body}
                            userId={comment.relationships.user.data.id}
                            username={comment.attributes.username}/>
                })
            )
        }
    }

    render(){
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

export default connect(mapStateToProps, { fetchComments })(Comments);