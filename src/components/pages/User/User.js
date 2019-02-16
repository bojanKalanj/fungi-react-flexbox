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
        let userInfo = 'loading'
        if(this.props.state.user.data){
            console.log(this.props.state.user.data.attributes);
            userInfo = <UserInfo userInfo={this.props.state.user.data.attributes}/>
        }
        return(
            <FlexContainer >
                { userInfo }
            </FlexContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

export default connect(mapStateToProps, { fetchUser })(User);



