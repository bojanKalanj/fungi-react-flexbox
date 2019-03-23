import React from 'react';
import { FlexContainer } from '../../../../UI/Container/Container';
import UserAvatar from '../../../pages/User/UserAvatar/UserAvatar';
import uerAvatarPlaceholderImg from '../../../../assets/hari.jpg';

const Comment = () => {
    return(
        <div style={{padding: '10px'}}>
            <FlexContainer>
                <div style={{width: '20%'}}>
                    <UserAvatar 
                        src={uerAvatarPlaceholderImg} 
                        alt="uerAvatarPlaceholderImg"
                        userName="Hari Kalanj"/>
                </div>
                <div style={{width: '75%', border: '1px solid rgba(81, 54, 41, .2)', padding: '0 2%'}}>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>
            </FlexContainer>
        </div>
    )
}

export default Comment;