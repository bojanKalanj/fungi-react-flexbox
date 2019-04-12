import React from 'react';

import { Card, CardBody } from '../../../UI/Card/Card';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';

const Comments = () => {
    return(
        <Card>
            <CardBody>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </CardBody>
            <CommentForm />
        </Card>
    )
}

export default Comments;