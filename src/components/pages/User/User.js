import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchUser } from '../../../actions';

import { FlexContainer } from '../../../UI/Container/Container';
import UserInfo from './UserInfo/UserInfo';

class User extends Component{
    componentDidMount = () => {
        this.props.fetchUser(this.props.match.params.id)
    }

    render(){
        let userInfo = 'loading';
        if(this.props.user){
            console.log(this.props.user.attributes);
            userInfo = <UserInfo userInfo={this.props.user.attributes}/>
        }
        return(
            <FlexContainer >
                { userInfo }
            </FlexContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        authToken: state.auth.token,
        user: state.user
    };
};

export default connect(mapStateToProps, { fetchUser })(User);



