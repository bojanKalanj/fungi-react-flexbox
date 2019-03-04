import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from '../../../UI/Container/Container';
import './Header.css';
import Navlink from '../../../UI/Navlinks/Navlink';
import DropdownMenu from '../../../UI/DropdownMenu/DropdownMenu';

class Header extends Component{
    state = {
        dropDownOn: false
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
                            DropdownBtn
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

export default connect(mapStateToProps)(Header);



