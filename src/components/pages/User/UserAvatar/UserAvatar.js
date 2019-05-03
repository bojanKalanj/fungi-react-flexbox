import React from 'react';

import './UserAvatar.css';
import { AnchorTag } from '../../../../UI/AnchorTag/AnchorTag';

const UserAvatar = (props) => {
    return(
        <div className="UserAvatar">
            <div>
                <img src={props.src} alt={props.alt} />
            </div>
            <AnchorTag to={`/user/${props.userId}`}>
                { props.userName }
            </AnchorTag>
        </div>
    )
}

export default UserAvatar;