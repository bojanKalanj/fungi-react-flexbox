import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

import * as actions from '../../../actions'
import { Container } from '../../../UI/Container/Container';
import './Header.css';
import Navlink from '../../../UI/Navlinks/Navlink';
import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu';

class Header extends Component{
    componentDidMount = () => {
        let userID =localStorage.getItem('userID');
        if(userID){
            this.props.fetchUser(userID);
        }
    }

    componentWillReceiveProps = newProps => {
        let userID = localStorage.getItem('userID');
        if(userID){
            this.userID = userID
        }
    }

    userID = null;
    user = null;

    state = {
        dropDownOn: false,
        // userID: null
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
        if(this.props.state.user.user){
            this.user = this.props.state.user.user.data.attributes.full_name;
            console.log(this.user)
        }
        console.log(this.user)
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
                            Sve vrste
                        </Navlink>
                        {!this.props.isAuthenticated? <Navlink to="/login">
                            Prijavi se
                        </Navlink>: null}
                        {!this.props.isAuthenticated? <Navlink to="/register">
                            Registruj se 
                        </Navlink>: null}
                        {this.props.isAuthenticated? <div className="DropdownBtn" onClick={this.onDropdownClicked}>
                            <button className="DropdownMenuBtn">{ this.user } {this.state.dropDownOn? <FaAngleUp />: <FaAngleDown />  } </button>  
                        </div>: null}
                        <DropdownMenu userID={this.userID} show={this.state.dropDownOn}/>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        // userID: state.auth.userID,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return{
        // onTryAutoSignup: () => dispatch(actions.authCheckState()),
        fetchUser: (userID) => dispatch(actions.fetchUser(userID))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Header);



