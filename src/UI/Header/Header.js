import React, { Component } from 'react';

import { Container } from '../Container/Container';
import './Header.css';
import Navlink from '../Navlinks/Navlink';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

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
        console.log(this.state.dropDownOn)
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
                        <Navlink to="/user/2">
                            Korisnik
                        </Navlink>
                        <Navlink to="/login">
                            Prijavi se
                        </Navlink>
                        <Navlink to="/register">
                            Registruj se 
                        </Navlink>
                        <Navlink to="/observations/new">
                            Dodaj observaciju 
                        </Navlink>
                        <div className="DropdownBtn" onClick={this.onDropdownClicked}>
                            DropdownBtn
                        </div>
                        <DropdownMenu show={this.state.dropDownOn}/>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Header;



