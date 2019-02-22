import React from 'react';

import { Card, CardBody } from '../../../UI/Card/Card';
import Comment from './Comment/Comment';

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
        </Card>
    )
}

export default Comments;