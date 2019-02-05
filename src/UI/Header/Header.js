import React from 'react';

import Container from '../Container/Container';
import './Header.css';
import Navlink from '../Navlinks/Navlink'

const Header = () => {
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
                    <Navlink to="/user">
                        Korisnik
                    </Navlink>
                    <Navlink to="/login">
                        Prijavi se
                    </Navlink>
                </div>
            </Container>
        </div>
    )
}

export default Header;



