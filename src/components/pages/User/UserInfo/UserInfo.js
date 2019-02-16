import React, { Component } from 'react';

import { Card, CardBody } from '../../../../UI/Card/Card';
import UserAvatar from '../UserAvatar/UserAvatar';
import hariPlaceholder from '../../../../assets/hari.jpg';
import List from '../../../../UI/List/List';

class UserInfo extends Component{
    render(){
        console.log(this.props.userInfo)
        let toList = {};
        for(let key in this.props.userInfo){
            if(key === 'username' && this.props.userInfo[key]){
                toList["korisnicko ime"] = this.props.userInfo[key]
            }
            else if(key === 'email' && this.props.userInfo[key]){
                toList["email"] = this.props.userInfo[key]
            }
            else if(key === 'full_name' && this.props.userInfo[key]){
                toList["Puno ime"] = this.props.userInfo[key]
            }
        }
        console.log(toList)
        return(
            <Card width="30%">
                <CardBody>
                    <UserAvatar src={hariPlaceholder} alt="hari" userName="Hari Kalanj"/>
                    <hr />
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                    <List toList={toList}/>
                </CardBody>
            </Card>
        )
    }
}

export default UserInfo;