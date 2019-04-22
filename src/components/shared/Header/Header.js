import React, { Component } from 'react';
import { connect } from 'react-redux';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

import * as actions from '../../../actions'
import { Container } from '../../../UI/Container/Container';
import './Header.css';
import { Link } from 'react-router-dom';
import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu';
import '../../../UI/Button/Button.css'

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
            this.user = this.props.state.user.user.data.attributes.username;
        }
        return (
            <div className="Header">
                <Container>
                    <Link className="logo" to="/">
                        eFungi
                    </Link>
                    <div className="pull-right">
                        <Link className="nav-links" to="/">
                            Početna 
                        </Link>
                        <Link className="nav-links" to="/">
                            O nama 
                        </Link>
                        <Link className="nav-links" to="/">
                            O gljivama 
                        </Link>
                        <Link className="nav-links" to="/">
                            Uputstvo
                        </Link>
                        <Link className="nav-links" to="/species">
                            Sve vrste
                        </Link>
                        {!this.props.isAuthenticated? <Link className="nav-links" to="/login">
                            <button className="DropdownMenuBtn">Prijavi se</button> 
                        </Link>: null}
                        {!this.props.isAuthenticated? <Link className="nav-links" to="/register">
                            <button className="DropdownMenuBtn">Registruj se</button> 
                        </Link>: null}
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



