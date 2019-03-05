import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../actions'
import { Container } from '../../../UI/Container/Container';
import './Header.css';
import Navlink from '../../../UI/Navlinks/Navlink';
import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu';

class Header extends Component{
    componentDidMount = () => {
        console.log("Header componentDidMount")
        let token = localStorage.getItem('userID');
        if(token){
            this.props.fetchUser(localStorage.getItem('userID'));
        }
    }

    componentWillReceiveProps = newProps => {
        if(this.props.state.user.user){
            // console.log(this.props.state.user.user.data.attributes.username);
            this.setState({ userName: this.props.state.user.user.data.attributes.username })
        }
    }

    state = {
        dropDownOn: false,
        userName: null
    }
    
    onDropdownClicked = () => {
        this.setState({ dropDownOn: !this.state.dropDownOn }, () => {
            document.addEventListener('click', this.closeMenu);
          });
    }

    closeMenu = () => {
        this.setState({ dropDownOn: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
    }

    render(){
        return (
            <div className="Header">
                <Container>
                    <Navlink to="/">
                        Logo
                    </Navlink>
                    <div className="pull-right">
                        <Navlink to="/">
                            Pocetna 
                        </Navlink>
                        <Navlink to="/species">
                            Sve Vrste
                        </Navlink>
                        {!this.props.isAuthenticated? <Navlink to="/login">
                            Prijavi se
                        </Navlink>: null}
                        {!this.props.isAuthenticated? <Navlink to="/register">
                            Registruj se 
                        </Navlink>: null}
                        {this.props.isAuthenticated? <div className="DropdownBtn" onClick={this.onDropdownClicked}>
                            { this.state.userName } 
                        </div>: null}
                        <DropdownMenu userID={this.props.userID} show={this.state.dropDownOn}/>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        userID: state.auth.userID,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return{
    //   onTryAutoSignup: () => dispatch(actions.authCheckState())
    fetchUser: (userID) => dispatch(actions.fetchUser(userID))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Header);



