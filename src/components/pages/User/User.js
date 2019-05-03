import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchUser } from '../../../actions';

import { Card, CardBody} from '../../../UI/Card/Card';
import { FlexContainer } from '../../../UI/Container/Container';
import imgPlaceholder from '../../../assets/hari.jpg';
import UserObs from './UsersObs/UsersObs';
import './User.css'
// import UserInfo from './UserInfo/UserInfo';

class User extends Component{
    componentDidMount = () => {
        this.props.fetchUser(this.props.match.params.id)
    }

    render(){
        let userInfo = 'loading';
        if(this.props.user.user){
            console.log(this.props.user);
            userInfo = <Card width="30%">
                            <CardBody>
                                <div >
                                    <img 
                                        className="user-img" 
                                        src={imgPlaceholder} 
                                        alt={imgPlaceholder} />
                                </div>
                                <h3 className="title">{this.props.user.user.data.attributes.full_name? this.props.user.user.data.attributes.full_name: this.props.user.user.data.attributes.username}</h3>
                                <p className="text-muted">Registrovan: 4.22.2019</p>
                                <p className="text-muted users-obs-num">Broj nalaza <span className="pull-right">{ this.props.user.user.data.relationships.legated_observations.data.length }</span> </p>
                                <div>
                                    <hr />
                                    {/* <p>{ this.props.user.user.data.attributes.description }</p> */}
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                </div>
                            </CardBody>
                        </Card>
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



