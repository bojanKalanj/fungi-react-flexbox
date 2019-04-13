import React from 'react';

import { Card, CardBody } from '../../../UI/Card/Card';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';

const Comments = props => {
    return(
        <Card>
            <CardBody>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </CardBody>
            <CommentForm observationId={props.observationId}/>
        </Card>
    )
}

export default Comments;